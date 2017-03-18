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
		var callback = function() {
			if(DEBUG_PROCESS_SYNC_SERVER) Application.log('SERVICE_SYNC_SERVER.START');
			if(this.status_push !== RUN) this.push(); 
			if(this.status_pull !== RUN) this.pull();
		}
		TASK_MANAGER.addTask(callback.bind(this), LOW);
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
		var resFunction = function(result) {
			//==================================================================================================================================================================================//
			//	resSendRecordOnServer - отправляет единичную запись на сервер, в случае успеха удаляет локальную транзакцию
			function resSendRecordOnServer(result, record) {
				function getResult(level, answer, record_GUID) {
					if(answer != 'ok') {
						this.status_push = IDLE;
						EngineCon.error(null, 'push error while send record on server: ' + answer);
					} else {
						this.status_push = RUN;
						mysql(SQL.TABLE_CLIENT_TRANSACT, DELETE, [record_GUID], TASK_MANAGER.addTask.bind(TASK_MANAGER, this.push.bind(this), LOW));
					}
				}
				this.status_push = RUN;
				var source = record['0'];
				source['SQL_QUERY_NAME'] = result.query_name;
				source['SQL_QUERY_TYPE'] = result.query_type;
				source['SQL_QUERY_TABLE'] = '';
				source['SQL_QUERY_GUID'] = result.GUID;
				EngineWeb.transmit(WEB_SERVER_SYNC, source, getResult.bind(this), source['SQL_QUERY_GUID']);
			}
			this.status_push = RUN;
			if(DEBUG_PROCESS_SYNC_SERVER) Application.log('SERVICE_SYNC_SERVER: record count in local transact table is '+result.length);
			if(result.length > 0) {
				mysql(eval('SQL.'+result['0'].query_name), SELECT_BY_GUID, [result['0'].record_GUID], resSendRecordOnServer.bind(this, result['0']));
			} else {
				this.status_push = IDLE;
				//if(DEBUG_PROCESS_SYNC_SERVER) Application.log('SERVICE_SYNC_SERVER: add delayed task');
				TASK_MANAGER.addTask(this.push.bind(this), LOW);
			}
		};
		this.status_push = RUN;
		//if(DEBUG_PROCESS_SYNC_SERVER) Application.log('SERVICE_SYNC_SERVER: select count transact record');
		mysql(SQL.TABLE_CLIENT_TRANSACT, SELECT, [], resFunction.bind(this));
	}
	//==================================================================================================================================================================================//
	//	pull - получает данные с сервера и пишет их в локальную базу
	this.pull = function(query_page) {
		query_page = query_page || 0;
		var resFunction = function(level, server_answer) {
			if(level != 0) {
				EngineCon.error(null, 'pull error');
				this.status_pull = IDLE;
				return -1;
			}
			this.status_pull = RUN;
			var result = JSON.parse(server_answer);
			if(DEBUG_PROCESS_SYNC_SERVER) Application.log('SERVICE_SYNC_SERVER: record count on server after ['+localStorage['TIME_UPDATE']+'] is: '+result.num_rows);
			if(result.num_rows == 0) {
				this.status_pull = IDLE;
				TASK_MANAGER.addTask(this.pull.bind(this), LOW);
				return 0;
			}
			var row;
			for(var i=0; i < result.num_rows; i++) {
				row = eval('result.row'+i);
				this.status_pull = RUN;
				//EngineDB.executeSqlSruct(STRUCT_TABLE_SERVER_TRANSACT, REPLACE, [row.GUID, row.time_update, row.table_name, row.query_type, row.record_GUID], null, [], DEBUG_PROCESS_SYNC_SERVER);
				mysql(SQL.TABLE_SERVER_TRANSACT, REPLACE, [row.GUID, row.time_update, row.table_name, row.query_type, row.record_GUID]);
			}
			if(result.sql_page < (result.sql_page_total - 1)) {
				this.status_pull = RUN;
				//setTimeout(function() {sender.pull(result.sql_page+1);}, CONST_TIME_PROC_DELAY);
				TASK_MANAGER.addTask(this.pull.bind(this, result.sql_page+1));
				//sender.pull(result.sql_page+1);
			} else {
				localStorage['TIME_UPDATE'] = row.time_update;
				this.status_pull = IDLE;
			}
		};
		this.status_pull = RUN;
		var source = {};
		source['SQL_QUERY_NAME'] = 'SQL_SELECT_SERVER_TRANSACT';
		source['SQL_TIME_UPDATE'] = localStorage['TIME_UPDATE'];
		source['SQL_QUERY_PAGE'] = query_page;
		EngineWeb.transmit(WEB_CLIENT_SYNC, source, resFunction.bind(this));
	}
}

function SERVICE_SYNC_CLIENT() {
	SERVICE.call(this, 'SERVICE_SYNC_CLIENT');
	this.status = IDLE;
	this.START = function() {
		var callback = function() {
			if(this.status !== RUN) this.lookTables(); 
		}
		TASK_MANAGER.addTask(callback.bind(this), LOW, true);
	}
	this.syncTable = function(table_name) {
		this.status = RUN;
		//this.getLocalRecordCount();
		this.getLocalFirstRecord(table_name);
	}
	//	асинхронная функция, перебирает названия таблиц из server_transact
	this.lookTables = function() {
		var callback = function(result) {
			var record_GUID;
			var table_name_array = [];
			for(var i=0; i < result.length; i++) {
				table_name_array[i] = result[i].table_name;
			}
			for(var i=0; i < table_name_array.length; i++) {
				var table_name = table_name_array[i];
				TASK_MANAGER.addTask(this.syncTable.bind(this, table_name));
				if(DEBUG_PROCESS_SYNC_CLIENT) Application.log('SERVICE_SYNC_CLIENT: add task to sync table ['+table_name+']');
			}
			if(table_name_array.length == 0) this.status = IDLE;
		}
		this.status = RUN;
		alasql(SQL_SELECT_SERVER_TRANSACT_TABLENAME, [], callback.bind(this));
	}
	//	getLocalFirstRecord - асинхронная функция, возвращает первую запись из локальной таблицы server_transact по имени таблицы
	this.getLocalFirstRecord = function(table_name) {
		alasql(SQL_SELECT_SERVER_TRANSACT, [table_name], this.getServerFirstRecord.bind(this, table_name));
	}
	//	getServerFirstRecord - асинхронная функция, возвращает одну запись из серверной таблицы по GUID
	this.getServerFirstRecord = function(table_name, result) {
		if(result == undefined || result.length == 0) {
			if(DEBUG_PROCESS_SYNC_CLIENT) Application.log('SERVICE_SYNC_CLIENT: no more transact record for ['+table_name+']');
			return 1;
		}
		result = result[0];
		var source = {};
		source['SQL_QUERY_NAME'] = 'SQL_SELECT_'+result.table_name.toUpperCase();
		source['GUID'] = result.record_GUID;
		EngineWeb.transmit(WEB_CLIENT_SYNC, source, this.addRecordFromServer.bind(this), result);
	}
	//	getLocalRecordCount - НЕ ИСПОЛЬЗУЕТСЯ ПОКА. асинхронная функция, возвращает количество строк в таблице server_transact для указанной таблицы (структуры)
	this.getLocalRecordCount = function() {
		var callback = function(error_level, result_array_objects, sender) {
			if(error_level < 0) {
				this.status = IDLE;
				return -1;
			}
			try {
				var res = getOnceObjectProper(result_array_objects[0]);//['COUNT(1)'];
				if(sender.callback_function != undefined) sender.callback_function(error_level, res, 0);
			} catch(e) {
				EngineCon.catcher(EngineDB, e);
			}
		}
		//EngineDB.executeSql(COUNT_FROM_SERVER_TRANSACT, [], callback, this, DEBUG_PROCESS_SYNC_CLIENT);
		mysql(COUNT_FROM_SERVER_TRANSACT, [], callback, this, DEBUG_PROCESS_SYNC_CLIENT);
	}
	this.addRecordFromServer = function(error_level, result_array_objects, callback_param) {

		var funct_next_record = function(table_name) {
			TASK_MANAGER.addTask(this.syncTable.bind(this, table_name));
		}
		var funct_del_transact = function(callback_param) {
			mysql(SQL.TABLE_SERVER_TRANSACT, DELETE, [callback_param.GUID], funct_next_record.bind(this, callback_param.table_name));
		}
		var struct_table = getStructTableFromName(callback_param.table_name);
		var param = getQueryParamFromJson(struct_table, result_array_objects);
		mysql(struct_table, REPLACE, param, funct_del_transact.bind(this, callback_param));
	}
}
