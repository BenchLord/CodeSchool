(function(){

	angular.module('lunchApp').controller('RestaurantEditCtrl', [
		'Restaurant',
		'$stateParams',
		'$state',
		function(Restaurant, $stateParams, $state){
			var id = $stateParams._id;
			this.restaurant = Restaurant.get({ restaurant_id: id });

			this.saveRestaurant = function(){
				Restaurant.update({ restaurant_id: id }, this.restaurant, function(restaurant){
					$state.go('detail', restaurant)
				});
			};
		}
	]);

})();