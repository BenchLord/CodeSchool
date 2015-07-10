var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: String,
	phone: String,
	type: String,
	minPrice: Number,
	maxPrice: Number
});

var Restaurant = mongoose.model('Restaurant', schema);

module.exports = Restaurant;