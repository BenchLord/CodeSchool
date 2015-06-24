(function(){

	angular.module('todoApp').factory('Todo', [
		function(){
			var Todo = function(todoIn){
				todoIn = todoIn || {}
				this.id = todoIn.id || new Date().valueOf();
				this.title = todoIn.title || '';
				this.complete = todoIn.complete || false;
				this.editing = todoIn.editing || false;
			};

			if(!localStorage.getItem('todos')){
				localStorage.setItem('todos', JSON.stringify({}))
			}
			Todo.list = JSON.parse(localStorage.getItem('todos'));

			Todo.persist = function(){
				localStorage.setItem('todos', JSON.stringify(Todo.list));
			}

			var todo = Todo.prototype;

			todo.id = 0;
			todo.title = '';
			todo.complete = false;
			todo.editing = false;

			todo.save = function(){
				Todo.list[this.id] = this;
				Todo.persist();
			};

			todo.edit = function(){
				if (this.editing){
					this.editing = false;
				} else {
					this.editing = true;
				}
				Todo.persist();
			};

			todo.remove = function(){
				delete Todo.list[this.id];
				Todo.persist();
			}

			angular.forEach(Todo.list, function(todo, id){
				new Todo(todo).save();
			});

			return Todo;
		}
	])

}).call(this);