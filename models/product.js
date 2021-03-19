const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecomm', {useNewUrlParser: true, useUnifiedTopology: true});

const ProductSchema = new mongoose.Schema({
	price: Number,
	name: String,
	image: String,
});

const Product = new mongoose.model('Product', ProductSchema);


module.exports = Product;

/*
const products = [
		{ price: 15.5, name: 'some name', image: 'https://www.thepaws.net/wp-content/uploads/2019/01/orange-tabby-cat-photo.jpg'},
		{ price: 20.0, name: 'some name',image: 'https://www.thepaws.net/wp-content/uploads/2019/01/orange-tabby-cat-photo.jpg'},
		{ price: 20.0, name: 'some name', image: 'https://www.thepaws.net/wp-content/uploads/2019/01/orange-tabby-cat-photo.jpg'},
		{  price: 20.0, name: 'some name', image: 'https://www.thepaws.net/wp-content/uploads/2019/01/orange-tabby-cat-photo.jpg'},
		{  price: 20.0, name: 'some name', image: 'https://www.thepaws.net/wp-content/uploads/2019/01/orange-tabby-cat-photo.jpg'},
		{ price: 20.0, name: 'some name', image: 'https://www.thepaws.net/wp-content/uploads/2019/01/orange-tabby-cat-photo.jpg'},
	];

products.forEach(product => {
	const p = new Product(product);
	p.save()
})*/

