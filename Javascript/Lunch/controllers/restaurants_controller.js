var Restaurant = require('../models/restaurant.js');
var mongoose = require('mongoose');

var RestaurantCtrl = {
	// I need to capture the query variable, name, and create a regex in Restaurant.find({})
	// I may have to create an if statement to see if the query varaible is empty

	index: function(req, res){
		if (req.query.name){
			var query = {name: new RegExp(req.query.name, 'i')}
		} else {
			query = {}
		}
		Restaurant.find(query, function(err, restaurants){
			if (req.params.format == "json"){
				res.json(restaurants);
			} else {
				res.render('restaurants/index', {
					restaurants: restaurants
				});				
			}
		});
	},

	new: function(req, res){
		res.render('restaurants/new')
	},

	create: function(req, res){
		new Restaurant(
		{name: req.body.name,
			phone: req.body.phone,
			type: req.body.type,
			minPrice: req.body.minPrice,
			maxPrice: req.body.maxPrice
		}).save(function(err, restaurant){
			if (req.params.format == "json"){
				res.status(201).json(restaurant);
			} else {
				res.redirect('/restaurants')
			}
		});
	},

	show: function(req, res){
		Restaurant.findOne({_id: req.params.id}, function(err, restaurant){
			if (err){
				res.render('restaurants/err');
			} else {
				if (req.params.format == "json"){
					res.json(restaurant);
				} else {
					res.render('restaurants/show', {
						restaurant: restaurant
					});						
				}	
			}
		});
	},

	destroy: function(req, res){
		Restaurant.findOne({_id: req.params.id}, function(err, restaurant){
			if (err){
				res.render('restaurants/err');
			} else {
				Restaurant.remove(restaurant, function(){
					if (req.params.format == "json"){
						res.status(204).send('');
					} else {
						res.redirect('/restaurants');						
					}
				});				
			}
		})
	},

	change: function(req, res){
		Restaurant.findOne({_id: req.params.id}, function(err, restaurant){
			if (err){
				res.render('restaurants/err');
			} else {
				res.render('restaurants/change', {
					restaurant: restaurant
				})
			}
		})
	},

	update: function(req, res){
		Restaurant.findOne({_id: req.params.id}, function(err, restaurant){
			if (err){
				res.render('restaurants/err');
			} else {
				Restaurant.update(restaurant, {name: req.body.name,
					phone: req.body.phone,
					type: req.body.type,
					minPrice: req.body.minPrice,
					maxPrice: req.body.maxPrice
				}, function(err, restauranta){
					if (req.params.format == "json"){
						res.json(restaurant);
					} else {
						res.redirect("/restaurants/" + restaurant._id);
					}
				});
			}
		})
	}
};

module.exports = RestaurantCtrl;