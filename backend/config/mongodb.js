import mongoose from "mongoose";
import dns from "node:dns";

// Set reliable DNS servers for MongoDB Atlas SRV lookup resolution on Windows
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {
  console.log("DNS setServers notice:", e.message);
}

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("MongoDB connection error:", err.message);
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("Initial MongoDB connection failed:", error.message);
  }
};

export default connectDB;