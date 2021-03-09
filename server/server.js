const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const RateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const env = require("./env");

console.log("ENV", env.REDIS_URL);

const apiLimiter = new RateLimit({
  store: new RedisStore({
    redisURL: env.REDIS_URL,
    expiry: 1, // 2 seconds
  }),
  // windowMs: 1000, // 1 second (redis uses expiry, not windowMs, see https://github.com/wyattjoh/rate-limit-redis/issues/32 )
  max: 2, // limit each IP to 3 requests per windowMs or expiry
  statusCode: 429,
  // message: 'Rate limit exceeded. Please wait',
  // keyGenerator: (req) => {
  //   console.log(req.body.name);
  //   return 'unknownUser';
  // },
});

app.use(cors());
app.use(apiLimiter);
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/messages", async (req, res) => {
  try {
    //console.log(req);
    if (
      req.body.name &&
      req.body.name.length <= 20 &&
      req.body.text &&
      req.body.text.length <= 55 &&
      ["abakus", "online"].includes(req.body.side)
    ) {
      io.emit("message", req.body);
      return res.sendStatus(200);
    }
    return res.sendStatus(400);
  } catch (error) {
    res.sendStatus(500);
    return console.log("error", error);
  } finally {
    //console.log('Message Posted');
  }
});

const REGION = "eu-central-1";

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({ apiVersion: "2006-03-01" });

// TODO: https://www.npmjs.com/package/multer-s3
// Test: curl -i -X POST -H "Content-Type: multipart/form-data" -F "photos=@test.png;type=image/png;" http://localhost:5000/upload

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: env.BUCKET_NAME,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

app.post("/upload", upload.array("photos"), function (req, res, next) {
  console.log(req.files);
  res.send("Successfully uploaded " + req.files.length + " files!");
});

server.listen(env.PORT, () => {
  console.log("server is running on port", server.address().port);
});
