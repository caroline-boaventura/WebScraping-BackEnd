const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
        type: Number
    },
    website: {
        type: ['Mercado Livre', 'Buscape'],
    },
    category: {
        type: ['tv', 'mobile', 'refrigerator'],
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
