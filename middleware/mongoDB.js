import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.set("strictQuery", true);
  // Use new db connection
  await mongoose.connect(process.env.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDB;
