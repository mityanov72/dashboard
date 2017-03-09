var CONST_TIME_PROC_INTERRUPT = 3000;
var CONST_TIME_PROC_DELAY = 1000;			// время задержки циклов внутри процесса
var DEAD = -1;
var INIT = 0;
var RUN = 1;




var EngineCon = new ConsoleEngine();
var EngineDB = new DBEngine();
var EngineWeb = new WebEngine();


class MainApp {
	constructor(name) {
		let interrupt = function() {
			 for(var proc_name in Application.task_list) {
				Application.checkProcess(proc_name);
				let proc_link = Application.task_list[proc_name];
				let str = proc_link;
			}
			try {
				//Application.task_list.init();
			} catch(e) {}
			setTimeout(interrupt, CONST_TIME_PROC_INTERRUPT);
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
	queueOnline() {
		if(this.stop) { return -1; }
		Application.runIsDead(PROCESS_SYNC_CLIENT);
		Application.runIsDead(PROCESS_SYNC_SERVER);
	}
	checkOnline() {
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
	get isOnline() {
		return this.online_flag;
	}
	get showTask() {
		let result = 'PID    | process name\n-------+--------------------';
		for(let process_name in this.task_list)
		{
			result = result + '\n[' + this.task_list[process_name].PID + '] | ' + process_name;
		}
		//if(result !== '') Application.log(this, result);
		return result;
	}
	checkProcess(process_name) {
		if(this.task_list[process_name] == undefined) {
			return DEAD;
		}
		if(this.task_list[process_name].alive == false && this.task_list[process_name].is_kill == true) {
			this.halt(process_name);
			return DEAD;
		}
		/*if(DEBUG_PROCESS) Application.log(this, process_name+' ['+this.task_list[process_name].PID+'] is not DEAD');
		if(DEBUG_PROCESS) Application.log('\n'+this.showTask);
		let sender = this.task_list[process_name];
		setTimeout(function(){sender.watchDog(sender);}, sender.live_time);*/
		//this.task_list[process_name].alive == false;
		return INIT;
	}
	init(class_name) {
		let proc = new class_name();
		let proc_name = proc.constructor.name;
		if(this.task_list[proc_name] != undefined) {
			this.error(this, 'init process error. process name ['+proc_name+'] already exists');
			return -1;
		}
		this.task_list[proc_name] = proc;
		this.task_list[proc_name].name = proc_name;
		proc = undefined;
		this.task_list[proc_name].INIT();
	}
	run(proc_or_class_name, proc_param) {
		let type_var = typeof proc_or_class_name;
		switch (type_var) {
			case 'function':
				let proc = new proc_or_class_name();
				let proc_name = proc.constructor.name;
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
	runIsDead(proc_or_class_name, proc_param) {
		let process_name = '';
		let type_var = typeof proc_or_class_name;
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
	halt(proc_or_class_name) {
		try {
			let process_name = proc_or_class_name;
			if(typeof proc_or_class_name == 'object') {
				process_name = proc_or_class_name.name;
			}
			//this.checkProcess(process_name);
			this.task_list[process_name] = undefined;
			delete this.task_list[process_name];
		} catch(e) {}
	}
	static get elemClass() {
		return "menu"
	}
	log(sender, message) {
		EngineCon.log(sender, message);
	}
	error(sender, message) {
		EngineCon.error(sender, message);
	}
	catcher(sender, error) {
		EngineCon.catcher(sender, error);
	}
	login() {
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
	open(page_name) {
		this.page_place = document.getElementById('mainPage');
		this.page_place.innerHTML = '';
		this.page_place.appendChild(this.page_list[page_name].element);
		this.page_list[page_name].show();
		setMenuDescription(this.page_list[page_name].description);
	}
	registryPage(page_name, page_description, init_function, show_function, function_clear) {
		var page = new Page(page_name, Application.page_place, page_name);
		eval(page_name+' = page');
		this.page_list[page.name] = page;
		this.page_list[page.name].init = init_function;
		this.page_list[page.name].show = show_function;
		this.page_list[page.name].clear = function_clear;
		this.page_list[page.name].init();
		this.page_list[page_name].description = page_description;
	}
}

var Application = new MainApp();



//let proc = new PROCESS_SYNC('ddd');
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