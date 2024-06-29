import express from "express";
import mongoDB from "./conn/conn.js";
import dotenv from "dotenv";
import userRouter from "./Router/userRoute.js";
import bookRouter from "./Router/bookRoute.js";
const app = express();
dotenv.config();
const port = process.env.PORT || 4001;

//middleware
app.use(express.json());

//connected to database
mongoDB();

//Routers
app.use("/api/v1/", userRouter);
app.use("/api/v1/", bookRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
