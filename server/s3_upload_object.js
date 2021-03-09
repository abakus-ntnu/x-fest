const env = require("./env");

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const fs = require("fs");

const REGION = "eu-central-1";

const uploadParams = { Bucket: env.BUCKET_NAME};
const file = "FILE NAME";

const s3 = new S3Client({ region: REGION });

uploadParams.Body = fs.readFileSync(file);

const run = async () => {
  uploadParams.Key = path.basename(file);
  try {
    const data = await s3.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
  } catch (err) {
    console.log("Error", err);
  }
};
run();