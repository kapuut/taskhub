const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

let isConnected = false;

async function connectDatabase() {
  if (isConnected) {
    return;
  }

  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/taskhub";
  await mongoose.connect(mongoUri);
  isConnected = true;
}

app.use(async (req, res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    res.status(500).json({ message: "Gagal terhubung ke database", error: error.message });
  }
});

app.use("/api/tasks", taskRoutes);

module.exports = app;
