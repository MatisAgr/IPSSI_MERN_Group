const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        require: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
});

const Products = mongoose.model('Products', productSchema);

module.exports = Products;