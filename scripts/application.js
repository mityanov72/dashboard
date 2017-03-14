var CONST_TIME_PROC_INTERRUPT = 300;
var CONST_TIME_PROC_DELAY = 1000;			// время задержки циклов внутри процесса
var DEAD = -1;
var INIT = 0;
var RUN = 1;




var EngineCon = new ConsoleEngine();
var EngineDB = new DBEngine();
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
		setTimeout(interrupt, CONST_TIME_PROC_INTERRUPT);
		setInterval(this.checkOnline, 6000);
		if(localStorage['CLIENT_HW_GUID'] == undefined) {
			localStorage['CLIENT_HW_GUID'] = guid();
		}
		EngineDB.executeSqlSruct(STRUCT_TABLE_EQUIP_CAT, REPLACE, [0, 0, 'af222ad5-e346-11e6-83aa-0016364dcf75', 'рентгеновские аппараты'], null, null, DEBUG_DB_CREATE);
		EngineDB.executeSqlSruct(STRUCT_TABLE_EQUIP_CAT, REPLACE, [0, 0, 'af2243bd-e346-11e6-83aa-0016364dcf75', 'биохимические анализаторы'], null, null, DEBUG_DB_CREATE);
	}
	this.queueOnline = function() {
		/*if(this.stop) { return -1; }
		Application.runIsDead(PROCESS_SYNC_CLIENT);
		Application.runIsDead(PROCESS_SYNC_SERVER);*/
	}
	this.checkOnline = function() {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://'+WEB_SERVER+'/'+WEB_IS_ONLINE, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.timeout = Application.timeout_check_online;
		try { xhr.send(); } catch(e) {}
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;
			if (xhr.status != 200) {
				Application.online_flag = false;
			} else {
				Application.online_flag = true;
				Application.queueOnline();
			}
		}
		xhr.ontimeout = function() {
			Application.online_flag = false;
		}
	}
	this.isOnline = function() {
		return this.online_flag;
	}
	this.showTask = function() {
		var result = 'PID    | process name\n-------+--------------------';
		for(var process_name in this.task_list)
		{
			result = result + '\n[' + this.task_list[process_name].PID + '] | ' + process_name;
		}
		//if(result !== '') Application.log(this, result);
		return result;
	}
	this.checkProcess = function(process_name) {
		if(this.task_list[process_name] == undefined) {
			return DEAD;
		}
		if(this.task_list[process_name].alive == false && this.task_list[process_name].is_kill == true) {
			this.halt(process_name);
			return DEAD;
		}
		/*if(DEBUG_PROCESS) Application.log(this, process_name+' ['+this.task_list[process_name].PID+'] is not DEAD');
		if(DEBUG_PROCESS) Application.log('\n'+this.showTask);
		var sender = this.task_list[process_name];
		setTimeout(function(){sender.watchDog(sender);}, sender.live_time);*/
		//this.task_list[process_name].alive == false;
		return INIT;
	}
	this.init = function(class_name) {
		var proc = new class_name();
		var proc_name = proc.constructor.name;
		if(this.task_list[proc_name] != undefined) {
			this.error(this, 'init process error. process name ['+proc_name+'] already exists');
			return -1;
		}
		this.task_list[proc_name] = proc;
		this.task_list[proc_name].name = proc_name;
		proc = undefined;
		this.task_list[proc_name].INIT();
	}
	this.run = function(proc_or_class_name, proc_param) {
		var type_var = typeof proc_or_class_name;
		switch (type_var) {
			case 'function':
				var proc = new proc_or_class_name();
				var proc_name = proc.constructor.name;
				if(this.task_list[proc_name] != undefined) {
					this.error(this, 'run new process error. process name ['+proc_name+'] already exists. impossible create new');
					return -665;
				} else {
					this.task_list[proc_name] = proc;
					this.task_list[proc_name].name = proc_name;
					proc = undefined;
					if(DEBUG_PROCESS) this.log(this, 'process '+proc_name+' [PID:'+this.task_list[proc_name].PID+'] run');
					this.task_list[proc_name].START(proc_param);
				}
			break;
			case 'string':
				if(this.task_list[proc_or_class_name] == undefined) {
					this.error(this, 'run process error. process name ['+proc_name+'] not found');
					return -666;
				}
				this.task_list[proc_or_class_name].START(proc_param);
			break;
			default:
				this.error(this, 'run process unknown error. process name ['+proc_name+']');
				return -667
			break;
		}
		return 0;
	}
	this.runIsDead = function(proc_or_class_name, proc_param) {
		var process_name = '';
		var type_var = typeof proc_or_class_name;
		switch (type_var) {
			case 'function':
				process_name = proc_or_class_name.name;
			break;
			case 'string':
				process_name = proc_or_class_name;
			break;
			default:
				return -907
			break;
		}
		if(this.checkProcess(process_name) == DEAD) {
			this.run(proc_or_class_name, proc_param);
		}
	}
	this.halt = function(proc_or_class_name) {
		try {
			var process_name = proc_or_class_name;
			if(typeof proc_or_class_name == 'object') {
				process_name = proc_or_class_name.name;
			}
			//this.checkProcess(process_name);
			this.task_list[process_name] = undefined;
			delete this.task_list[process_name];
		} catch(e) {}
	}
	this.elemClass = function() {
		return "menu"
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
		this.page_place = document.getElementById('mainPage');
		this.page_place.innerHTML = '';
		this.page_place.appendChild(this.page_list[page_name].element);
		this.page_list[page_name].show();
		setMenuDescription(this.page_list[page_name].description);
	}
	this.registryPage = function(page_name, page_description, init_function, show_function, function_clear) {
		var page = new Page(page_name, Application.page_place, page_name);
		eval(page_name+' = page');
		this.page_list[page.name] = page;
		this.page_list[page.name].init = init_function;
		this.page_list[page.name].show = show_function;
		this.page_list[page.name].clear = function_clear;
		this.page_list[page.name].init();
		this.page_list[page_name].description = page_description;
	}
	this.constructor(name);
}

var Application = new MainApp();



//var proc = new PROCESS_SYNC('ddd');
//delete proc;

//Application.run(PROCESS_SYNC);
//Application.run('PROCESS_SYNC');
//Application.registryProcess('PROCESS_SYNC', PROCESS_SYNC);

/*
Application.execute(PROCESS_SYNC)
Application.halt(PROCESS_SYNC)
Application.run(PROCESS_SYNC)
Application.task[PROCESS_SYNC]

*/