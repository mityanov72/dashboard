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

var HTML_TABLE_CLIENT_TRANSACT = {
	"column_count": 4,
	"title_visible": true,
	"column0": {
		"name": "GUID",
		"title": "",
		"visible": true,
		"width": "0%",
		"align": "left"
	},
	"column1": {
		"name": "query_name",
		"title": "",
		"visible": true,
		"width": "100%",
		"align": "left"
	},
	"column2": {
		"name": "query_type",
		"title": "ddd",
		"visible": true,
		"width": "100%",
		"align": "left"
	},
	"column3": {
		"name": "record_GUID",
		"title": "ddd",
		"visible": true,
		"width": "100%",
		"align": "left"
	}
}

var HTML_TABLE_SERVER_TRANSACT = {
	"column_count": 5,
	"title_visible": true,
	"column0": {
		"name": "GUID",
		"title": "",
		"visible": true,
		"width": "0%",
		"align": "left"
	},
	"column1": {
		"name": "time_update",
		"title": "",
		"visible": true,
		"width": "100%",
		"align": "left"
	},
	"column2": {
		"name": "table_name",
		"title": "ddd",
		"visible": true,
		"width": "100%",
		"align": "left"
	},
	"column3": {
		"name": "query_type",
		"title": "ddd",
		"visible": true,
		"width": "100%",
		"align": "left"
	},
	"column4": {
		"name": "record_GUID",
		"title": "ddd",
		"visible": true,
		"width": "100%",
		"align": "left"
	}
}

var HTML_TABLE_PARTS = {
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
		"title": "",
		"visible": true,
		"width": "100%",
		"align": "left"
	},
	"column2": {
		"name": "manufacturer_catalog_number",
		"title": "",
		"visible": true,
		"width": "100%",
		"align": "left"
	}
}
