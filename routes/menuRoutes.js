const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");

// GET all items
router.get("/", async (req, res) => {
    const items = await Menu.find();
    res.json(items);
});

// ADD item
router.post("/", async (req, res) => {
    try {
        const { name, price, category, quantity, image } = req.body;

        // case-insensitive search
        let existing = await Menu.findOne({
            name: { $regex: new RegExp("^" + name + "$", "i") }
        });

        if (existing) {
            // update existing
            existing.quantity += quantity;
            existing.price = price;
            existing.available = existing.quantity > 0;
            existing.image = image;

            await existing.save();

            return res.json({
                message: "Item updated",
                item: existing
            });
        }

        // create new (normalize name)
        const newItem = new Menu({
            name: name.trim(),
            price,
            category,
            quantity,
            available: true,
            image
        });

        await newItem.save();

        res.json({
            message: "Item added",
            item: newItem
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// UPDATE item
router.put("/:id", async (req, res) => {
    try {
        const updatedItem = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// DELETE item
router.delete("/:id", async (req, res) => {
    try {
        await Menu.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// put item yani k update
router.put("/:id", async (req, res) => {
    try {
        const updatedItem = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;