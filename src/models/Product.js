const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    photo: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: String,
    },
    website: {
        type: ['Mercado Livre', 'Buscape'],
    },
    category: {
        type: ['tv', 'mobile', 'refrigerator'],
    }
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
