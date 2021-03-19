const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecomm', {useNewUrlParser: true, useUnifiedTopology: true});

const CartSchema = new mongoose.Schema({
	products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
});

const CartProduct = new mongoose.Schema({
	cart: mongoose.Schema.Types.ObjectId,
	product: mongoose.Schema.Types.ObjectId
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
