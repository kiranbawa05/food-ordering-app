const express = require("express");
const router = express.Router();
const User = require("../models/User");

// LOGIN
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
        message: "Login successful",
        role: user.role
    });
});

module.exports = router;