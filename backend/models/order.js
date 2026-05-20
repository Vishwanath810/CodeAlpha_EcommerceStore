const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    items: [
        {
            name: String,
            price: Number,
            image: String
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Order", orderSchema);