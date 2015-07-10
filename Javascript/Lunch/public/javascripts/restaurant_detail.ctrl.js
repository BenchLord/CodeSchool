(function(){

	angular.module('lunchApp').controller('RestaurantDetailCtrl', [
		'Restaurant',
		'$stateParams',
		'$state',
		function(Restaurant, $stateParams, $state){
			var id = $stateParams._id;
			this.restaurant = Restaurant.get({ restaurant_id: id });

			this.deleteRestaurant = function(){
				if (confirm("Are you sure?")) {
					Restaurant.remove({ restaurant_id: id}, function() {
						$state.go('list');
					})
				}
			}
		}
	]);

})();