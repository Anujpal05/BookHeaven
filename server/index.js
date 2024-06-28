import express from "express";
import mongoDB from "./conn/conn.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();
const port = process.env.PORT || 4001;

//connected to database
mongoDB();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
