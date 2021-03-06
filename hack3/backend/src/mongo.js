import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import dotenv from 'dotenv-defaults';
import "dotenv-defaults/config.js";

async function connect() {
  // TODO 1.1 Connect your MongoDB
  dotenv.config();
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true,})
const db = mongoose.connection

db.on("error",(error)=>{
    throw new Error("DB connection error: "+error);
})


db.once("open", () => {
    console.log("Mongo database connected!");
    dataInit();
  });
}

export default { connect };
