(function(){

	angular.module('ordersApp').factory('Order', [
		'$filter',
		function($filter){
			var Order = function(orderIn){
				orderIn = orderIn || {};
				this.id = orderIn.id || new Date().valueOf();
				this.name = orderIn.name || '';
				this.food = orderIn.food || '';
				this.pickup = orderIn.pickup || '';
			};

			Order.list = [];
			
			Order.persist = function(){
				var json = angular.toJson(Order.list);
				localStorage.setItem('orders', json);
			};

			Order.getById = function(orderId){
				var result = $filter('filter')(Order.list, {
					id: orderId
				});

				return result[0] || null;
			}

			var order = Order.prototype;
			order.id = 0;
			order.name = '';
			order.food = '';
			order.pickup = '';

			order.save = function(){
				Order.list.push(this);
				Order.persist();
			}

			var json = localStorage.getItem('orders');
			Order.list = angular.fromJson(json) || [];
			angular.forEach(Order.list, function(order, index){
				order = new Order(order);
				Order.list.splice(index, 1, order);
			})

			return Order;
		}
	]);

}).call(this);