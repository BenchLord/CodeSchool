var player, board, gameOver;
var p1Wins = 0;
var p2Wins = 0;

var checkWinningPosition = function(player, x1 ,y1, x2, y2, x3, y3){
	var cell1 = board[y1][x1];
	var cell2 = board[y2][x2];
	var cell3 = board[y3][x3];
	if (cell1 == player && cell2 == player && cell3 == player){
		alert("Player " + player + " wins!");
		gameOver = true;
	}
};

var checkWinner = function (player) {
	checkWinningPosition(player, 0, 0, 0, 1, 0, 2);
	checkWinningPosition(player, 1, 0, 1, 1, 1, 2);
	checkWinningPosition(player, 2, 0, 2, 1, 2, 2);
	checkWinningPosition(player, 0, 0, 1, 0, 2, 0);
	checkWinningPosition(player, 0, 1, 1, 1, 2, 1);
	checkWinningPosition(player, 0, 2, 1, 2, 2, 2);
	checkWinningPosition(player, 0, 0, 1, 1, 2, 2);
	checkWinningPosition(player, 2, 0, 1, 1, 0, 2);
	if (!gameOver){
		checkTie();
	}
};

var checkTie = function(){
	for (var i = 0; i < 3; i++){
		for (var j = 0; j < 3; j++){
			if (board[i][j] == 0) {
				return;
			}
		}
	}
	alert("You tied!")
	gameOver = true;
};

var setCellClick = function($cell, i, j){
	$cell.click(function(){
		if (this.className != "animated bounceIn"){
			this.className = "animated bounceIn"
			if (player == 1){
				board[i][j] = 1;
				$(this).text("X");
				checkWinner(player);
				player = 2;
			} else {
				board[i][j] = 2;
				$(this).text("O");
				checkWinner(player);
				player = 1;
			}
		}
		if (gameOver){
			startGame();
		}
	});
};

var startGame = function() {
	$("table").remove();

	player = 1;
	board = [[0,0,0],[0,0,0],[0,0,0]];
	gameOver = false;
	
	var $table = $("<table></table>");
	$("body").append($table);

	for (var i = 0; i < 3; i++){
		var $tr = $("<tr></tr>");
		for (var j = 0; j < 3; j++){
			var $td = $("<td></td>");
			setCellClick($td, i, j);
			$tr.append($td);
		}
		$table.append($tr)
	}
}

startGame();