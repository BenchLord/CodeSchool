(function(){

	angular.module('lunchApp', ['ngResource', 'ui.router']).config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){
			$urlRouterProvider.otherwise('/all')
			$stateProvider.state('list', {
				url: '/all',
				controller: 'RestaurantsCtrl',
				controllerAs: 'restaurantsCtrl',
				templateUrl: 'templates/restaurants.html'
			}).state('form', {
				url: '/new',
				controller: 'RestaurantFormCtrl',
				controllerAs: 'formCtrl',
				templateUrl: 'templates/restaurant_form.html'
			}).state('detail', {
				url: '/detail/:_id',
				controller: 'RestaurantDetailCtrl',
				controllerAs: 'detailCtrl',
				templateUrl: 'templates/restaurant_detail.html'
			}).state('edit', {
				url: '/edit/:_id',
				controller: 'RestaurantEditCtrl',
				controllerAs: 'editCtrl',
				templateUrl: 'templates/restaurant_edit.html'
			})
		}
	]);
	
}).call(this);