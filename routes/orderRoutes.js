const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Menu = require("../models/Menu");

// PLACE ORDER
router.post("/", async (req, res) => {
    try {
        const { items } = req.body;

        let total = 0;

        for (let item of items) {
            const food = await Menu.findOne({ name: item.name });

            if (!food || food.quantity < item.qty) {
                return res.status(400).json({
                    message: `${item.name} not available`
                });
            }

            total += food.price * item.qty;

            // reduce quantity
            food.quantity -= item.qty;

            if (food.quantity === 0) {
                food.available = false;
            }

            await food.save();
        }

        const newOrder = new Order({
            items,
            total
        });

        await newOrder.save();

        res.json({ message: "Order placed", order: newOrder });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all orders
router.get("/", async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

module.exports = router;