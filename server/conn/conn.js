import mongoose from "mongoose";

const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB is connected!");
  } catch (error) {
    console.log(error);
  }
};

export default mongoDB;
