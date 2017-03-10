function Control(name) {
	this.constructor = function(name) {
		this.visual_control = true;
		this.name = name;
		this.controls = {};
		this.element = '';
		this.page = undefined;
	}
	this.lateConstructor = function() {
	
	}
	this.add = function(aControl, aName) {
		aName = aName || '';
		this.controls[aName] = new aControl(aName);
		if(aName == '') {
			let i = 0;
			let tmpName = this.controls[aName].element.className+'_'+i;
			while(this.controls[tmpName] !== undefined) {
				i++;
				tmpName = this.controls[aName].element.className+'_'+i;
			}
			this.controls[aName].name = tmpName;
			this.controls[tmpName] = this.controls[aName];
			delete this.controls[aName];
			aName = tmpName;
		}
		
		this.element.appendChild(this.controls[aName].element);
		this.controls[aName].page = this.page;
		if(aControl !== Page) {
			this.page.putControl(this.controls[aName]);
		}
		this.controls[aName].lateConstructor();
		return this.controls[aName];
	}
	this.getControl = function(aName) {
		if(this.controls[aName] !== undefined) {
			return this.controls[aName];
		}
		return undefined;
	}
	this.getControls = function() {
		return this.controls;
	}
	this.findControl = function(aName) {
		let current_control = this.getControl(aName);
		if(current_control == undefined) {
			for(let childControl in this.controls)
			{
				if(this.controls[childControl].visual_control == true) {
					current_control = this.controls[childControl].getControl(aName);
					if(current_control !== undefined) return current_control;
				}
			}
		}
		return current_control;
	}
	this.clear = function() {}
	this.constructor(name);
}

function Page(name, div, var_name) {
	Control.call(this, name);
	this.constructor = function(name, div, var_name) {
		//super(name);
		this.page = this;
		this.var_name = var_name;
		this.element = document.createElement('div');
		this.element.className = 'Page';
		this.init = undefined;
		this.show = undefined;
		this.clear = undefined;
		this.control_list = {};
		this.control_count = 0;
		this.is_init = false;
		//div.appendChild(this.element);
	}
	this.putControl = function(aControl) {
		let exec_string = 'this.control_list.control_'+this.control_count+' = aControl';
		eval(exec_string);
		exec_string = 'this.control_list.control_'+this.control_count+'.element.id = "ctrl_'+this.control_count+'"';
		eval(exec_string);
		this.control_count++;
	}
	this.findControl = function(id) {
		let id_num = id.substr(5);
		let exec_string = 'this.control_list.control_'+id_num;
		return eval(exec_string);
	}
	this.constructor(name, div, var_name);
}

function Panel(name) {
	Control.call(this, name);
	this.element;
	this.constructor = function(name) {
		//super(name);
		this.element = document.createElement('div');
		this.element.className = 'Panel';
	}
	this.constructor(name);
}

function Input(name) {
	Control.call(this, name);
	this.constructor = function(name) {
		//super(name);
		this.element = document.createElement('input');
		this.element.className = 'Input';
	}
	this.getValue = function() {
		return this.element.value;
	}
	this.setValue = function(value) {
		value = value || '';
		this.element.value = value;
	}
	this.clear = function() {
		this.element.value = '';
	}
	this.constructor(name);
}

function Text(name) {
	Control.call(this, name);
	this.constructor = function(name) {
		//super(name);
		this.element = document.createElement('p');
		this.element.className = 'Text';
	}
	this.getValue = function() {
		return this.element.innerHTML;
	}
	this.setValue = function(value) {
		value = value || '';
		this.element.innerHTML = value;
	}
	this.clear = function() {
		this.element.innerHTML = '';
	}
	this.constructor(name);
}

function Select(name) {
	Control.call(this, name);
	this.constructor = function(name) {
		//super(name);
		this.element = document.createElement('select');
		this.element.className = 'Select';
	}
	this.addOption = function(value, GUID) {
		this.element.options[this.element.options.length] = new Option(value, GUID);
		let newOption = this.element.options[this.element.options.length];
	}
	this.getValue = function() {
		if(this.element.selectedIndex < 0) return undefined;
		return this.element.options[this.element.selectedIndex].value;
	}
	this.setWidth = function(value) {
		this.element.style.width = value;
	}
	this.setSelect = function(GUID) {
		for(let i = 0; i < this.element.options.length; i++) {
			let option = this.element.options[i];
			if(option.value == GUID) {
				this.element.selectedIndex = i;
			}
		}
	}
	this.init = function(struct, query_string, qyery_param, query_string_count, qyery_param_count) {
		this.struct = struct;
		this.query_string = query_string;
		this.qyery_param = qyery_param;
		this.query_string_count = query_string_count;
		this.qyery_param_count = qyery_param_count;
		this.fill();
	}
	this.fill = function() {
		let callbackGetRowCount = function(error_level, objResult, [sender]) {
			let callbackGetRecord = function(error_level, objResult, [sender]) {
				for(let i=0; i < sender.record_count; i++) {
					setTimeout(function() {sender.addOption(objResult[i].value, objResult[i].GUID)}, DELAY_ADD_RECORD*i);
					//setTimeout(function() {addOptionInSelect(select_pointer, table_struct, objResult[i].category_title, objResult[i].GUID)}, DELAY_ADD_RECORD*i);
				}
			}
			sender.record_count = getOnceObjectProper(objResult);
			sender.record_count = getOnceObjectProper(sender.record_count);
			EngineDB.executeSql(sender.query_string, sender.qyery_param, callbackGetRecord, [sender], true);
			
		}
		this.element.options.length = 0;
		EngineDB.executeSql(this.query_string_count, this.qyery_param_count, callbackGetRowCount, [this], true);
	}
	this.constructor(name);
}

function Button(name) {
	Control.call(this, name);
	this.constructor = function(name) {
		//super(name);
		this.element = document.createElement('a');
		this.element.className = 'Button';
		this.setText('button');
		this.setClick(function() { alert('empty button') });
	}
	this.setText = function(text) {
		this.element.innerHTML = text;
	}
	this.setClick = function(link) {
		this.element.href = '#';
		this.element.onclick = link;
	}
	this.setWidth = function(value) {
		this.element.style.width = value;
	}
	this.init = function(text, link, width) {
		this.setText(text);
		this.setClick(link);
		this.setWidth(width);
	}
	this.clear = function() {
		this.element.className = 'Button';
		this.setText('button');
		this.setClick(function() { alert('empty button') });
	}
	this.constructor(name);
}

function SearchControl(name) {
	Control.call(this, name);
	var parentLateConstructor = this.lateConstructor;
	this.constructor = function(name) {
		//super(name);
		this.element = document.createElement('div');
		this.element.className = 'SearchControl';
	}
	
	this.lateConstructor = function() {
		parentLateConstructor.call(this);
		var _search_table = this.element.appendChild(document.createElement('table'));
		_search_table.className = '_search_table';
		var tbody = _search_table.appendChild(document.createElement('tbody'));
		var Row_1 = _search_table.tBodies[0].insertRow(-1);
		var Cell_1 = Row_1.insertCell(-1);
		var Cell_2 = Row_1.insertCell(-1);
		this.input = this.add(Input, 'Input');
		Cell_1.appendChild(this.input.element);
		this.button = this.add(Button, 'search');
		this.button.setText('search');
		Cell_2.appendChild(this.button.element);
		this.description = this.element.appendChild(document.createElement('p'));
		this.setDescription('search description');
		this.setClick(function() { alert('search button') });	
	}
	this.setDescription = function(text) {
		this.description.innerHTML = text;
	}
	this.getValue = function() {
		return this.input.element.value;
	}
	this.clear = function() {
		this.input.element.value = '';
	}
	this.setClick = function(link) {
		this.button.setClick(link);
	}
	this.constructor(name);
}

function Table(name) {
	Control.call(this, name);
	this.constructor = function(name) {
		//super(name);
		this.element = document.createElement('table');
		this.element.className = 'Table';
		this.table_caption = this.element.appendChild(document.createElement('caption'));
		this.table_body = this.element.appendChild(document.createElement('tbody'));
	}
	this.init = function(struct, query_string, qyery_param, query_string_count, qyery_param_count, caption, onclick) {
		this.element.setAttribute('data-pagename', this.page.var_name);
		this.element.setAttribute('data-tablename', this.name);
		this.struct = struct;
		this.query_string = query_string;
		this.qyery_param = qyery_param;
		this.query_string_count = query_string_count;
		this.qyery_param_count = qyery_param_count;
		this.table_caption.innerHTML = caption;
		this.onclick = onclick;
		this.fill();
	}
	this.addRow = function(json_row) {
		let rowOnclick = function() {
			let showButton = function(sender, parentTable) {
				let point = getCoords(sender);
				parentTable.element.parentNode.appendChild(FLOAT_TABLE_BUTTON);
				FLOAT_TABLE_BUTTON.style.top = point.top;
				FLOAT_TABLE_BUTTON.style.left = point.left + sender.offsetWidth - 50;
				FLOAT_TABLE_BUTTON.style.width = 50;
				FLOAT_TABLE_BUTTON.style.height = sender.offsetHeight + 1;
				FLOAT_TABLE_BUTTON.onclick = function() { parentTable.onclick(sender) };	//parentTable.onclick; //function() { alert(sender); parentTable.onclick() };//function() { parentTable.onclick(sender) };
				FLOAT_TABLE_BUTTON.style.display = 'block';
			}
			let parentTable = this.parentNode.parentNode;
			let page_name = parentTable.getAttribute('data-pagename');
			let table_name = parentTable.getAttribute('data-tablename');
			let page;
			eval('page = '+page_name);
			parentTable = page.findControl(parentTable.id);
			//parentTable = page.findControl(table_name);
			showButton(this, parentTable);
			//eval('showButton(this, parentTable, '+parentTable.onclick+')');
		}
		
		let newRow = this.element.tBodies[0].insertRow(-1);
		newRow.onclick = rowOnclick;
		for(let i=0; i < this.struct.column_count; i++) {
			let struct_column = eval('this.struct.column'+i);
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

	this.fill = function() {
		let callbackGetRowCount = function(error_level, objResult, [sender]) {
			let callbackGetRecord = function(error_level, objResult, [record_count, table_pointer, table_struct]) {
				for(let i=0; i < record_count; i++) {
					setTimeout(function() {sender.addRow(objResult[i])}, DELAY_ADD_RECORD*i);
				}
			}
			let record_count = getOnceObjectProper(objResult);
			record_count = getOnceObjectProper(record_count);
			EngineDB.executeSql(sender.query_string, sender.qyery_param, callbackGetRecord, [record_count, sender, sender.table_struct], true);
			
		}
		this.clear();
		EngineDB.executeSql(this.query_string_count, this.qyery_param_count, callbackGetRowCount, [this], true);
	}
	this.clear = function() {
		for(let i = 0; i < this.element.parentNode.childNodes.length; i++) {
			if(this.element.parentNode.childNodes[i] == FLOAT_TABLE_BUTTON) {
				FLOAT_TABLE_BUTTON.style.display = 'none';
			}
		}
		this.table_body = this.element.replaceChild(document.createElement('tbody'), this.element.tBodies[0]);
	}
	this.constructor(name);
}

function Grid(name) {
	Control.call(this, name);
	this.constructor = function(name) {
		//super(name);
		this.element = document.createElement('table');
		this.element.className = 'Grid';
		this.table_body = this.element.appendChild(document.createElement('tbody'));
	}
	this.addRow = function(description, aControl, aName) {
		let newRow = this.element.tBodies[0].insertRow(-1);
		let newCell = newRow.insertCell(-1);
		newCell.innerHTML = description;
		newCell = newRow.insertCell(-1);
		var childControl = this.add(aControl, aName);
		newCell.appendChild(childControl.element);
		return childControl;
	}
	this.constructor(name);
}

function Popup(name) {
	Control.call(this, name);
	this.constructor = function(name) {
		//super(name);
		this.element = document.createElement('div');
		this.element.className = 'Popup';
		this.hide();
	}
	this.hide = function() {
		this.element.style.display = 'none';
	}
	this.show = function() {
		this.element.style.display = 'block';
	}
	this.constructor(name);
}

function getTrFieldValue(sender, name) {
	for(let i=0; i < sender.childNodes.length; i++) {
		let cell_current = sender.childNodes[i];
		if(cell_current.getAttribute('data-name') == name) {
			return cell_current.innerText;
		}
	}
	return undefined;
}
















