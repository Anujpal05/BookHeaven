import express from "express";
import mongoDB from "./conn/conn.js";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./Router/userRoute.js";
import bookRouter from "./Router/bookRoute.js";
import favRouter from "./Router/favRoute.js";
import cartRouter from "./Router/cartRoute.js";
import orderRouter from "./Router/orderRoute.js";
const app = express();
dotenv.config();
const port = process.env.PORT || 4001;

//middleware
app.use(express.json());
app.use(cors());

//connected to database
mongoDB();

//Routers
app.use("/api/v1/", userRouter);
app.use("/api/v1/", bookRouter);
app.use("/api/v1/", favRouter);
app.use("/api/v1/", cartRouter);
app.use("/api/v1/", orderRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
