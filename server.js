const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ROUTES
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// STATIC (frontend)
app.use(express.static("public"));

// ROUTES USE
app.use("/menu", menuRoutes);
app.use("/order", orderRoutes);
app.use("/auth", authRoutes);
app.use("/feedback", feedbackRoutes);

// DB CONNECT
mongoose.connect("mongodb://127.0.0.1:27017/foodApp")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// TEST
app.get("/", (req, res) => {
    res.send("Server is running");
});

// START SERVER
app.listen(3000, () => {
    console.log("Server running on port 3000");
});


//http://localhost:3000/login.html