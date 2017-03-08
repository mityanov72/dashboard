var MAX_TABLE_RECORD_COUNT = 20;
var DELAY_ADD_RECORD = 10;

var HTML_TABLE_CUSTOMER = {
	"column_count": 2,
	"title_visible": false,
	"column0": {
		"name": "GUID",
		"title": "",
		"visible": false,
		"width": "0%",
		"align": "left"
	},
	"column1": {
		"name": "customer_title",
		"title": "",
		"visible": true,
		"width": "100%",
		"align": "left"
	}
}

var HTML_TABLE_EQUIPMENT_CAT = {
	"column_count": 2,
	"title_visible": false,
	"column0": {
		"name": "GUID",
		"title": "",
		"visible": false,
		"width": "0%",
		"align": "left"
	},
	"column1": {
		"name": "value",	//	category_title
		"title": "",
		"visible": true,
		"width": "100%",
		"align": "left"
	}
}

var HTML_TABLE_EQUIPMENT = {
	"column_count": 3,
	"title_visible": true,
	"column0": {
		"name": "GUID",
		"title": "",
		"visible": false,
		"width": "0%",
		"align": "left"
	},
	"column1": {
		"name": "title_model",
		"title": "sss",
		"visible": true,
		"width": "100%",
		"align": "left"
	},
	"column2": {
		"name": "manufacturer",
		"title": "ddd",
		"visible": true,
		"width": "100%",
		"align": "left"
	}
}

var HTML_TABLE_CUSTOMER_EQUIPMENT = {
	"column_count": 3,
	"title_visible": true,
	"column0": {
		"name": "GUID",
		"title": "",
		"visible": false,
		"width": "0%",
		"align": "left"
	},
	"column1": {
		"name": "title_model_date",
		"title": "sss",
		"visible": true,
		"width": "100%",
		"align": "left"
	},
	"column2": {
		"name": "num_serial_invent",
		"title": "ddd",
		"visible": true,
		"width": "100%",
		"align": "left"
	}
}

var HTML_TABLE_CONTRACT = {
	"column_count": 4,
	"title_visible": true,
	"column0": {
		"name": "GUID",
		"title": "",
		"visible": false,
		"width": "0%",
		"align": "left"
	},
	"column1": {
		"name": "customer_GUID",
		"title": "",
		"visible": false,
		"width": "100%",
		"align": "left"
	},
	"column2": {
		"name": "customer_title",
		"title": "ddd",
		"visible": true,
		"width": "100%",
		"align": "left"
	},
	"column3": {
		"name": "description",
		"title": "ddd",
		"visible": true,
		"width": "100%",
		"align": "left"
	}
}


//==================================================================================================================================================================================//
//	fillTable	- заполняет HTML таблицу
//
//	table_pointer		- указатель на таблицу, полученный с помощю document.getElementById
//	table_struct		- структура HTML таблицы
//	query_string		- SQL запрос для выборки таблицы
//	qyery_param			- параметры SQL запроса для выборки таблицы
//	query_string_count	- SQL запрос для получения количества строк в таблице
//	qyery_param_count	- параметры SQL запроса
function fillTable(table_pointer, table_struct, query_string, qyery_param, query_string_count, qyery_param_count) {
	let callbackGetRowCount = function(error_level, objResult, param) {
		let callbackGetRecord = function(error_level, objResult, [record_count, table_pointer, table_struct]) {
			/*if(table_struct.title_visible) {
				let newRow = table_pointer.tHead.insertRow(-1);
				for(let i=0; i < table_struct.column_count; i++) {
					let newCell = newRow.insertCell(-1);
					let column_title = eval('table_struct.column'+i+'.title');
					//let value = eval('json_row.'+struct_column.title);
					newCell.innerHTML = column_title;
				}
			}*/
			for(let i=0; i < record_count; i++) {
				setTimeout(function() {addRowInTable(table_pointer, table_struct, objResult[i])}, DELAY_ADD_RECORD*i);
			}
		}
		let record_count = getOnceObjectProper(objResult);
		record_count = getOnceObjectProper(record_count);
		EngineDB.executeSql(query_string, qyery_param, callbackGetRecord, [record_count, table_pointer, table_struct], true);
		
	}
	EngineDB.executeSql(query_string_count, qyery_param_count, callbackGetRowCount, [], true);
}

//==================================================================================================================================================================================//
//	addRowInTable		- добавление одной строки в HTML таблицу
function addRowInTable(table_pointer, table_struct, json_row) {
	let newRow = table_pointer.tBodies[0].insertRow(-1);
	newRow.onclick = rowOnclick;
	for(let i=0; i < table_struct.column_count; i++) {
		let struct_column = eval('table_struct.column'+i);
		let newCell = newRow.insertCell(-1);
		newCell.align = struct_column.align;
		newCell.width = struct_column.width;
		if(struct_column.visible == false) {
			newCell.style = "display: none";
		}
		let value = eval('json_row.'+struct_column.name);
		newCell.innerHTML = value;
		//newCell.title = value;
		newCell.setAttribute('data-name', struct_column.name);
	}
}

function rowOnclick() {
	let showButton = function(sender, parentTable, function_name) {
		let point = getCoords(sender);
		parentTable.parentNode.appendChild(FLOAT_TABLE_BUTTON);
		FLOAT_TABLE_BUTTON.style.top = point.top;
		FLOAT_TABLE_BUTTON.style.left = point.left + sender.offsetWidth - 50;
		FLOAT_TABLE_BUTTON.style.width = 50;
		FLOAT_TABLE_BUTTON.style.height = sender.offsetHeight;
		FLOAT_TABLE_BUTTON.onclick = function() { function_name(sender) };
		FLOAT_TABLE_BUTTON.style.display = 'block';
	}
	//FLOAT_TABLE_BUTTON
	let parentTable = this.parentNode.parentNode;
	let function_name = parentTable.getAttribute('data-function');
	eval('showButton(this, parentTable, '+function_name+')');
	//eval(function_name+'(this)');
}

function fillSelect(select_pointer, table_struct, query_string, qyery_param, query_string_count, qyery_param_count) {
	let callbackGetRowCount = function(error_level, objResult, param) {
		let callbackGetRecord = function(error_level, objResult, [record_count, select_pointer, table_struct]) {
			for(let i=0; i < record_count; i++) {
				setTimeout(function() {addOptionInSelect(select_pointer, table_struct, objResult[i].category_title, objResult[i].GUID)}, DELAY_ADD_RECORD*i);
			}
		}
		let record_count = getOnceObjectProper(objResult);
		record_count = getOnceObjectProper(record_count);
		EngineDB.executeSql(query_string, qyery_param, callbackGetRecord, [record_count, select_pointer, table_struct], true);
		
	}
	EngineDB.executeSql(query_string_count, qyery_param_count, callbackGetRowCount, [], true);
}

function addOptionInSelect(select_pointer, table_struct, value, GUID) {
	select_pointer.options[select_pointer.options.length] = new Option(value, GUID);
	newOption = select_pointer.options[select_pointer.options.length];
}

/*
http://www.softtime.ru/info/articlephp.php?id_article=67

https://html5book.ru/css3-tables/

*/