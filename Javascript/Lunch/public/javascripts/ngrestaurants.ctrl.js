(function(){

	angular.module('lunchApp').controller('RestaurantsCtrl', [
		'Restaurant',
		'$scope',
		'$state',
		function(Restaurant, $scope, $state){
			this.searchIn;
			this.restaurants = Restaurant.query();

			var ctrl = this
			$scope.$on('restaurantCreated', function(event, restaurant){
				ctrl.restaurants.push(restaurant);
			});

			this.search = function(){
				this.restaurants = Restaurant.query({name: this.searchIn});
			}

			this.pickRandomRestaurant = function(){
				var i = Math.floor(Math.random() * this.restaurants.length);
				var restaurant = this.restaurants[i];
				$state.go('detail', restaurant);
			}
		}
	]);

}).call(this);