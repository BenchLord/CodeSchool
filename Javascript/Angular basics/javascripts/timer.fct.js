(function(){
	angular.module('myApp')
		.factory('Timer', ['$interval',
		function($interval)
		{
			var Timer =
			{
				interval: function(fn)
				{
					$interval(fn, 1000);
				}
			};
			return Timer;
		}]);
}).call(this);