function createMenu() {
	//var div_menu = document.getElementById('top_menu');
	MENU.innerHTML = '<table class="menu_button"><tr>'+
		'<td width="40px"><a class="menu_button" href="#" onclick="showMainPage()">&#9776;</a></td>'+
		'<td id="page_title">Main Page</td>'+
		'<td width="40px"><a class="menu_button" href="#" onclick="showMainPage()">&#127968;</a></td>'+
		'<td width="40px"><a class="menu_button" href="#" onclick="historyBack()">&#8592;</a></td></tr></table>';
	
}

function setMenuDescription(title) {
	var div_menu_title = window.document.getElementById('page_title');
	div_menu_title.innerHTML = title;
}