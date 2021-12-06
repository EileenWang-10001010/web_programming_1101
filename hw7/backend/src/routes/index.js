//application-level middleware assign routing, 與前端串接的  API endpoint

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import User from "../models/ScoreCard.js"; //schema
import {saveUser,deleteDB,searchQuery} from "./api/api.js"
const router = express.Router();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("mongo db connection created"));

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", async () => {});

router.post("/create-card", (req, res) => {
  const { name, subject, score } = req.body;
  saveUser(name, subject, score, res);
});

router.get("/query-cards", (req, res) => {
  const queryType = req.query.type;
  const queryString = req.query.queryString;
  searchQuery(queryType, queryString, res);
});

router.delete("/clear-db", (_, res) => {
  deleteDB();
  res.json({ message: "Database cleared" });
});

export default router;
