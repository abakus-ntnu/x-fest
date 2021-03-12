const env = require("./env");
// mongodb setup

const mongoose = require("mongoose");

const dbname = "x-fest";

mongoose.connect(
  `mongodb+srv://${env.DATABASE_USER}:${env.DATABASE_PASSWORD}@cluster0.sdzbx.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

const Image = mongoose.model(
  "Image",
  new mongoose.Schema(
    {
      url: { type: String },
      approved: { type: Boolean },
    },
    { autoCreate: true }
  )
);

const GameScore = mongoose.model(
  "GameScore",
  new mongoose.Schema(
    {
      name: { type: String },
      side: { type: String },
      highscore: { type: Number },
    },
    { autoCreate: true }
  )
);

// Express setup
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

console.log("ENV", env.REDIS_URL);

const apiLimiter = new RateLimit({
  store: new RedisStore({
    redisURL: env.REDIS_URL,
    expiry: 1, // 2 seconds
  }),
  // windowMs: 1000, // 1 second (redis uses expiry, not windowMs, see https://github.com/wyattjoh/rate-limit-redis/issues/32 )
  max: 1, // limit each IP to 3 requests per windowMs or expiry
  statusCode: 429,
  // message: 'Rate limit exceeded. Please wait',
  // keyGenerator: (req) => {
  //   console.log(req.body.name);
  //   return 'unknownUser';
  // },
});

app.use(cors());
app.set("trust proxy", true);
app.use(apiLimiter);
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API

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

app.post("/score", async (req, res) => {
  try {
    //console.log(req);
    if (
      req.body.name &&
      req.body.score &&
      req.body.side &&
      ["abakus", "online"].includes(req.body.side)
    ) {
      GameScore.create(
        { name: req.body.name, highscore: req.body.score, side: req.body.side },
        function (err, small) {
          if (err) return handleError(err);
          // saved!
        }
      );
      return res.sendStatus(200);
    }
    return res.sendStatus(400);
  } catch (error) {
    res.sendStatus(500);
    return console.log("error", error);
  } finally {
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
  limits: {
    files: 1,
    fileSize: 1024 * 1024 * 2, // 2 MB
  },
  storage: multerS3({
    s3: s3,
    bucket: env.BUCKET_NAME,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

app.post("/upload", upload.single("photos"), function (req, res, next) {
  const url = req.file.location;
  if (url) {
    Image.create({ url, approved: false }, function (err, small) {
      if (err) return handleError(err);
      // saved!
    });
  }
  res.send("Successfully uploaded " + req.file.length + " files!");
});

server.listen(env.PORT, () => {
  console.log("server is running on port", server.address().port);
});
