require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const restaurantRoutes = require("./routes/restaurantRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Lab 3 Restaurant API is running" }));

app.use("/", restaurantRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
}

start();
