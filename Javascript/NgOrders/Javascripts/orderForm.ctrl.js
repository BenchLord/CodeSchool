(function(){

	angular.module('ordersApp').controller('OrderFormCtrl', [
		'Order',
		'$state',
		function(Order, $state){
			this.order = new Order();

			this.addOrder = function(){
				this.order.save();
				this.order = new Order();
				$state.go('allOrders');
			}
		}
	]);

}).call(this);