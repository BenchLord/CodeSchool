(function(){

	angular.module('myApp')
		.controller('ApplicationCtrl', ['Timer',
		function(Timer){
			this.imageNames = [
				'cat.jpg',
				'dog.jpg',
				'grey_cat.jpg',
				'socks.jpg'
			];

			this.timerSeconds = 0;
			Timer.interval(function(){
				this.timerSeconds++;
			}.bind(this));

			this.doAlert = function(){
				alert('You clicked me from angular');
			
			};
		}]);

}).call(this);