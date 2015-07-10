(function(){

	angular.module('lunchApp').controller('RestaurantFormCtrl', [
		'Restaurant',
		'$rootScope',
		'$state',
		function(Restaurant, $rootScope, $state){
			this.newRestaurant = new Restaurant();

			this.addRestaurant = function(){
				this.newRestaurant.$save();
				$rootScope.$broadcast('restaurantCreated', this.newRestaurant);
				this.newRestaurant = new Restaurant();
				$state.go('list');
			};
		}
	])

})();