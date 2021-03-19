/*
 * product
 * cart
 * user
 *
 * /cart
 * /buy
 * /shop
 * /login
 * /logout
 * /
 */
const express = require('express');
const cors = require('cors');
const app = express();
const usermodel = require('./models/user')
const productmodel = require('./models/product');
const cartmodel = require('./models/cart');
const Auth = require('./models/auth');
const uuidv4 = require('uuid').v4;

app.use(cors());
app.use(express.json());

app.post('/signup', (req, res) => {
	const {username, password, email} = req.body;

	if (username == '' || password == '' || email == '') {
		res.sendStatus(500);
	}
	else {
		const user = usermodel.create({username: username, password: password, email: email})
		
		res.send({status: 'ok'})
	}
});

app.post('/signin', (req, res) => {
	const {username, password} = req.body;
	usermodel.findOne({username: username, password: password})
	.then(user => {
		if (user == null) {
			res.sendStatus(401);
		}
		else {
			console.log('authenticating');
			const auth_key = uuidv4();
			Auth.create({user: user, key: auth_key})
			res.send({'auth': auth_key})
		}
	})
	

})

app.post('/cart/create', async (req, res) => {
	const cart = new cartmodel({products: []});
	cart.save();

	res.send({id: cart._id});
});

app.get('/cart/:id', async (req, res) => {
	const id = req.params.id;
	const products = await cartmodel.find({_id: id}).populate('products').exec((err, transaction) => {
		res.send(transaction[0].products);
	});
});

app.patch('/cart/add', async (req, res) => {
	const {pid, cart_id} = req.body;
	
	const product = await productmodel.findOne({_id: pid});
	const cart = await cartmodel.findOne({_id: cart_id});

	cart.products.push(product._id);
	cart.save();

	res.send({status: 'success'});
});

app.patch('/cart/delete', async (req, res) => {
	const {pid, cart_id} = req.body;

	cart = await cartmodel.findOne({_id: cart_id})
	cart.products.pull({_id: pid});
	cart.save();

	res.send({status: 'success'})
})

app.get('/cart/get_size/:cart', async (req, res) => {
	const cart_id = req.params.cart;
	const cart = await cartmodel.findOne({_id: cart_id});

	res.send({count: cart.products.length});
})
app.get('/products', async (req, res) => {
	const products = await productmodel.find({});

	res.send(products);
});

app.post('/product', () => {

});

app.get('/product/:id', () => {});

app.get('/product', () => {
});

app.patch('/product/:id', () => {});

app.listen(5000, () => {
	console.log('started listening on port 5000');
});

