(function(){

	angular.module('todoApp').controller('formCtrl', [
		'Todo',
		function(Todo){

			this.formData = new Todo();

			this.addTodo = function(){
				this.formData.save();
				this.formData = new Todo();
			};
		}
	]);

}).call(this);