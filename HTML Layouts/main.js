var flip = function(){
	var aside = document.getElementsByTagName("aside")[0];
	var main = document.getElementsByTagName("main")[0];
	if (aside.style.float == 'left'){
		aside.style.float = 'right';
		main.style.float = 'left';
	} else {
		aside.style.float = 'left';
		main.style.float = 'right';
	}
}