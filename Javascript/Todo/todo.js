var todoItems = [];

var getFormData = function(){
	var data = {};
	if ($("#input-name").val() != ""){
		data.name = $("#input-name").val();
		data.notes = $("#input-notes").val();	
		return data;
	}	
}

var addTodoItem = function() {
	if (getFormData()){
		todoItems.push(getFormData());
	}
	localStorage.setItem("todoItems", JSON.stringify(todoItems));
	refreshList();
}

var clearForm = function(){
	$("#input-name").val("");
	$("#input-notes").val("");
}

var markItemCompleted = function(item, completed){
	item.completed = completed;
	localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

var removeItem = function(index){
	todoItems.splice(index, 1);
	localStorage.setItem("todoItems", JSON.stringify(todoItems));
	refreshList();
}

var refreshList = function(){
	todoItems = JSON.parse(localStorage.getItem("todoItems"));
	$("#todo-list").empty();
	$.each(todoItems, function(i, item){
		var $checkbox = $("<input>").attr("type", "checkbox").attr("checked", item.completed).change(function() {
			markItemCompleted(item, this.checked);
		});
		var $li = $("<li></li>");
		var $li2 = $("<li></li>");
		var $content = $("<span></span>").text(" " + item.name);
		var $remove = $("<a href=''></a>").text(" x").click(function(e){
			e.preventDefault();
			removeItem(i);
		});
		$li.addClass("todos").append($checkbox).append($content).append($remove).appendTo("#todo-list");
		$li2.addClass("notes").text(item.notes).appendTo("#todo-list");
	});
}

$(document).ready(function(){

	if (localStorage.getItem("todoItems")){
		todoItems = JSON.parse(localStorage.getItem("todoItems"));	
	} else {
		localStorage.setItem("todoItems", todoItems);
	}
	
	refreshList();

	$("#todo-form").submit(function(e){
		e.preventDefault();
		addTodoItem();
		clearForm();
	});
})
