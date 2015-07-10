$(document).ready(function(){
	$.get('/restaurants.json', function(restaurants){
		$.each(restaurants, function(index, restaurant){
			$('<li></li>').text(restaurant.name).appendTo('#restaurantList')
		})
	});
})