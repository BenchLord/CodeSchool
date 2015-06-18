var orders = {};

var addOrder = function(newOrder){
	var id = new Date().valueOf();
	orders[id] = newOrder;
	return id;
};

var getOrder = function(id){
	return orders[id]
};

var updateOrder = function(id, updateOrder){
	orders[id] = updateOrder;
	return updateOrder;
};

var deleteOrder = function(id){
	delete orders[id];
};

var getAllOrders = function(){
	return JSON.parse(JSON.stringify(orders));
};

module.exports = {
	addOrder: addOrder,
	getOrder: getOrder,
	updateOrder: updateOrder,
	deleteOrder: deleteOrder,
	getAllOrders: getAllOrders
}