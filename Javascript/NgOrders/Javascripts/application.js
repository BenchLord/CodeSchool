(function(){

	angular.module('ordersApp', [
		'ui.router'
	]).config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){

			$urlRouterProvider.otherwise('/all');

			$stateProvider.state('newOrder', {
				url: '/new',
				controller: 'OrderFormCtrl',
				controllerAs: 'formVm',
				templateUrl: 'templates/orderForm.html'
			})

			.state('allOrders', {
				url: '/all',
				controller: 'OrdersCtrl',
				controllerAs: 'ordersVm',
				templateUrl: 'templates/orders.html'
			})
			
			.state('singleOrder', {
				url: '/details/:id',
				controller: 'OrderCtrl',
				controllerAs: 'detailsVm',
				templateUrl: 'templates/order.html'
			})

		}
	]);

}).call(this);