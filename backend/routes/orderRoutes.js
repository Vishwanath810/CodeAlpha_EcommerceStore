const express = require("express");

const router = express.Router();

const Order = require("../models/order");


// PLACE ORDER
router.post("/", async (req, res) => {

    try {

        const { items, totalAmount } = req.body;

        const order = new Order({
            items,
            totalAmount
        });

        await order.save();

        res.status(201).json({
            message: "Order placed successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET ALL ORDERS
router.get("/", async (req, res) => {

    try {

        const orders = await Order.find();

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;