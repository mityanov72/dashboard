var CONST_DB_NAME = 'dashboard';
var CONST_DB_TYPE = 'LOCALSTORAGE';

var SELECT = 'select';
var DELETE = 'delete';
var SELECT_BY_GUID = 'select by GUID';
var INSERT = 'insert';
var REPLACE = 'replace';
var CREATE = 'create';
var COUNT_FROM_SERVER_TRANSACT = 'select count(1) from server_transact';

var SQL_SELECT_SERVER_TRANSACT_TABLENAME =	'SELECT DISTINCT table_name FROM server_transact';
var SQL_SELECT_SERVER_TRANSACT =			'SELECT * FROM server_transact WHERE table_name = ? ORDER BY time_update, rowid ASC LIMIT 1';
var SQL_SELECT_SERVER_TRANSACT_FIRST_GUID =	'SELECT GUID FROM server_transact WHERE table_name = ? ORDER BY time_update, rowid ASC LIMIT 1';
var SQL_DELETE_TRANSACT =		'DELETE FROM client_transact WHERE GUID = ?';

var CONST_MAX_TABLE_ROW_LIMIT = 20;

var SQL = {};

function _alasql(sql_string, sql_param, callback_function, callback_params, sender, delay) {
	sender = sender || undefined;
	delay = delay || 0;
	if(delay > 0) {
		setTimeout(alasql(sql_string, sql_param, function(params) { callback_function.call(sender, params, callback_params) } ), delay);
	} else {
		return alasql(sql_string, sql_param, function(params) { callback_function.call(sender, params, callback_params) } );
	}
}

function mysql(struct_table, type_query, sql_param, call_function, log_write) {
	var GUID;
	log_write = log_write || true;
	var query_string;
	switch(type_query) {
		case(CREATE):
		query_string = sqlQueryCreate(struct_table);
		break;
		case(INSERT):
		query_string = sqlQueryInsert(struct_table);
		break;
		case(REPLACE):
		query_string = sqlQueryInsert(struct_table);
		break;
		case(SELECT):
		query_string = sqlQuerySelect(struct_table);
		break;
		case(DELETE):
		query_string = sqlQueryDelete(struct_table);
		break;
		case(SELECT_BY_GUID):
		query_string = sqlQuerySelectByGuid(struct_table);
		break;
		case(COUNT_FROM_SERVER_TRANSACT):
		query_string = sqlQueryCountFromServerTransact(struct_table);
		break;
		default: return -1;
	}
	if(type_query == REPLACE) {
		for(var i=0; i<struct_table.fields_count; i++) {
			if(eval('struct_table.field'+i+'.name') == 'GUID') GUID = sql_param[i];
		}
		query_string = sqlQuerySelectByGuid(struct_table);
		alasql(query_string, [GUID], function(result) {
			if(result == 0) {
				query_string = sqlQueryInsert(struct_table)
				alasql(query_string, sql_param, call_function)
			} else {
				sql_param.push(GUID);
				query_string = sqlQueryUpdate(struct_table);
				alasql(query_string, sql_param, call_function);
			}
		});
	} else {
		alasql(query_string, sql_param, call_function);
	}
}

function recreateDataBase(call_function) {
	localStorage['TIME_UPDATE'] = 0;
	return alasql('DETACH DATABASE '+CONST_DB_NAME+'; DROP '+CONST_DB_TYPE+' DATABASE '+CONST_DB_NAME, [], initDataBase.bind(null, call_function));
}

function initDataBase(callback_function) {
	var callback_table_create = function() {
		sqlCreateTable(SQL.TABLE_USERS);
		sqlCreateTable(SQL.TABLE_CLIENT_TRANSACT);
		sqlCreateTable(SQL.TABLE_SERVER_TRANSACT);
		sqlCreateTable(SQL.TABLE_CUSTOMER);
		sqlCreateTable(SQL.TABLE_EQUIP_CAT);
		sqlCreateTable(SQL.TABLE_EQUIPMENT);
		sqlCreateTable(SQL.TABLE_CUSTOMER_EQUIPMENT);
		sqlCreateTable(SQL.TABLE_CONTRACT);
		sqlCreateTable(SQL.TABLE_PERFORMANCE);
		run_callback();
	}
	var run_callback = function() {
		var res = alasql('SHOW TABLES FROM '+CONST_DB_NAME);
		if(res.length < 10) {
			TASK_MANAGER.addTask(run_callback);
		} else {
			if(callback_function) callback_function();
		}
	}
	alasql('CREATE '+CONST_DB_TYPE+' DATABASE IF NOT EXISTS '+CONST_DB_NAME+'; '+
		'ATTACH '+CONST_DB_TYPE+' DATABASE '+CONST_DB_NAME+'; USE '+CONST_DB_NAME, [], callback_table_create);
}

function sqlCreateTable(struct_table, callback_function) {
	var callback = function(struct_table, result) {
		if(result.length == 0) {
			var sql_string = 'CREATE TABLE '+struct_table.table_name+' ('+sqlQueryCreate(struct_table)+')';
			alasql(sql_string, [], callback_function);
		}
	}
	var res = alasql('SHOW TABLES FROM '+CONST_DB_NAME+' LIKE "'+struct_table.table_name+'"', [], callback.bind(this, struct_table));
}

function sqlQueryCreate(struct_table) {
	var str = '';
	var splitter = ', ';
	for(var i = 0; i < struct_table.fields_count; i++) {
		if(i == struct_table.fields_count-1) {
			splitter = '';
		}
		str = str + eval('struct_table.field'+i+'.name') + ' ' + eval('struct_table.field'+i+'.type') + splitter;
	}
	return str;
}

function sqlQueryInsert(struct_table) {
	var str = 'INSERT INTO '+struct_table.table_name+' (';
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

function sqlQueryUpdate(struct_table) {
	var str = 'UPDATE '+struct_table.table_name+' SET ';
	var str_fields = '';
	var str_values = '';
	var splitter = ', ';
	for(var i = 0; i < struct_table.fields_count; i++) {
		if(i == struct_table.fields_count-1) {
			splitter = '';
		}
		str_fields = str_fields + eval('struct_table.field'+i+'.name') + ' = ?' + splitter;
	}
	str = str + str_fields + ' WHERE GUID = ?';
	return str;
}

function sqlQuerySelect(struct_table) {
	var order = '';
	if(struct_table.select_order_by !== '') {
		order = 'ORDER BY '+struct_table.select_order_by;
	}
	var str = 'SELECT * FROM '+struct_table.table_name+' '+order+' LIMIT '+CONST_MAX_TABLE_ROW_LIMIT;
	return str;
}

function sqlQueryDelete(struct_table) {
	return 'DELETE FROM '+struct_table.table_name+' WHERE GUID = ?';
}

function sqlQuerySelectByGuid(struct_table) {
	var str = 'SELECT * FROM '+struct_table.table_name+' WHERE GUID = ? LIMIT '+CONST_MAX_TABLE_ROW_LIMIT;
	return str;
}

function sqlQueryCountFromServerTransact(struct_table) {
	var str = 'SELECT COUNT(1) FROM server_transact WHERE table_name = \''+struct_table.table_name+'\'';
	return str;
}

function progressBar(count, call_function, complite_function, progress_function) {
	this.count = count;
	this.counter = count;
	this.call_function = call_function;
	this.complite_function = complite_function;
	this.progress_function = progress_function;
	//this.delay = delay;
	this.time_begin = 0;
	this.time_end = 0;
	this.end = false;
	

	this.finish = function() {
		this.end = true;
		this.time_end = Date.now();
		var interval = this.time_end - this.time_begin;
		this.complite_function(interval);
		this.progress_function(100);
		//delete this;
	}
	this.watch = function() {
		if(this.end == true) return 0;
		var progress = (this.count - this.counter) / (this.count / 100);
		progress = Math.round(progress);
		this.progress_function(progress);
		TASK_MANAGER.addTask(this.watch.bind(this), HIGH, false);
	}
	this.run = function() {

		this.watch();
		this.time_begin = Date.now();
		TASK_MANAGER.addTask(this.call_function.bind(null, this, this.count), ULTRA);
	}
}


function testPerformanceManyInsert() {

}

function testPerformanceHavyInsert(progress_bar, count) {
	var addRecord = function(result, counter) {
		var GUID = guid();
		var long_string = '';
		var string_value = 'any value of string in table';
		for(var i=0; i < 10; i++) {
			long_string = long_string+GUID;
		}
		counter--;
		if(counter == 0) {
			getRecordCount(counter);
			return 0;
		}
		progress_bar.counter = counter;
		var sql_string = 'INSERT INTO performance VALUES {is_delete:0, time_update:0, GUID:"'+GUID+'", long_string:"'+long_string+'",\
			string1:"'+string_value+'", string2:"'+string_value+'", string3:"'+string_value+'", string4:"'+string_value+'", string5:"'+string_value+'", \
			string6:"'+string_value+'", string7:"'+string_value+'", string8:"'+string_value+'", string9:"'+string_value+'", string10:"'+string_value+'",}';
		sql_string = sql_string+'; '+sql_string+'; '+sql_string+'; '+sql_string+'; '+sql_string+'; '+sql_string+'; '+sql_string+'; '+sql_string+'; '+sql_string+'; '+sql_string;
		TASK_MANAGER.addTask(alasql.bind(this, sql_string, [], addRecord.bind(null, result, counter)), HIGH);
	}
	var getRecordCount = function(counter) {
		alasql('SELECT COUNT(1) FROM performance', [], function(result) {
			progress_bar.finish(result);
			progress_bar.counter = counter;
		});
	}
	alasql('DROP TABLE IF EXISTS performance', [], function() { 
		sqlCreateTable(SQL.TABLE_PERFORMANCE, addRecord.bind(this, '', count+1, getRecordCount)); });
}

function testPerformanceHavySearch(progress_bar, count) {
	var addRecord = function(result, counter) {
		var GUID = guid();
		var long_string = '';
		var string_value = 'any string';
		counter--;
		if(counter == 0) {
			getRecordCount(counter);
			return 0;
		}
		progress_bar.counter = counter;
		var sql_string = 'INSERT INTO performance VALUES {is_delete:0, time_update:0, GUID:"'+GUID+'", long_string:"'+string_value+'"}';
		TASK_MANAGER.addTask(alasql.bind(this, sql_string, [], addRecord.bind(null, result, counter)), HIGH);
	}
	var getRecordCount = function(counter) {
		alasql('SELECT COUNT(1) FROM performance', [], function(result) {
			progress_bar.finish(result);
			progress_bar.counter = counter;
		});
	}
	alasql('DROP TABLE IF EXISTS performance', [], function() { 
		sqlCreateTable(SQL.TABLE_PERFORMANCE, addRecord.bind(this, '', count+1, getRecordCount)); });
	TASK_MANAGER.addTask(alasql.bind(this, sql_string, [], addRecord.bind(null, result, counter)), LOW);
}

function testPerformanceFastInsert(progress_bar, count) {
	var addRecord = function(result, counter) {
		var GUID = guid();
		var long_string = '';
		var string_value = 'any string';
		counter--;
		if(counter == 0) {
			getRecordCount(counter);
			return 0;
		}
		progress_bar.counter = counter;
		var sql_string = 'INSERT INTO performance VALUES {is_delete:0, time_update:0, GUID:"'+GUID+'", long_string:"'+string_value+'"}';
		TASK_MANAGER.addTask(alasql.bind(this, sql_string, [], addRecord.bind(null, result, counter)), HIGH);
	}
	var getRecordCount = function(counter) {
		alasql('SELECT COUNT(1) FROM performance', [], function(result) {
			progress_bar.finish(result);
			progress_bar.counter = counter;
		});
	}
	alasql('DROP TABLE IF EXISTS performance', [], function() { 
		sqlCreateTable(SQL.TABLE_PERFORMANCE, addRecord.bind(this, '', count+1, getRecordCount)); });
}

SQL.TABLE_PERFORMANCE = {
	"table_name": "performance",
	"fields_count": 14,
	"select_order_by": "",
	"struct_name": "TABLE_PERFORMANCE",
	"field0": {
		"name": "is_delete",
		"type": "INT"
	},
	"field1": {
		"name": "time_update",
		"type": "INT"
	},
	"field2": {
		"name": "GUID",
		"type": "UUID"
	},
	"field3": {
		"name": "long_string",
		"type": "STRING"
	},
	"field4": {
		"name": "string1",
		"type": "STRING"
	},
	"field5": {
		"name": "string2",
		"type": "STRING"
	},
	"field6": {
		"name": "string3",
		"type": "STRING"
	},
	"field7": {
		"name": "string4",
		"type": "STRING"
	},
	"field8": {
		"name": "string5",
		"type": "STRING"
	},
	"field9": {
		"name": "string6",
		"type": "STRING"
	},
	"field10": {
		"name": "string7",
		"type": "STRING"
	},
	"field11": {
		"name": "string8",
		"type": "STRING"
	},
	"field12": {
		"name": "string9",
		"type": "STRING"
	},
	"field13": {
		"name": "string10",
		"type": "STRING"
	}
};

SQL.TABLE_USERS = {
	"table_name": "users",
	"fields_count": 7,
	"select_order_by": "",
	"struct_name": "TABLE_USERS",
	"field0": {
		"name": "is_delete",
		"type": "INT"
	},
	"field1": {
		"name": "time_update",
		"type": "INT"
	},
	"field2": {
		"name": "GUID",
		"type": "UUID"
	},
	"field3": {
		"name": "mail",
		"type": "STRING"
	},
	"field4": {
		"name": "f_name",
		"type": "STRING"
	},
	"field5": {
		"name": "l_name",
		"type": "STRING"
	},
	"field6": {
		"name": "m_name",
		"type": "STRING"
	}
};

SQL.TABLE_CLIENT_TRANSACT = {
	"table_name": "client_transact",
	"fields_count": 4,
	"select_order_by": "",
	"struct_name": "TABLE_CLIENT_TRANSACT",
	"field0": {
		"name": "GUID",
		"type": "UUID"
	},
	"field1": {
		"name": "query_name",
		"type": "STRING"
	},
	"field2": {
		"name": "query_type",
		"type": "STRING"
	},
	"field3": {
		"name": "record_GUID",
		"type": "STRING"
	}
};

SQL.TABLE_SERVER_TRANSACT = {
	"table_name": "server_transact",
	"fields_count": 5,
	"select_order_by": "",
	"struct_name": "TABLE_SERVER_TRANSACT",
	"field0": {
		"name": "GUID",
		"type": "UUID"
	},
	"field1": {
		"name": "time_update",
		"type": "INT"
	},
	"field2": {
		"name": "table_name",
		"type": "STRING"
	},
	"field3": {
		"name": "query_type",
		"type": "STRING"
	},
	"field4": {
		"name": "record_GUID",
		"type": "STRING"
	}
};

SQL.TABLE_CUSTOMER = {
	"table_name": "customer",
	"fields_count": 6,
	"select_order_by": "",
	"struct_name": "TABLE_CUSTOMER",
	"field0": {
		"name": "is_delete",
		"type": "INT"
	},
	"field1": {
		"name": "time_update",
		"type": "INT"
	},
	"field2": {
		"name": "GUID",
		"type": "UUID"
	},
	"field3": {
		"name": "title",
		"type": "STRING"
	},
	"field4": {
		"name": "address",
		"type": "STRING"
	},
	"field5": {
		"name": "town",
		"type": "STRING"
	}
};

SQL.TABLE_EQUIP_CAT = {
	"table_name": "equipment_category",
	"fields_count": 4,
	"select_order_by": "title",
	"struct_name": "TABLE_EQUIP_CAT",
	"field0": {
		"name": "is_delete",
		"type": "INT"
	},
	"field1": {
		"name": "time_update",
		"type": "INT"
	},
	"field2": {
		"name": "GUID",
		"type": "UUID NOT NULL PRIMARY KEY"
	},
	"field3": {
		"name": "title",
		"type": "STRING"
	}
};

SQL.TABLE_EQUIPMENT = {
	"table_name": "equipment",
	"fields_count": 7,
	"select_order_by": "title",
	"struct_name": "TABLE_EQUIPMENT",
	"field0": {
		"name": "is_delete",
		"type": "INT"
	},
	"field1": {
		"name": "time_update",
		"type": "INT"
	},
	"field2": {
		"name": "GUID",
		"type": "UUID"
	},
	"field3": {
		"name": "category_GUID",
		"type": "STRING"
	},
	"field4": {
		"name": "title",
		"type": "STRING"
	},
	"field5": {
		"name": "model",
		"type": "STRING"
	},
	"field6": {
		"name": "manufacturer",
		"type": "STRING"
	}
};

SQL.TABLE_CUSTOMER_EQUIPMENT = {
	"table_name": "customer_equipment",
	"fields_count": 9,
	"select_order_by": "title",
	"struct_name": "TABLE_CUSTOMER_EQUIPMENT",
	"field0": {
		"name": "is_delete",
		"type": "INT"
	},
	"field1": {
		"name": "time_update",
		"type": "INT"
	},
	"field2": {
		"name": "GUID",
		"type": "UUID"
	},
	"field3": {
		"name": "QR_string",
		"type": "STRING"
	},
	"field4": {
		"name": "customer_GUID",
		"type": "STRING"
	},
	"field5": {
		"name": "equipment_GUID",
		"type": "STRING"
	},
	"field6": {
		"name": "num_serial",
		"type": "STRING"
	},
	"field7": {
		"name": "num_invent",
		"type": "STRING"
	},
	"field8": {
		"name": "date_create",
		"type": "STRING"
	}
};

SQL.TABLE_CONTRACT = {
	"table_name": "contract",
	"fields_count": 5,
	"select_order_by": "title",
	"struct_name": "TABLE_CONTRACT",
	"field0": {
		"name": "is_delete",
		"type": "INT"
	},
	"field1": {
		"name": "time_update",
		"type": "INT"
	},
	"field2": {
		"name": "GUID",
		"type": "UUID"
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

function getStructTableFromName(table_name) {
	for(struct_table in SQL) {
		if(SQL[struct_table].table_name == table_name) {
			return window.SQL[struct_table];
		}
	}
}

function getQueryParamFromJson(struct_table, JsonResult) {
	var res_array = [];
	var field_name;
	var str;
	var result = JSON.parse(JsonResult);
	if(result.num_rows > 0) {
		for(var i = 0; i < struct_table.fields_count; i++) {
			field_name = eval('struct_table.field'+i+'.name');
			str = eval('result.row0.'+field_name);
			res_array[i] = str;
		}
	}
	return res_array;
}

function _sqlAddTransactRecord(struct_table, record_GUID, params) {
	var GUID_tr = guid();
	mysql(struct_table, REPLACE, params);
	mysql(SQL.TABLE_CLIENT_TRANSACT, REPLACE, [GUID_tr, struct_table.struct_name, REPLACE, record_GUID]);		//	[GUID_tr, struct_table.struct_name, REPLACE, record_GUID]
}

function _sqlAddEquipment(GUID, category, title, model, manufacturer) {
	if(GUID == '') {
		GUID = guid();
	}
	_sqlAddTransactRecord(SQL.TABLE_EQUIPMENT, GUID, [0, 0, GUID, category, title, model, manufacturer]);
}

function _sqlAddCustomer(GUID, title, town) {
	GUID = GUID || guid();
	_sqlAddTransactRecord(SQL.TABLE_CUSTOMER, GUID, [0, 0, GUID, title, '', town]);
}

function _sqlAddCustomerEquipment(GUID, qr_string, customer_guid, equipment_guid, num_serial, num_invent, date_create) {
	if(GUID == '') {
		GUID = guid();
	}
	_sqlAddTransactRecord(SQL.TABLE_CUSTOMER_EQUIPMENT, GUID, [0, 0, GUID, qr_string, customer_guid, equipment_guid, num_serial, num_invent, date_create]);
}