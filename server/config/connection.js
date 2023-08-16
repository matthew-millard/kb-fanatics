import mongoose from "mongoose";
import "dotenv/config";
console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kbfanatics-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose.connection;
