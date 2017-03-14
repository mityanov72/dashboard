var IDLE = 0;
var RUN = 1;
var STOP = 2;

var CONST_TIME_SERVICE_DELAY = 6000;
var CONST_TIME_SERVICE_DELAY_NEXT_PUSH = 500;



function SERVICE(name) {
	this.status_push = STOP;
	this.status_pull = STOP;
	this.constructor = function(name) {
		this.name = name;
	}
	this.INIT = function() {
	
	}
	this.START = function() {
	
	}
	this.STOP = function() {
	
	}
	this.constructor(name);
}

function SERVICE_SYNC_SERVER() {
	SERVICE.call(this, 'SERVICE_SYNC_SERVER');
	this.status_push = IDLE;
	this.status_pull = IDLE;
	this.START = function() {
		let callback = function(sender) {
			if(sender.status_push !== RUN) sender.push(); 
			if(sender.status_pull !== RUN) sender.pull();
		}
		setInterval(callback, CONST_TIME_SERVICE_DELAY, this);
	}
	this.status = function() {
		if(this.status_pull == RUN || this.status_push == RUN) {
			return RUN;
		} else {
			return IDLE;
		}
	}
	//==================================================================================================================================================================================//
	//	push	- отправляет записи из локальной таблицы transact на сервер в таблицу server_transact, после чего удаляет записи из локальной таблицы
	this.push = function() {
		var resFunction = function(level, JsonResult, sender) {
			//==================================================================================================================================================================================//
			//	resSendRecordOnServer - отправляет единичную запись на сервер, в случае успеха удаляет локальную транзакцию
			function resSendRecordOnServer(level, JsonResult, param) {	//	[callback_param, sender]
				let callback_param = param[0] || '';
				let sender = param[1] || '';
				function getResult(level, answer, [callback_param, sender]) {
					if(answer != 'ok') {
						sender.status_push = IDLE;
						EngineCon.error(null, 'push error while send record on server: ' + answer);
					} else {
						sender.status_push = RUN;
						EngineDB.executeSqlSruct(STRUCT_TABLE_CLIENT_TRANSACT, DELETE, [callback_param], function(level, res, sender) {setTimeout(function() {sender.push();}, CONST_TIME_SERVICE_DELAY_NEXT_PUSH);}, sender, DEBUG_PROCESS_SYNC_SERVER);
					}
				}
				if(level != 0) {
					EngineCon.error(null, 'push error');
					sender.status_push = IDLE;
					return -1;
				}
				sender.status_push = RUN;
				let source = JsonResult['0'];
				source['SQL_QUERY_NAME'] = callback_param.query_name;
				source['SQL_QUERY_TYPE'] = callback_param.query_type;
				source['SQL_QUERY_TABLE'] = '';
				source['SQL_QUERY_GUID'] = callback_param.GUID;
				EngineWeb.transmit(WEB_SERVER_SYNC, source, getResult, [source['SQL_QUERY_GUID'], sender]);
			}
			if(level != 0) {
				EngineCon.error(null, 'push error');
				sender.status_push = IDLE;
				return -1;
			}
			sender.status_push = RUN;
			if(DEBUG_PROCESS_SYNC_SERVER) Application.log('SERVICE_SYNC_SERVER: record count is '+JsonResult.length);
			if(JsonResult.length > 0) {
				EngineDB.executeSqlSruct(eval(JsonResult['0'].query_name), SELECT_BY_GUID, [JsonResult['0'].record_GUID], resSendRecordOnServer, [JsonResult['0'], sender], DEBUG_PROCESS_SYNC_SERVER);
			} else {
				sender.status_push = IDLE;
			}
		};
		this.status_push = RUN;
		if(DEBUG_PROCESS_SYNC_SERVER) Application.log('SERVICE_SYNC_SERVER: select count transact record');
		EngineDB.executeSqlSruct(STRUCT_TABLE_CLIENT_TRANSACT, SELECT, [], resFunction, this, false);	//	DEBUG_PROCESS_SYNC_SERVER
	}
	//==================================================================================================================================================================================//
	//	pull - получает данные с сервера и пишет их в локальную базу
	this.pull = function(query_page) {
		query_page = query_page || 1;
		var resFunction = function(level, JsonResult, sender) {
			if(level != 0) {
				EngineCon.error(null, 'pull error');
				sender.status_pull = IDLE;
				return -1;
			}
			sender.status_pull = RUN;
			let result = JSON.parse(JsonResult);
			if(result.num_rows == 0) {
				sender.status_pull = IDLE;
				return 0;
			}
			let row;
			for(let i=0; i < result.num_rows; i++) {
				row = eval('result.row'+i);
				sender.status_pull = RUN;
				EngineDB.executeSqlSruct(STRUCT_TABLE_SERVER_TRANSACT, REPLACE, [row.GUID, row.time_update, row.table_name, row.query_type, row.record_GUID], null, [], DEBUG_PROCESS_SYNC_SERVER);
			}
			if(result.sql_page < result.sql_page_total) {
				sender.status_pull = RUN;
				setTimeout(function() {sender.pull(result.sql_page+1);}, CONST_TIME_PROC_DELAY);
				//sender.pull(result.sql_page+1);
			} else {
				localStorage['TIME_UPDATE'] = row.time_update;
				sender.status_pull = IDLE;
			}
		};
		this.status_pull = RUN;
		let source = {};
		source['SQL_QUERY_NAME'] = 'SQL_SELECT_SERVER_TRANSACT';
		source['SQL_TIME_UPDATE'] = localStorage['TIME_UPDATE'];
		source['SQL_QUERY_PAGE'] = query_page;
		EngineWeb.transmit(WEB_CLIENT_SYNC, source, resFunction, this);
	}
}

function SERVICE_SYNC_CLIENT() {
	SERVICE.call(this, 'SERVICE_SYNC_CLIENT');
	this.status = IDLE;
	this.START = function() {
		let callback = function(sender) {
			if(sender.status !== RUN) sender.lookTables(); 
		}
		setInterval(callback, CONST_TIME_SERVICE_DELAY, this);
	}
	this.syncTable = function(table_name) {
		this.status = RUN;
		this.getLocalRecordCount();
		this.getLocalFirstRecord(table_name);
	}
	//	асинхронная функция, перебирает названия таблиц из server_transact
	this.lookTables = function() {
		let callback = function(error_level, ObjResult, sender) {
			if(error_level < 0) {
				this.status = IDLE;
				return -1;
			}
			let record_GUID;
			let table_name_array = [];
			for(let i=0; i < ObjResult.length; i++) {
				table_name_array[i] = ObjResult[i].table_name;
			}
			for(let i=0; i < table_name_array.length; i++) {
				if(sender.is_kill) return -999;
				let table_name = table_name_array[i];
				setTimeout(function() {sender.syncTable(table_name);}, CONST_TIME_PROC_DELAY);
			}
			if(table_name_array.length == 0) this.status = IDLE;
		}
		this.status = RUN;
		EngineDB.executeSql(SQL_SELECT_SERVER_TRANSACT_TABLENAME, [], callback, this, DEBUG_PROCESS_SYNC_CLIENT);
	}
	//	getLocalFirstRecord - асинхронная функция, возвращает первую запись из локальной таблицы server_transact по имени таблицы
	this.getLocalFirstRecord = function(table_name) {
		let callback = function(error_level, result_array_objects, sender) {
			if(error_level < 0) {
				this.status = IDLE;
				return -1;
			}
			try {
				if(result_array_objects.length > 0) {
					sender.getServerFirstRecord(table_name, result_array_objects[0].record_GUID, result_array_objects);
				}
			} catch(e) {EngineCon.catcher(EngineDB, e);}
		}
		EngineDB.executeSql(SQL_SELECT_SERVER_TRANSACT, [table_name], callback, this, DEBUG_PROCESS_SYNC_CLIENT);
	}
	//	getServerFirstRecord - асинхронная функция, возвращает одну запись из серверной таблицы по GUID
	this.getServerFirstRecord = function(table_name, GUID, callback_param) {
		let source = {};
		source['SQL_QUERY_NAME'] = 'SQL_SELECT_'+table_name.toUpperCase();
		source['GUID'] = GUID;
		EngineWeb.transmit(WEB_CLIENT_SYNC, source, this.addRecordFromServer, [this, callback_param]);
	}
	//	getLocalRecordCount - НЕ ИСПОЛЬЗУЕТСЯ ПОКА. асинхронная функция, возвращает количество строк в таблице server_transact для указанной таблицы (структуры)
	this.getLocalRecordCount = function() {
		let callback = function(error_level, result_array_objects, sender) {
			if(error_level < 0) {
				this.status = IDLE;
				return -1;
			}
			try {
				let res = getOnceObjectProper(result_array_objects[0]);//['COUNT(1)'];
				if(sender.callback_function != undefined) sender.callback_function(error_level, res, 0);
			} catch(e) {
				EngineCon.catcher(EngineDB, e);
			}
		}
		EngineDB.executeSql(COUNT_FROM_SERVER_TRANSACT, [], callback, this, DEBUG_PROCESS_SYNC_CLIENT);
	}
	this.addRecordFromServer = function(error_level, result_array_objects, [sender, callback_param]) {
		if(error_level < 0) {
			this.status = IDLE;
			return -1;
		}
		let funct_next_record = function(error_level, empty, [sender, table_name]) {
			setTimeout(function() {sender.syncTable(table_name);}, CONST_TIME_PROC_DELAY);
		}
		let funct_del_transact = function(error_level, empty, [sender, table_name]) {
			EngineDB.executeSqlSruct(STRUCT_TABLE_SERVER_TRANSACT, DELETE, [callback_param[0].GUID], funct_next_record, [sender, table_name], DEBUG_PROCESS_SYNC_CLIENT);
		}
		let struct_table = getStructTableFromName(callback_param[0].table_name);
		let param = getQueryParamFromJson(struct_table, result_array_objects);
		EngineDB.executeSqlSruct(struct_table, REPLACE, param, funct_del_transact, [sender, callback_param[0].table_name], DEBUG_PROCESS_SYNC_CLIENT);
	}
}