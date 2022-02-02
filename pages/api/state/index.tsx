import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import {
  Agenda,
  Image,
  Info,
  Score,
  GameScore,
  Stream,
} from "../../../models/schema.js";

const username = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const dbname = "x-fest";

export const url = `mongodb+srv://${username}:${password}@cluster.xaaub.mongodb.net/${dbname}?retryWrites=true&w=majority`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  // Get all the state we need for the page

  const agenda = await Agenda.find({});
  const info = await Info.findOne().sort({ date: -1 }).limit(1);
  const score = await Score.findOne().sort({ date: -1 }).limit(1);
  const gameScore = await GameScore.find({}).sort({ highscore: -1 }).limit(10);
  const stream = await Stream.findOne().sort({ date: -1 }).limit(1);
  const images = await Image.find({ approved: true })
    .sort({ date: -1 })
    .limit(30);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.end(
    JSON.stringify({
      agenda,
      info,
      score,
      gameScore,
      stream,
      images: images.slice(images.length - 30, images.length).reverse(),
    })
  );
}
