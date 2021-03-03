import mongoose from "mongoose";

delete mongoose.connection.models["Agenda"];
delete mongoose.connection.models["Info"];

const AgendaSchema = new mongoose.Schema(
  {
    title: { type: String },
    time: { type: String },
    description: { type: String },
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
