(function(){

	angular.module('ordersApp').controller('OrderCtrl' , [
		'Order',
		'$stateParams',
		function(Order, $stateParams){

			var orderId = $stateParams.id;
			this.order = Order.getById(orderId);
		}
	])

}).call(this);