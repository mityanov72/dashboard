var CONST_TIME_PROC_INTERRUPT = 300;
var CONST_TIME_PROC_DELAY = 1000;			// время задержки циклов внутри процесса
var DEAD = -1;
var INIT = 0;
var RUN = 1;


var EngineCon = new ConsoleEngine();
//var EngineDB = new DBEngine();
var EngineWeb = new WebEngine();

var SYNC_SERVER = new SERVICE_SYNC_SERVER();
var SYNC_CLIENT = new SERVICE_SYNC_CLIENT();

function MainApp(name) {
	this.constructor = function(name) {
		var interrupt = function() {
			SYNC_SERVER.START();
			SYNC_CLIENT.START();
		}
		EngineCon.log(this, 'ready');
		this.task_list = {};
		this.page_list = {};
		this.online_flag = false;
		this.timeout_check_online = 5000;
		this.stop = false;
		this.current_page = undefined;
		this.page_place = document.getElementById('mainPage');
		initDataBase();
		TASK_MANAGER.addTask(interrupt, LOW);
		if(localStorage['CLIENT_HW_GUID'] == undefined) {
			localStorage['CLIENT_HW_GUID'] = guid();
		}
		if(localStorage['TIME_UPDATE'] == undefined) {
			localStorage['TIME_UPDATE'] = 0;
		}
		mysql(SQL.TABLE_EQUIP_CAT, REPLACE, [0, 0, 'af222ad5-e346-11e6-83aa-0016364dcf75', 'рентгеновские аппараты']);
		mysql(SQL.TABLE_EQUIP_CAT, REPLACE, [0, 0, 'af222a44-e346-11e6-83aa-0016364dcf75', 'биохимические анализаторы']);
	}

	this.isOnline = function() {
		return window.navigator.onLine
	}

	this.init = function(class_name) {

	}
	this.run = function(proc_or_class_name, proc_param) {

	}

	this.halt = function(proc_or_class_name) {

	}
	this.log = function(sender, message) {
		EngineCon.log(sender, message);
	}
	this.error = function(sender, message) {
		EngineCon.error(sender, message);
	}
	this.catcher = function(sender, error) {
		EngineCon.catcher(sender, error);
	}
	this.login = function() {
		function resFunction(error_level, ObjResult, sender) {
			var result = JSON.parse(ObjResult);
			localStorage['SESSION'] = result.session_GUID;
		}
		var source = {};
		source['SESSION'] = '0';
		source['MAIL'] = 'mad@eds72.ru';
		source['HASH'] = 'psww';
		EngineWeb.transmit(WEB_LOGIN, source, resFunction, this);
	}
	this.open = function(page_name) {
		if(this.page_list[page_name].is_init == false) {
			this.page_list[page_name].init();
			this.page_list[page_name].is_init = true;		
		}
		this.page_place = document.getElementById('mainPage');
		this.page_place.innerHTML = '';
		this.page_place.appendChild(this.page_list[page_name].element);
		this.page_list[page_name].show();
		setMenuDescription(this.page_list[page_name].description);
	}
	this.registryPage = function(page_name, page_description, init_function, show_function, clear_function) {
		var page = new Page(page_name, Application.page_place, page_name);
		eval(page_name+' = page');
		this.page_list[page.name] = page;
		this.page_list[page.name].init = init_function;
		this.page_list[page.name].show = show_function;
		this.page_list[page.name].clear = clear_function;
		this.page_list[page.name].description = page_description;
		this.page_list[page.name].is_init = false;
	}
	this.constructor(name);
}

var Application = new MainApp();
