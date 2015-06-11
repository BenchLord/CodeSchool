var size = 4;
var score = 0;

board = JSON.parse(localStorage.getItem("Board"));

var restart = function(){
	$("#overLay").hide()
	$("#popup").hide().removeClass();
	board = {};
	addNewCell();
	addNewCell();
	refreshBoard();
	score = 0;
}

var tileKey = function (col, row) {
	return "tile" + col + "-" + row;
};

var createBoard = function () {
		var $board = $("#board");
		for (var row = 0; row < size; row++){
			var $row = $("<div></div>").addClass("row");
			for (var col = 0; col < size; col++){
				var $tile = $("<div></div>").addClass("tile");
				$tile.attr("id", tileKey(col, row));
				$row.append($tile);
			}
			$board.append($row);
		}
}

var refreshBoard = function(){
	for (var row = 0; row < size; row++) {
		for (var col = 0; col < size; col++) {
			var key = tileKey(col, row);
			var val = board[key];
			var $tile = $("#" + key);
			$tile.removeClass().addClass("tile").text("");
			$tile.text(val).addClass("tile-" + val);
		}
	}
	localStorage.setItem("Board", JSON.stringify(board));

	if (gameOver()){
		$("#overLay").show();
		$("#popup").fadeIn(700);
	}
};


var getEmptyTiles = function (){
	var empty = [];
	for (var row = 0; row < size; row++){
		for (var col = 0; col < size; col++){
			var key = tileKey(col, row);
			if (board[key] === undefined){
				empty.push(key);
			}
		}
	}
	return empty;
}

var gameOver = function (){
	var empty = getEmptyTiles();
	if (empty.length > 0){
		return false;
	}

	for (var row = 0; row < size; row++){
		var numbers = getNumbersInRow(row);
		for (var n = 0; n < numbers.length-1; n++){
			if (numbers[n] === numbers[n+1]){
				return false;
			}
		}
	}

	for (var col = 0; col < size; col++){
		var numbers = getNumbersInCol(col)
		for (var n = 0; n < numbers.length-1; n++){
			if (numbers[n] === numbers[n+1]){
				return false;
			}
		}
	}
	return true;
}

var addNewCell = function(){
	var row = Math.floor(Math.random() * size);
	var col = Math.floor(Math.random() * size);
	var cell = tileKey(col, row);
	if (!board[cell]){
		var val = Math.random();
		if (val < 0.75){
			val = 2;
		} else {
			val = 4;
		}
		var $tile = $("#" + cell);
		$tile.removeClass().addClass("tile").text("");
		$tile.text(val).addClass("tile-" + val);
		board[cell] = val;
	} else {
		addNewCell();
	}
}

var calculateScore = function(val){
	var $score = $("#roundScore");
	var $bestScore = $("#bestScore");
	var bestScore = parseInt(localStorage.getItem("Best"));
	score += val;
	if (score > bestScore){
		var bestScore = score;
		localStorage.setItem("Best", bestScore);
		$bestScore.text("Best: " + parseInt(localStorage.getItem("Best")));
	}
	$score.text("Score: " + score);
}

var combineNumbers = function (numbers){
	var newNumbers = [];
	while (numbers.length > 0){
		if (numbers[0] === numbers[1]){
			var sum = numbers[0] + numbers[1];
			calculateScore(sum)	
			newNumbers.push(sum);
			numbers.shift();
			numbers.shift();
		} else {
			newNumbers.push(numbers[0]);
			numbers.shift();
		}
	}
	while(newNumbers.length < size){
		newNumbers.push(undefined);
	}
	
	return newNumbers;
};

var getNumbersInRow = function(row){
	var numbers = [];
	for (var col = 0; col < size; col++){
		var key = tileKey(col, row);
		var val = board[key];
		if (val){
			numbers.push(val);
		}
	}
	return numbers;
};

var setNumbersInRow = function(row, newNumbers) {
	for (var col = 0; col < size; col++){
		var key = tileKey(col, row);
		board[key] = newNumbers[col];
	}
}

var setNumbersInCol = function(col, newNumbers) {
	for (var row = 0; row < size; row++){
		var key = tileKey(col, row);
		board[key] = newNumbers[row];
	}
}

var combineLeft = function(row){
	var oldNumbers = getNumbersInRow(row);
	var newNumbers = combineNumbers(oldNumbers);
	setNumbersInRow(row, newNumbers);
	refreshBoard();
};

var combineUp = function(col){
	var oldNumbers = getNumbersInCol(col);
	var newNumbers = combineNumbers(oldNumbers);
	setNumbersInCol(col, newNumbers);
};

var combineRight = function(row){
	var oldNumbers = getNumbersInRow(row);
	var newNumbers = combineNumbersInReverse(oldNumbers);
	setNumbersInRow(row, newNumbers);
};

var combineDown = function(col){
	var oldNumbers = getNumbersInCol(col);
	var newNumbers = combineNumbersInReverse(oldNumbers);
	setNumbersInCol(col, newNumbers);
};

var didBoardChange = function (oldBoard) {
	for (var row = 0; row < size; row++){
		for (var col = 0; col < size; col++){
			var key = tileKey(col, row);
			if (board[key] !== oldBoard[key]){
				return true;
			}
		}
	}
	return false;
};


var keyPressed = function(direction){
	var oldBoard = $.extend({}, board);

	for (var n = 0; n < size; n++){
		if (direction == "left"){
			combineLeft(n);
		} else if (direction == "up"){
			combineUp(n);
		} else if (direction == "right"){
			combineRight(n);
		} else if (direction == "down"){
			combineDown(n);
		}
	}

	if (didBoardChange(oldBoard)){
		addNewCell();
	}
	refreshBoard();
};

var combineNumbersInReverse = function(numbers){
	return combineNumbers(numbers.reverse()).reverse();
}

var getNumbersInCol = function(col){
	var numbers = [];
	for (var row = 0; row < size; row++){
		var key = tileKey(col, row);
		var val = board[key];
		if (val){
			numbers.push(val);
		}
	}
	return numbers;
}

$(document).ready(function(){
	if (gameOver()){
		restart();
	}

	$("#overLay").hide()
	$("#popup").hide()

	createBoard();
	refreshBoard();

	if (!localStorage.getItem("Board")){
		localStorage.setItem("Board", JSON.stringify({}));
	}

	if (!localStorage.getItem("Best")){
		localStorage.setItem("Best", 0);
	}
	$("#bestScore").text("Best: " + parseInt(localStorage.getItem("Best")));

	$(document).keydown(function(e){
		switch(e.which){
			case 37: // left
			case 65: // a
				keyPressed("left");
				break;
			case 38: // up
			case 87: // w
				keyPressed("up");
				break;
			case 39: // right
			case 68: // d
				keyPressed("right");
				break;
			case 40: // down
			case 83: // s
				keyPressed("down");
				break;
		}
	});

	// Disable Arrow Key Scrolling
	document.addEventListener("keydown", function (e) {
  	if([37,38,39,40].indexOf(e.keyCode) > -1){
  	  e.preventDefault();
  	}
	}, false);

});