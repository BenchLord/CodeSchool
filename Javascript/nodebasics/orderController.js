var Orders = require('./orders.js');

var OrderController = {

// Create
	new: function(req, res){
		res.render('ordersNew');
	},

	create: function(req, res){
		var orderId = Orders.addOrder(req.body);
		res.redirect('/orders/' + orderId);
	},

// Read
	index: function(req, res){
		var orders = Orders.getAllOrders();
		res.render('orders', {
			orders: orders
		});
	},

	show: function(req, res){
		var order = Orders.getOrder(req.params.id);
		res.render('orderShow', {
			id: req.params.id,
			order: order
		});
	},

// Update
	edit: function(req, res){
		var order = Orders.getOrder(req.params.id);
		res.render('orders_edit', {
			id: req.params.id,
			order: order
		})
	},

	update: function(req, res){
		Orders.updateOrder(req.params.id, req.body);
		res.redirect('/orders');
	},


// Delete
	delete: function(req, res){
		Orders.deleteOrder(req.params.id);
		res.redirect('/orders');
	}
};

module.exports = OrderController;