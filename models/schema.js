import mongoose from "mongoose";

delete mongoose.connection.models["Agenda"];
delete mongoose.connection.models["Info"];
delete mongoose.connection.models["Score"];
delete mongoose.connection.models["GameScore"];
delete mongoose.connection.models["Stream"];
delete mongoose.connection.models["Image"];

const AgendaSchema = new mongoose.Schema(
  {
    title: { type: String },
    time: { type: String },
    description: { type: String },
    index: { type: Number },
  },
  { autoCreate: true }
);
export const Agenda = mongoose.model("Agenda", AgendaSchema);

const InfoSchema = new mongoose.Schema(
  {
    text: { type: String },
  },
  { autoCreate: true }
);
export const Info = mongoose.model("Info", InfoSchema);

const ScoreSchema = new mongoose.Schema(
  {
    pointsToAbakus: { type: Number },
    pointsToOnline: { type: Number },
  },
  { autoCreate: true }
);
export const Score = mongoose.model("Score", ScoreSchema);

const GameSchema = new mongoose.Schema(
  {
    name: { type: String },
    side: { type: String },
    highscore: { type: Number },
  },
  { autoCreate: true }
);
export const GameScore = mongoose.model("GameScore", GameSchema);

const StreamSchema = new mongoose.Schema(
  {
    streamId: { type: String },
  },
  { autoCreate: true }
);
export const Stream = mongoose.model("Stream", StreamSchema);

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String },
    approved: { type: Boolean },
  },
  { autoCreate: true, timestamps: true }
);
export const Image = mongoose.model("Image", ImageSchema);
