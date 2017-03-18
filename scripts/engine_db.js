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
	var res_array = [];
	var field_name;
	var str;
	var result = JSON.parse(JsonResult);
	for(var i = 0; i < struct_table.fields_count; i++) {
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
	//localStorage['TIME_UPDATE'] = now.format("yyyy-mm-dd HH:MM:ss");
}


function DBEngine(name) {
	this.constructor = function(name) {
		this.dataBase = null;
		EngineCon.log(this, 'ready');
		if (window.openDatabase){
		} else{
			EngineCon.error(this, 'browser does not have support for WebSQL');
		}
		this.dataBase = openDatabase(DB_NAME, DB_VERSION, DB_DESCRIPTION, DB_SIZE);
		this.createSqlTable();
	}
	this.createSqlTable = function() {
		var struct_table;
		for(var i=0; i < window.STRUCT_TABLE.length; i++) {
			struct_table = window.STRUCT_TABLE[i];
			this.executeSqlSruct(struct_table, CREATE, [], null, null, DEBUG_DB_CREATE);
		}
	}

	//	executeSql			- приватная асинхронная функция, нужна для выполнения executeSqlSruct
	this.executeSql = function(query_string, param, callback_function, callback_param, log_write){
		log_write = log_write || true;
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

	//	executeSqlSruct		- асинхронная функция, выполняет SQL запрос к локальной БД, возвращает 0 в случае успеха и запускает call back функцию асинхронно
	this.executeSqlSruct = function(struct_table, type_query, param, callback_function, callback_param, log_write) {
		log_write = log_write || true;
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
	
	this.getPagesTable = function(transmit_script, table_name, query_page, callback_function) {
		query_page = query_page || 1;
		getQueryFromTablenameToSync(table_name);
	}
	
	this.addUser = function(f_name, l_name, m_name, mail) {
		var GUID = guid();
		this.execSql(SQL_INSERT_USER, [GUID, mail, f_name, l_name, m_name]);
	}
	
	this.selectUsers = function() {
		var resFunction = function(level, JsonResult) {alert(JsonResult)};
		//this.execSql(SQL_SELECT_USERS, [], resFunction);
	}
	
	this.addChat = function(descr) {
		var GUID = guid();
		this.addTransactRecord(STRUCT_TABLE_CHAT, GUID, [0, 0, GUID, descr]);
	}
	
	this.addTransactRecord = function(struct_table, record_GUID, params) {
		var GUID_tr = guid();
		this.executeSqlSruct(struct_table, REPLACE, params);
		this.executeSqlSruct(STRUCT_TABLE_CLIENT_TRANSACT, REPLACE, [GUID_tr, struct_table.struct_name, REPLACE, record_GUID]);
	}
	
	this.addCustomer = function(GUID, title, town) {
		GUID = GUID || guid();
		this.addTransactRecord(STRUCT_TABLE_CUSTOMER, GUID, [0, 0, GUID, title, '', town]);
	}
	
	this.addEquipment = function(GUID, category, title, model, manufacturer) {
		if(GUID == '') {
			GUID = guid();
		}
		this.addTransactRecord(STRUCT_TABLE_EQUIPMENT, GUID, [0, 0, GUID, category, title, model, manufacturer]);
		//this.executeSql("REPLACE INTO equipment (is_delete, time_update, GUID, category, title, model, manufacturer) VALUES (?, ?, ?, ?, ?, ?, ?)", [0, 0, GUID, category, title, model, manufacturer]);
	}
	
	this.addCustomerEquipment = function(GUID, qr_string, customer_guid, equipment_guid, num_serial, num_invent, date_create) {
		if(GUID == '') {
			GUID = guid();
		}
		this.addTransactRecord(STRUCT_TABLE_CUSTOMER_EQUIPMENT, GUID, [0, 0, GUID, qr_string, customer_guid, equipment_guid, num_serial, num_invent, date_create]);
	}
	
	this.addContract = function(GUID, customer_GUID, description) {
		if(GUID == '') {
			GUID = guid();
		}
		this.addTransactRecord(STRUCT_TABLE_CONTRACT, GUID, [0, 0, GUID, customer_GUID, description]);
	}
	
	this.addNonTransactRecord = function() {
		//this.execSql(query_insert_name, params);
	}
	this.constructor(name);
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
	var struct_table;
	for(var i=0; i < window.STRUCT_TABLE.length; i++) {
		struct_table = window.STRUCT_TABLE[i];
		if(struct_table.table_name == table_name) {
			return window.STRUCT_TABLE[i];
		}
	}
}


