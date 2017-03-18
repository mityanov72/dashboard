var WEB_SERVER = 'desc.ray72.ru';
WEB_SERVER = 'localhost';
var WEB_SERVER_SYNC = 'server/sync_server.php'
var WEB_CLIENT_SYNC = 'server/sync_client.php'
var WEB_IS_ONLINE = 'server/is_online.php'
var WEB_LOGIN = 'server/login.php';


function WebEngine(name) {
	this.constructor = function(name) {
		EngineCon.log(this, 'ready');
	}
	this.receive = function(site, params, resFunction) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://'+WEB_SERVER+'/'+site, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.timeout = 10000;
		if(window.navigator.onLine == true) xhr.send(params);
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;
			if (xhr.status != 200) {
				EngineCon.error(this, xhr.status + ': ' + xhr.statusText);
				resFunction(-1, null);
			} else {
				resFunction(0, xhr.responseText);
			}
		}
		xhr.ontimeout = function() {
			EngineCon.log(this, 'timeout XMLHttpRequest');
		}
	}
	this.transmit = function(site, params, callback_function, callback_param) {
		if(typeof(params) == 'object' || typeof(params) == 'Object') {
			params = AssocArrayToString(params, '=', '&');
		}
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://'+WEB_SERVER+'/'+site, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.timeout = 10000;
		if(window.navigator.onLine == true) xhr.send(params);
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;
			if (xhr.status != 200) {
				EngineCon.error(this, xhr.status + ': ' + xhr.statusText);
				try {
					callback_function(-1, null, null);
				} catch(e) {
					EngineCon.catcher('EngineDB', e);
				}
			} else {
				try {
					callback_function(0, xhr.responseText, callback_param);
				} catch(e) {
					EngineCon.catcher('EngineDB', e);
				}
			}
		}
		xhr.ontimeout = function() {
			EngineCon.log(this, 'timeout XMLHttpRequest | site:'+site+' | POST_PARAM: '+params);
		}
	}
	this.constructor(name);
}
