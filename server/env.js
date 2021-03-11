module.exports = {
  PORT: process.env.PORT || 5000,
  REDIS_URL: process.env.REDIS_URL || "redis://127.0.0.1:6379",
  BUCKET_NAME: "webkom-xfest",
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
};
