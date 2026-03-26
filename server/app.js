const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Allow server-to-server or same-origin requests without Origin header.
    if (!origin) {
      return callback(null, true);
    }

    if (!allowedOrigins.length || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origin tidak diizinkan oleh CORS"));
  },
};

app.use(cors(corsOptions));
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
    res.status(500).json({ message: "Gagal terhubung ke database" });
  }
});

app.use("/api/tasks", taskRoutes);

app.use("/api", (req, res) => {
  res.status(404).json({ message: "API endpoint tidak ditemukan" });
});

app.use((err, req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }

  next(err);
});

module.exports = app;
