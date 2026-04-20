const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

router.post("/", async (req, res) => {
    const fb = new Feedback(req.body);
    await fb.save();
    res.json({ message: "Feedback submitted" });
});

module.exports = router;