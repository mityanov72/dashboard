//	========================================================================================= //
//	Объявляется переменная для страницы
var PAGE_LOGIN;

//	========================================================================================= //
//	Страница регистрируется в приложении
Application.registryPage('PAGE_LOGIN', 'Login', page_login_init, page_login_show, page_login_clear);

function page_login_init() {
	PAGE_LOGIN.popup_panel = PAGE_LOGIN.add(Popup, 'cPopup');
	PAGE_LOGIN.popup_panel.element.innerHTML = '<div class="div_back_login">\
		<center class="login">\
			<div id="text_dash">DashBoard</div>\
			<div id="text_light">Light</div>\
		</center>\
		<div align="center" id="div_login">\
			<table class="login">\
			<tr>\
				<td><p class="login">login</p></td><td><input type="text" class="login" name="login" id="idlogin"></td>\
			</tr>\
			<tr>\
				<td><p class="login">password</p></td><td><input type="password" class="login" name="pass" id="idpass"></td>\
			</tr>\
			<tr>\
				<td></td><td><a href="javascript:return false;" class=button_a>Enter</a></td>\
			</tr>\
			</table>\
		</div>\
		<img src="images/logo_eds.png" id="logo_eds"></div>';
	PAGE_LOGIN.popup_panel.show();
}

function page_login_show() {
	
}

function page_login_clear() {
	
}