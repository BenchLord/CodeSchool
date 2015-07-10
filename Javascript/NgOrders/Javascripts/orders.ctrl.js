(function(){

	angular.module('ordersApp').controller('OrdersCtrl', [
		'Order',
		function(Order){
			this.orders = Order.list;
		}
	]);

}).call(this);