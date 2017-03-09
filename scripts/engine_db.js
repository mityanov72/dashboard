var DB_NAME = 'dashboard';
var DB_VERSION = '1.0';
var DB_DESCRIPTION = 'Web SQL Storage Demo Database';
var DB_SIZE = 1*1024*1024;
var CONST_MAX_TABLE_ROW_LIMIT = 200;
var DEBUG_MODE = false;

var SELECT = 'select';
var DELETE = 'delete';
var SELECT_BY_GUID = 'select by GUID';
var REPLACE = 'replace';
var CREATE = 'create';
var COUNT_FROM_SERVER_TRANSACT = 'select count(1) from server_transact';

var STRUCT_TABLE = [];


var STRUCT_TABLE_CHAT = {
	"table_name": "chat",
	"fields_count": 4,
	"select_order_by": "rowid",
	"struct_name": "STRUCT_TABLE_CHAT",
	"field0": {
		"name": "is_delete",
		"type": "INTEGER"
	},
	"field1": {
		"name": "time_update",
		"type": "INTEGER"
	},
	"field2": {
		"name": "GUID",
		"type": "TEXT PRIMARY KEY"
	},
	"field3": {
		"name": "descr",
		"type": "TEXT"
	}
};
window.STRUCT_TABLE.push(STRUCT_TABLE_CHAT);

var STRUCT_TABLE_USERS = {
	"table_name": "users",
	"fields_count": 7,
	"select_order_by": "rowid",
	"struct_name": "STRUCT_TABLE_USERS",
	"field0": {
		"name": "is_delete",
		"type": "INTEGER"
	},
	"field1": {
		"name": "time_update",
		"type": "INTEGER"
	},
	"field2": {
		"name": "GUID",
		"type": "TEXT PRIMARY KEY"
	},
	"field3": {
		"name": "mail",
		"type": "TEXT"
	},
	"field4": {
		"name": "f_name",
		"type": "TEXT"
	},
	"field5": {
		"name": "l_name",
		"type": "TEXT"
	},
	"field6": {
		"name": "m_name",
		"type": "TEXT"
	}
}
window.STRUCT_TABLE.push(STRUCT_TABLE_USERS);

var STRUCT_TABLE_CLIENT_TRANSACT = {
	"table_name": "client_transact",
	"fields_count": 4,
	"select_order_by": "rowid",
	"struct_name": "STRUCT_TABLE_CLIENT_TRANSACT",
	"field0": {
		"name": "GUID",
		"type": "TEXT PRIMARY KEY"
	},
	"field1": {
		"name": "query_name",
		"type": "TEXT"
	},
	"field2": {
		"name": "query_type",
		"type": "TEXT"
	},
	"field3": {
		"name": "record_GUID",
		"type": "TEXT"
	}
}
window.STRUCT_TABLE.push(STRUCT_TABLE_CLIENT_TRANSACT);

var STRUCT_TABLE_SERVER_TRANSACT = {
	"table_name": "server_transact",
	"fields_count": 5,
	"select_order_by": "rowid",
	"struct_name": "STRUCT_TABLE_SERVER_TRANSACT",
	"field0": {
		"name": "GUID",
		"type": "TEXT PRIMARY KEY"
	},
	"field1": {
		"name": "time_update",
		"type": "INTEGER"
	},
	"field2": {
		"name": "table_name",
		"type": "TEXT"
	},
	"field3": {
		"name": "query_type",
		"type": "TEXT"
	},
	"field4": {
		"name": "record_GUID",
		"type": "TEXT"
	}
}
window.STRUCT_TABLE.push(STRUCT_TABLE_SERVER_TRANSACT);

var STRUCT_TABLE_CUSTOMER = {
	"table_name": "customer",
	"fields_count": 6,
	"select_order_by": "rowid",
	"struct_name": "STRUCT_TABLE_CUSTOMER",
	"field0": {
		"name": "is_delete",
		"type": "INTEGER"
	},
	"field1": {
		"name": "time_update",
		"type": "INTEGER"
	},
	"field2": {
		"name": "GUID",
		"type": "TEXT PRIMARY KEY"
	},
	"field3": {
		"name": "title",
		"type": "TEXT"
	},
	"field4": {
		"name": "address",
		"type": "TEXT"
	},
	"field5": {
		"name": "town",
		"type": "TEXT"
	}
}
window.STRUCT_TABLE.push(STRUCT_TABLE_CUSTOMER);

var STRUCT_TABLE_EQUIP_CAT = {
	"table_name": "equipment_category",
	"fields_count": 4,
	"select_order_by": "title",
	"struct_name": "STRUCT_TABLE_EQUIP_CAT",
	"field0": {
		"name": "is_delete",
		"type": "INTEGER"
	},
	"field1": {
		"name": "time_update",
		"type": "INTEGER"
	},
	"field2": {
		"name": "GUID",
		"type": "TEXT PRIMARY KEY"
	},
	"field3": {
		"name": "title",
		"type": "TEXT"
	}
}
window.STRUCT_TABLE.push(STRUCT_TABLE_EQUIP_CAT);

var STRUCT_TABLE_EQUIPMENT = {
	"table_name": "equipment",
	"fields_count": 7,
	"select_order_by": "title",
	"struct_name": "STRUCT_TABLE_EQUIPMENT",
	"field0": {
		"name": "is_delete",
		"type": "INTEGER"
	},
	"field1": {
		"name": "time_update",
		"type": "INTEGER"
	},
	"field2": {
		"name": "GUID",
		"type": "TEXT PRIMARY KEY"
	},
	"field3": {
		"name": "category_GUID",
		"type": "TEXT"
	},
	"field4": {
		"name": "title",
		"type": "TEXT"
	},
	"field5": {
		"name": "model",
		"type": "TEXT"
	},
	"field6": {
		"name": "manufacturer",
		"type": "TEXT"
	}
}
window.STRUCT_TABLE.push(STRUCT_TABLE_EQUIPMENT);

var STRUCT_TABLE_CUSTOMER_EQUIPMENT = {
	"table_name": "customer_equipment",
	"fields_count": 9,
	"select_order_by": "title",
	"struct_name": "STRUCT_TABLE_CUSTOMER_EQUIPMENT",
	"field0": {
		"name": "is_delete",
		"type": "INTEGER"
	},
	"field1": {
		"name": "time_update",
		"type": "INTEGER"
	},
	"field2": {
		"name": "GUID",
		"type": "TEXT PRIMARY KEY"
	},
	"field3": {
		"name": "QR_string",
		"type": "TEXT"
	},
	"field4": {
		"name": "customer_GUID",
		"type": "TEXT"
	},
	"field5": {
		"name": "equipment_GUID",
		"type": "TEXT"
	},
	"field6": {
		"name": "num_serial",
		"type": "TEXT"
	},
	"field7": {
		"name": "num_invent",
		"type": "TEXT"
	},
	"field8": {
		"name": "date_create",
		"type": "TEXT"
	}
}
window.STRUCT_TABLE.push(STRUCT_TABLE_CUSTOMER_EQUIPMENT);

var STRUCT_TABLE_CONTRACT = {
	"table_name": "contract",
	"fields_count": 5,
	"select_order_by": "title",
	"struct_name": "STRUCT_TABLE_CONTRACT",
	"field0": {
		"name": "is_delete",
		"type": "INTEGER"
	},
	"field1": {
		"name": "time_update",
		"type": "INTEGER"
	},
	"field2": {
		"name": "GUID",
		"type": "TEXT PRIMARY KEY"
	},
	"field3": {
		"name": "customer_GUID",
		"type": "TEXT"
	},
	"field4": {
		"name": "description",
		"type": "TEXT"
	}
}
window.STRUCT_TABLE.push(STRUCT_TABLE_CONTRACT);

function createQueryCreate(struct_table) {
	var str = 'CREATE TABLE IF NOT EXISTS '+struct_table.table_name+' (';
	var splitter = ', ';
	for(var i = 0; i < struct_table.fields_count; i++) {
		if(i == struct_table.fields_count-1) {
			splitter = ')';
		}
		str = str + eval('struct_table.field'+i+'.name') + ' ' + eval('struct_table.field'+i+'.type') + splitter;
	}
	return str;
}

function createQueryReplace(struct_table) {
	var str = 'REPLACE INTO '+struct_table.table_name+' (';
	var str_fields = '';
	var str_values = '';
	var splitter = ', ';
	for(var i = 0; i < struct_table.fields_count; i++) {
		if(i == struct_table.fields_count-1) {
			splitter = '';
		}
		str_fields = str_fields + eval('struct_table.field'+i+'.name') + splitter;
		str_values = str_values + '?' + splitter;
	}
	str = str + str_fields + ') VALUES (' + str_values + ')';
	return str;
}

function createQuerySelect(struct_table) {
	var str = 'SELECT * FROM '+struct_table.table_name+' ORDER BY '+struct_table.select_order_by+' LIMIT '+CONST_MAX_TABLE_ROW_LIMIT;
	return str;
}

function createQueryDelete(struct_table) {
	var str = 'DELETE FROM '+struct_table.table_name+' WHERE GUID = ?';
	return str;
}

function createQuerySelectByGuid(struct_table) {
	var str = 'SELECT * FROM '+struct_table.table_name+' WHERE GUID = ?';
	return str;
}

function createQueryCountFromServerTransact(struct_table) {
	var str = 'SELECT COUNT(1) FROM server_transact WHERE table_name = \''+struct_table.table_name+'\'';
	return str;
}

function getQueryParamFromJson(struct_table, JsonResult) {
	let res_array = [];
	let field_name;
	let str;
	let result = JSON.parse(JsonResult);
	for(let i = 0; i < struct_table.fields_count; i++) {
		field_name = eval('struct_table.field'+i+'.name');
		str = eval('result.row0.'+field_name);
		res_array[i] = str;
	}
	return res_array;
}


var SQL_SELECT_SERVER_TRANSACT_TABLENAME =	'SELECT DISTINCT table_name FROM server_transact';
var SQL_SELECT_SERVER_TRANSACT =			'SELECT * FROM server_transact WHERE table_name = ? ORDER BY time_update, rowid ASC LIMIT 1';
var SQL_SELECT_SERVER_TRANSACT_FIRST_GUID =	'SELECT GUID FROM server_transact WHERE table_name = ? ORDER BY time_update, rowid ASC LIMIT 1';
var SQL_DELETE_TRANSACT =		'DELETE FROM client_transact WHERE GUID = ?';

if(localStorage['TIME_UPDATE'] == null) {
	var now = new Date(2011, 0, 1);
	localStorage['TIME_UPDATE'] = now.format("yyyy-mm-dd HH:MM:ss");
}



class DBEngine {
	constructor(name) {
		this.dataBase = null;
		EngineCon.log(this, 'ready');
		if (window.openDatabase){
		} else{
			EngineCon.error(this, 'browser does not have support for WebSQL');
		}
		this.dataBase = openDatabase(DB_NAME, DB_VERSION, DB_DESCRIPTION, DB_SIZE);
		this.createSqlTable();
	}
	createSqlTable() {
		let struct_table;
		for(let i=0; i < window.STRUCT_TABLE.length; i++) {
			struct_table = window.STRUCT_TABLE[i];
			this.executeSqlSruct(struct_table, CREATE, [], null, null, DEBUG_DB_CREATE);
		}
		/*this.executeSqlSruct(STRUCT_TABLE_USERS, CREATE, []);
		this.executeSqlSruct(STRUCT_TABLE_TRANSACT, CREATE, []);
		this.executeSqlSruct(STRUCT_TABLE_SERVER_TRANSACT, CREATE, []);
		this.executeSqlSruct(STRUCT_TABLE_CHAT, CREATE, []);
		this.executeSqlSruct(STRUCT_TABLE_CUSTOMER, CREATE, []);*/
	}

	//==================================================================================================================================================================================//
	//	executeSql			- приватная асинхронная функция, нужна для выполнения executeSqlSruct
	//
	//	queryString			- текст SQL запроса
	//	param, callback_function, callback_param - то же, что и у executeSqlSruct
	executeSql(query_string, param, callback_function, callback_param, log_write = true){
		this.dataBase.transaction(
			function(tx) {
				if(log_write) EngineCon.log(EngineDB, 'Query Success ['+query_string+']');
				tx.executeSql(query_string, equal_string(param),
					function (tx, result) {
						var result_array_objects = [];
						for (var i=0; i < result.rows.length; i++) {
							result_array_objects.push(result.rows.item(i));
						}
						if(callback_function != undefined) {
							callback_function(0, result_array_objects, callback_param);
						}
					},
					function (tx, error) {
						EngineCon.error(this, 'Query Error: ' + error.message + ' (error_code:'+error.code+')');
						return -1;
					}
				);
			},
			function (error) {
				EngineCon.error(this, 'Transaction Error: ' + error.message);
				return -1;
			},
			function () {
				//EngineCon.log(this, 'Transaction Success');
			}
		);
    }

	//==================================================================================================================================================================================//
	//	executeSqlSruct		- асинхронная функция, выполняет SQL запрос к локальной БД, возвращает 0 в случае успеха и запускает call back функцию асинхронно
	//
	//	struct_table		- структура таблицы БЦ, представляет собой объект, например STRUCT_TABLE_USERS
	//	type_query			- тип запроса create | replace | count в виде строки
	//	param				- массив параметров запроса, это те значения, которые встанут вместо вопросительных знаков. т.к. это массив, то он вставляется в скобках: [param1, param2, ..]
	//	callback_function	- функция, которая будет вызвана после успешного выполнения текущей функции. в качестве параметров вызова будет: 
	//						  error level - уровень ошибки (0 - ок); result_array_objects - массив объектов (строки таблицы) и callback_param (см. далее)
	//	callback_param		- параметры, которые нужно будет передать call back функции, это массив, он вставляется в скобках: [param1, param2, ..]
	executeSqlSruct(struct_table, type_query, param, callback_function, callback_param, log_write = true) {
		var query_string;
		switch(type_query) {
			case(CREATE):
			query_string = createQueryCreate(struct_table);
			break;
			case(REPLACE):
			query_string = createQueryReplace(struct_table);
			break;
			case(SELECT):
			query_string = createQuerySelect(struct_table);
			break;
			case(DELETE):
			query_string = createQueryDelete(struct_table);
			break;
			case(SELECT_BY_GUID):
			query_string = createQuerySelectByGuid(struct_table);
			break;
			case(COUNT_FROM_SERVER_TRANSACT):
			query_string = createQueryCountFromServerTransact(struct_table);
			break;
			default: return -1;
		}
		this.executeSql(query_string, param, callback_function, callback_param, log_write);
	}
	
	getPagesTable(transmit_script, table_name, query_page = 1, callback_function) {
		getQueryFromTablenameToSync(table_name);
	}
	
	addUser(f_name, l_name, m_name, mail) {
		var GUID = guid();
		this.execSql(SQL_INSERT_USER, [GUID, mail, f_name, l_name, m_name]);
	}
	
	selectUsers() {
		var resFunction = function(level, JsonResult) {alert(JsonResult)};
		//this.execSql(SQL_SELECT_USERS, [], resFunction);
	}
	
	addChat(descr) {
		var GUID = guid();
		this.addTransactRecord(STRUCT_TABLE_CHAT, GUID, [0, 0, GUID, descr]);
	}
	
	addTransactRecord(struct_table, record_GUID, params) {
		let GUID_tr = guid();
		this.executeSqlSruct(struct_table, REPLACE, params);
		this.executeSqlSruct(STRUCT_TABLE_CLIENT_TRANSACT, REPLACE, [GUID_tr, struct_table.struct_name, REPLACE, record_GUID]);
	}
	
	addCustomer(title, town) {
		var GUID = guid();
		this.addTransactRecord(STRUCT_TABLE_CUSTOMER, GUID, [0, 0, GUID, title, '', town]);
	}
	
	addEquipment(GUID, category, title, model, manufacturer) {
		if(GUID == '') {
			GUID = guid();
		}
		this.addTransactRecord(STRUCT_TABLE_EQUIPMENT, GUID, [0, 0, GUID, category, title, model, manufacturer]);
		//this.executeSql("REPLACE INTO equipment (is_delete, time_update, GUID, category, title, model, manufacturer) VALUES (?, ?, ?, ?, ?, ?, ?)", [0, 0, GUID, category, title, model, manufacturer]);
	}
	
	addCustomerEquipment(GUID, qr_string, customer_guid, equipment_guid, num_serial, num_invent, date_create) {
		if(GUID == '') {
			GUID = guid();
		}
		this.addTransactRecord(STRUCT_TABLE_CUSTOMER_EQUIPMENT, GUID, [0, 0, GUID, qr_string, customer_guid, equipment_guid, num_serial, num_invent, date_create]);
	}
	
	addContract(GUID, customer_GUID, description) {
		if(GUID == '') {
			GUID = guid();
		}
		this.addTransactRecord(STRUCT_TABLE_CONTRACT, GUID, [0, 0, GUID, customer_GUID, description]);
	}
	
	addNonTransactRecord() {
		//this.execSql(query_insert_name, params);
	}
	
}



function getQueryFromTableNameToSync(table_name) {
	var query_name;
	var query_row_count;
	switch(table_name) {
		case 'chat':
		query_name = '';
		query_row_count = '';
		break;
	}
	return query_name;
}

function getStructTableFromName(table_name) {
	let struct_table;
	for(let i=0; i < window.STRUCT_TABLE.length; i++) {
		struct_table = window.STRUCT_TABLE[i];
		if(struct_table.table_name == table_name) {
			return window.STRUCT_TABLE[i];
		}
	}
	/*switch(table_name) {
		case 'chat': return STRUCT_TABLE_CHAT; break;
		case 'customer': return STRUCT_TABLE_CUSTOMER; break;
	}*/
}

class PROCESS_SYNC_SERVER extends PROCESS {
	START() {
		this.syncServer();
		this.syncServerTransactTable();
	}
	//==================================================================================================================================================================================//
	//	syncServer	- отправляет записи из локальной таблицы transact на сервер в таблицу server_transact, после чего удаляет записи из локальной таблицы
	syncServer() {
		var resFunction = function(level, JsonResult, sender) {
			//==================================================================================================================================================================================//
			//	resSendRecordOnServer - отправляет единичную запись на сервер, в случае успеха удаляет локальную транзакцию
			function resSendRecordOnServer(level, JsonResult, [callback_param, sender]) {
				function getResult(level, answer, [callback_param, sender]) {
					if(answer != 'ok') {
						EngineCon.error(null, 'syncServer error while send record on server: ' + answer);
					} else {
						EngineDB.executeSqlSruct(STRUCT_TABLE_CLIENT_TRANSACT, DELETE, [callback_param], function(level, res, sender) {setTimeout(function() {sender.syncServer();}, CONST_TIME_PROC_DELAY);}, sender, DEBUG_PROCESS_SYNC_SERVER);
					}
				}
				if(level != 0) {
					EngineCon.error(null, 'syncServer error');
					return -1;
				}
				sender.alive = true;
				var source = JsonResult['0'];
				source['SQL_QUERY_NAME'] = callback_param.query_name;
				source['SQL_QUERY_TYPE'] = callback_param.query_type;
				source['SQL_QUERY_TABLE'] = '';
				source['SQL_QUERY_GUID'] = callback_param.GUID;
				EngineWeb.transmit(WEB_SERVER_SYNC, source, getResult, [source['SQL_QUERY_GUID'], sender]);
			}
			sender.alive = true;
			if(level != 0) {
				EngineCon.error(null, 'syncServer error');
				sender.HALT(0);
				return -1;
			}
			if(DEBUG_PROCESS_SYNC_SERVER) Application.log(sender.name+' ['+sender.PID+']: record count is '+JsonResult.length);
			if(JsonResult.length > 0) {
				EngineDB.executeSqlSruct(eval(JsonResult['0'].query_name), SELECT_BY_GUID, [JsonResult['0'].record_GUID], resSendRecordOnServer, [JsonResult['0'], sender], DEBUG_PROCESS_SYNC_SERVER);
			} else {
				sender.alive = false;
				sender.HALT(2*CONST_TIME_PROC_DELAY);
				if(DEBUG_PROCESS_SYNC_SERVER) Application.log(sender.name+' ['+sender.PID+']: HALT process');
			}
		};
		this.alive = true;
		if(DEBUG_PROCESS_SYNC_SERVER) Application.log(this.name+' ['+this.PID+']: select count transact record');
		EngineDB.executeSqlSruct(STRUCT_TABLE_CLIENT_TRANSACT, SELECT, [], resFunction, this, false);	//	DEBUG_PROCESS_SYNC_SERVER
	}
	//==================================================================================================================================================================================//
	//	syncServerTransactTable - синхронизирует таблицу server_transact
	syncServerTransactTable(query_page = 1) {
		var resFunction = function(level, JsonResult, sender) {
			sender.alive = true;
			var result = JSON.parse(JsonResult);
			if(result.num_rows == 0) {
				return 0;
			}
			var row;
			for(var i=0; i < result.num_rows; i++) {
				row = eval('result.row'+i);
				//EngineDB.execSql(SQL_INSERT_SERVER_TRANSACT, [row.GUID, row.time_update, row.table_name, row.query_type, row.record_GUID]);
				EngineDB.executeSqlSruct(STRUCT_TABLE_SERVER_TRANSACT, REPLACE, [row.GUID, row.time_update, row.table_name, row.query_type, row.record_GUID], null, [], DEBUG_PROCESS_SYNC_SERVER);
			}
			if(result.sql_page < result.sql_page_total) {
				setTimeout(function() {sender.syncServerTransactTable(result.sql_page+1);}, CONST_TIME_PROC_DELAY);
				//sender.syncServerTransactTable(result.sql_page+1);
			} else {
				localStorage['TIME_UPDATE'] = row.time_update;
				sender.HALT(2*CONST_TIME_PROC_DELAY);
			}
		};
		this.alive = true;
		var source = {};
		source['SQL_QUERY_NAME'] = 'SQL_SELECT_SERVER_TRANSACT';
		source['SQL_TIME_UPDATE'] = localStorage['TIME_UPDATE'];
		source['SQL_QUERY_PAGE'] = query_page;
		EngineWeb.transmit(WEB_CLIENT_SYNC, source, resFunction, this);
	}
}

class PROCESS_SYNC_CLIENT extends PROCESS {
/*
	this.callback_function(level, total_count, current_position)
*/
	constructor() {
		super();
		this.count_record = 0;
	}
	INIT() {
		//...
	}
	START() {
		//==================================================================================================================================================================================//
		//	асинхронная функция, перебирает названия таблиц из server_transact
		//
		let getTransactTableName = function(callback_function, sender) {
			let resFunction = function(error_level, ObjResult, sender) {
				if(error_level < 0) {
					sender.HALT(2*CONST_TIME_PROC_DELAY);
					return -1;
				}
				sender.alive = true;
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
				if(table_name_array.length == 0) sender.HALT(2*CONST_TIME_PROC_DELAY);
			}
			sender.alive = true;
			EngineDB.executeSql(SQL_SELECT_SERVER_TRANSACT_TABLENAME, [], resFunction, sender, DEBUG_PROCESS_SYNC_CLIENT);
		}
		this.alive = true;
		getTransactTableName(null, this);
	}
	syncTable(table_name) {
		if(this.is_kill) return -999;
		this.getSqlServerTransactCount();
		this.getLocalSqlServerTransactFirstRecordByTableName(table_name, this);
	}
	//==================================================================================================================================================================================//
	//	getLocalSqlServerTransactFirstRecordByTableName - асинхронная функция, возвращает первую запись из локальной таблицы server_transact по имени таблицы
	//
	//	table_name			- имя таблицы, у которой ищется запись
	//	callback_param		- параметры, которые нужно будет передать call back функции, это массив, он вставляется в скобках: [param1, param2, ..]
	getLocalSqlServerTransactFirstRecordByTableName(table_name, callback_param) {
		let callFunction = function(error_level, result_array_objects, sender) {
			if(error_level < 0) {
				sender.HALT(2*CONST_TIME_PROC_DELAY);
				return -1;
			}
			try {
				if(result_array_objects.length > 0) {
					sender.alive = true;
					sender.getServerSqlRecordByGuid(table_name, result_array_objects[0].record_GUID, result_array_objects);
				}
			} catch(e) {EngineCon.catcher(EngineDB, e);}
		}
		this.alive = true;
		EngineDB.executeSql(SQL_SELECT_SERVER_TRANSACT, [table_name], callFunction, this, DEBUG_PROCESS_SYNC_CLIENT);
	}

	//==================================================================================================================================================================================//
	//	getServerSqlRecordByGuid - асинхронная функция, возвращает одну запись из серверной таблицы по GUID
	//
	//	table_name			- имя таблицы, в которой ищется запись
	//	GUID				- GUID записи
	//	callback_param		- параметры, которые нужно будет передать call back функции, это массив, он вставляется в скобках: [param1, param2, ..]
	getServerSqlRecordByGuid(table_name, GUID, callback_param) {
		this.alive = true;
		let source = {};
		source['SQL_QUERY_NAME'] = 'SQL_SELECT_'+table_name.toUpperCase();
		source['GUID'] = GUID;
		EngineWeb.transmit(WEB_CLIENT_SYNC, source, this.addRecordFromServer, [this, callback_param]);
	}
	
	//==================================================================================================================================================================================//
	//	getSqlServerTransactCount - асинхронная функция, возвращает количество строк в таблице server_transact для указанной таблицы (структуры)
	//
	getSqlServerTransactCount(callback_param) {
		let callFunction = function(error_level, result_array_objects, sender) {
			if(error_level < 0) {
				sender.HALT(2*CONST_TIME_PROC_DELAY);
				return -1;
			}
			try {
				let res = getOnceObjectProper(result_array_objects[0]);//['COUNT(1)'];
				if(sender.callback_function != undefined) sender.callback_function(error_level, res, 0);
				sender.alive = true;
			} catch(e) {
				EngineCon.catcher(EngineDB, e);
			}
		}
		this.alive = true;
		EngineDB.executeSql(COUNT_FROM_SERVER_TRANSACT, [], callFunction, this, DEBUG_PROCESS_SYNC_CLIENT);
	}
	addRecordFromServer(error_level, result_array_objects, [sender, callback_param]) {
		if(error_level < 0) {
			sender.HALT(2*CONST_TIME_PROC_DELAY);
			return -1;
		}
		sender.alive = true;
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

