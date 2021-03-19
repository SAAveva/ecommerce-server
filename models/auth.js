const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecomm', {useNewUrlParser: true, useUnifiedTopology: true});


const AuthSchema = new mongoose.Schema({
	key: String,
    user: mongoose.Schema.Types.ObjectId,
});

const Auth = mongoose.model('Auth', AuthSchema);

module.exports = Auth;
