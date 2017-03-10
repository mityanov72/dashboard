var CONST_DB_NAME = 'dashboard';
var CONST_DB_TYPE = 'LOCALSTORAGE';

var CONST_MAX_TABLE_ROW_LIMIT = 20;

var SQL = {};

function initDataBase() {
	function createTable(struct_table) {
		let res = alasql('SHOW TABLES FROM '+CONST_DB_NAME+' LIKE "'+struct_table.table_name+'"');
		if(res.length == 0) {
			alasql('CREATE TABLE '+struct_table.table_name+' ('+sqlQueryCreate(struct_table)+')');
		}
	}

	alasql('CREATE '+CONST_DB_TYPE+' DATABASE IF NOT EXISTS '+CONST_DB_NAME);
	alasql('ATTACH '+CONST_DB_TYPE+' DATABASE '+CONST_DB_NAME);
	alasql('USE '+CONST_DB_NAME);

	createTable(SQL.TABLE_USERS);
	createTable(SQL.TABLE_CLIENT_TRANSACT);
	createTable(SQL.TABLE_SERVER_TRANSACT);
	createTable(SQL.TABLE_CUSTOMER);
	createTable(SQL.TABLE_EQUIP_CAT);
	createTable(SQL.TABLE_EQUIPMENT);
	createTable(SQL.TABLE_CUSTOMER_EQUIPMENT);
	createTable(SQL.TABLE_CONTRACT);

}

function sqlQueryCreate(struct_table) {
	let str = '';
	let splitter = ', ';
	for(let i = 0; i < struct_table.fields_count; i++) {
		if(i == struct_table.fields_count-1) {
			splitter = '';
		}
		str = str + eval('struct_table.field'+i+'.name') + ' ' + eval('struct_table.field'+i+'.type') + splitter;
	}
	return str;
}

function sqlQueryReplace(struct_table) {
	let str = 'REPLACE INTO '+struct_table.table_name+' (';
	let str_fields = '';
	let str_values = '';
	let splitter = ', ';
	for(let i = 0; i < struct_table.fields_count; i++) {
		if(i == struct_table.fields_count-1) {
			splitter = '';
		}
		str_fields = str_fields + eval('struct_table.field'+i+'.name') + splitter;
		str_values = str_values + '?' + splitter;
	}
	str = str + str_fields + ') VALUES (' + str_values + ')';
	return str;
}

function sqlQuerySelect(struct_table) {
	let order = '';
	if(struct_table.select_order_by !== '') {
		order = 'ORDER BY '+struct_table.select_order_by;
	}
	let str = 'SELECT * FROM '+struct_table.table_name+' '+order+' LIMIT '+CONST_MAX_TABLE_ROW_LIMIT;
	return str;
}

function sqlQuerySelectByGuid(struct_table) {
	let order = '';
	if(struct_table.select_order_by !== '') {
		order = 'ORDER BY '+struct_table.select_order_by;
	}
	let str = 'SELECT * FROM '+struct_table.table_name+' '+order+' WHERE GUID = ? LIMIT '+CONST_MAX_TABLE_ROW_LIMIT;
	return str;
}

function sqlQueryCountFromServerTransact(struct_table) {
	var str = 'SELECT COUNT(1) FROM server_transact WHERE table_name = \''+struct_table.table_name+'\'';
	return str;
}

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
		"type": "UUID"
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