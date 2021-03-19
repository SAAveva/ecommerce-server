const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecomm', {useNewUrlParser: true, useUnifiedTopology: true});


const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
