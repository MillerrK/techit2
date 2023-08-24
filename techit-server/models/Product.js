const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlangth: 2
    },
    price: {
        type: Number,
        required: true,
        minlangth: 2
    },
    category: {
        type: String,
        required: true,
        minlangth: 2
    },
    description: {
        type: String,
        required: true,
        minlangth: 2
    },
    image: {
        type: String,
        required: true,
        minlangth: 2
    }

})

const Product = mongoose.model("products", productSchema);
module.exports = Product;