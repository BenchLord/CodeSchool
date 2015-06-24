(function(){

	angular.module('todoApp').controller('listCtrl', [
		'Todo',
		function(Todo){
			this.todos = Todo.list;
		}
	]);

}).call(this);