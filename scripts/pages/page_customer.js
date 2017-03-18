//	========================================================================================= //
//	Объявляется переменная для страницы
var PAGE_CUSTOMER;

//	========================================================================================= //
//	Страница регистрируется в приложении
Application.registryPage('PAGE_CUSTOMER', 'Клиенты', page_customer_init, page_customer_show, page_customer_clear);

//	========================================================================================= //
//	Функция для инициализации страницы. Тут строятся все контролы
function page_customer_init() {

	PAGE_CUSTOMER.customer_GUID					= undefined;	//	GUID клиента
	PAGE_CUSTOMER.customer_equipment_GUID		= undefined;	//	GUID аппарата клиента (имеет серийник)
	PAGE_CUSTOMER.find_equipment_GUID			= undefined;	//	GUID аппарата из таблицы оборудования (нет поля с серийником)
	
	//	Объекты на странице
	PAGE_CUSTOMER.table_customer		= {}	// список клиентов
	PAGE_CUSTOMER.table_equipment		= {}	// оборудование клиента
	PAGE_CUSTOMER.table_find_equipment	= {}	// поиск оборудования
	PAGE_CUSTOMER.table_contract		= {}	// контракты клиента
	
	PAGE_CUSTOMER.popup_description		= {}	// окно с описанием клиента
	PAGE_CUSTOMER.popup_find_equipment	= {}	// окно поиска аппарата из реестра
	PAGE_CUSTOMER.popup_equipment_edit	= {}	// окно для добавления/редактирования аппарата
	PAGE_CUSTOMER.popup_customer		= {}	// окно для добавления/редактирования клиента

	PAGE_CUSTOMER.grid_customer_descr	= {}	// решетка с описанием клиента
	PAGE_CUSTOMER.grid_equipment_edit	= {}	// решетка с описанием аппарата
	PAGE_CUSTOMER.grid_customer_edit	= {}	// решетка для редактирования клиента
	/*
	//	Функции на странице
	PAGE_CUSTOMER.table_customer_click			= function() {}	// клик на таблице списка клиентов
	PAGE_CUSTOMER.table_equipment_click			= function() {}	// клик на таблице оборудования клиента
	PAGE_CUSTOMER.table_find_equipment_click	= function() {}	// клик на таблице поиска оборудования
	PAGE_CUSTOMER.table_contract_click			= function() {}	// клик на таблице контрактов клиента
	
	PAGE_CUSTOMER.table_customer_fill			= function() {}	// заполнение таблицы списка клиентов
	PAGE_CUSTOMER.table_equipment_fill			= function() {}	// заполнение таблицы оборудования клиента
	PAGE_CUSTOMER.table_find_equipment_fill		= function() {}	// заполнение таблицы поиска оборудования
	PAGE_CUSTOMER.table_contract_fill			= function() {}	// заполнение таблицы контрактов клиента
	
	PAGE_CUSTOMER.popup_description_show		= function() {}	// открытие окна с описанием клиента
	PAGE_CUSTOMER.popup_find_equipment_show		= function() {}	// открытие окна с поиском оборудования
	PAGE_CUSTOMER.popup_equipment_edit_show		= function() {}	// открытие окна с редактированием аппарата
	PAGE_CUSTOMER.popup_customer_edit_show		= function() {}	// открытие окна добавления/редактирования клиента

	PAGE_CUSTOMER.edit_customer					= function() {}	// изменение/добавление клиента
	PAGE_CUSTOMER.edit_equipment				= function() {} // изменение/добавление аппарата клиента
	*/

	// заполнение таблицы списка клиентов
	PAGE_CUSTOMER.table_customer_fill = function() {
		var search_text = '%'+PAGE_CUSTOMER.controls['cPanelTop'].controls['cSearchControl'].getValue()+'%';
		PAGE_CUSTOMER.controls['cPanelMain'].controls['cTableCustomer'].init(HTML_TABLE_CUSTOMER, 'SELECT GUID, title AS customer_title FROM customer WHERE title LIKE ? OR town LIKE ? ORDER BY title', [search_text, search_text], 
				'SELECT COUNT(1) FROM customer WHERE title LIKE ? OR town LIKE ?', [search_text, search_text], 'table customer',  PAGE_CUSTOMER.table_customer_click);
	}
	// заполнение таблицы оборудования клиента
	PAGE_CUSTOMER.table_equipment_fill = function() {
		PAGE_CUSTOMER.table_customer_equipment.init(HTML_TABLE_CUSTOMER_EQUIPMENT,
				'SELECT customer_equipment.GUID, equipment.title || "</br>" || equipment.model || " " || customer_equipment.date_create AS title_model_date, customer_equipment.num_serial '+
				'|| "</br>" || customer_equipment.num_invent AS num_serial_invent FROM customer_equipment, equipment WHERE customer_equipment.equipment_GUID = equipment.GUID AND customer_GUID = ?', [PAGE_CUSTOMER.customer_GUID],
				'SELECT COUNT(1) FROM customer_equipment, equipment WHERE customer_equipment.equipment_GUID = equipment.GUID AND customer_GUID = ?', [PAGE_CUSTOMER.customer_GUID], 'оборудование клиента', PAGE_CUSTOMER.table_equipment_click);
	}
	// заполнение таблицы поиска оборудования
	PAGE_CUSTOMER.table_find_equipment_fill = function() {
		var search_text = '%'+PAGE_CUSTOMER.search_equipment.getValue()+'%';
		PAGE_CUSTOMER.table_search_equipment.init(HTML_TABLE_EQUIPMENT, 
				'SELECT GUID,"<p class=\'p_first_table_string\'>" || title || "</p><p class=\'p_second_table_string\'>" || model || "</p>" AS title_model, manufacturer FROM equipment WHERE title LIKE ? OR model LIKE ?',
				[search_text, search_text], 'SELECT COUNT(1) FROM equipment WHERE title LIKE ? OR model LIKE ?', [search_text, search_text], 'поиск аппарата', PAGE_CUSTOMER.table_find_equipment_click);
	}
	// заполнение таблицы контрактов клиента
	PAGE_CUSTOMER.table_contract_fill = function() {

	}

	// клик на таблице списка клиентов
	PAGE_CUSTOMER.table_customer_click = function(sender) {
		var callbackFunction = function(result) {
			result = result[0];
			PAGE_CUSTOMER.controls['cPopup'].show();
			PAGE_CUSTOMER.table_equipment_fill();
			//	TODO
			//	... fill other tables
			PAGE_CUSTOMER.grid_customer_descr.controls['cTextTitle'].setValue(result['title']);
			PAGE_CUSTOMER.grid_customer_descr.controls['cTextTown'].setValue(result['town']);
		}
		PAGE_CUSTOMER.customer_GUID = getTrGUID(sender);
		alasql('SELECT title, town FROM customer WHERE GUID = ?', [PAGE_CUSTOMER.customer_GUID], callbackFunction);
	}
	// клик на таблице оборудования клиента
	PAGE_CUSTOMER.table_equipment_click = function(sender) {
		var callbackFunction = function(result) {
			result = result[0];
			PAGE_CUSTOMER.popup_equipment_edit.show();
			PAGE_CUSTOMER.grid_equipment_edit.controls['cCaption'].setValue('<b>'+result['title']+'</b> '+result['model']);
			PAGE_CUSTOMER.grid_equipment_edit.controls['cSerial'].setValue(result['num_serial']);
			PAGE_CUSTOMER.grid_equipment_edit.controls['cInvent'].setValue(result['num_invent']);
			PAGE_CUSTOMER.grid_equipment_edit.controls['cDate'].setValue(result['date_create']);
			PAGE_CUSTOMER.grid_equipment_edit.controls['btnSave'].setClick(PAGE_CUSTOMER.edit_equipment.bind(null, true));
		}
		PAGE_CUSTOMER.customer_equipment_GUID = getTrGUID(sender);
		alasql('SELECT * FROM [customer_equipment] JOIN [equipment] ON [customer_equipment].[equipment_GUID] = [equipment].[GUID] WHERE [customer_equipment].[GUID] = ?', [PAGE_CUSTOMER.customer_equipment_GUID], callbackFunction);
	}
	//клик на таблице поиска оборудования
	PAGE_CUSTOMER.table_find_equipment_click = function(sender) {
		var callbackFunction = function(result) {
			result = result[0];
			PAGE_CUSTOMER.grid_equipment_edit.controls['cCaption'].setValue('<b>'+result['title']+'</b> '+result['model']);
			PAGE_CUSTOMER.grid_equipment_edit.controls['cSerial'].setValue('');
			PAGE_CUSTOMER.grid_equipment_edit.controls['cInvent'].setValue('');
			PAGE_CUSTOMER.grid_equipment_edit.controls['cDate'].setValue('');
		}
		PAGE_CUSTOMER.popup_equipment_edit.show();
		PAGE_CUSTOMER.find_equipment_GUID = getTrGUID(sender);
		//EngineDB.executeSql('SELECT * FROM equipment WHERE GUID = ?', [PAGE_CUSTOMER.find_equipment_GUID], callbackFunction, [], true);
		alasql('SELECT * FROM equipment WHERE GUID = ?', [PAGE_CUSTOMER.find_equipment_GUID], callbackFunction);
	}

	// открытие окна с описанием клиента
	PAGE_CUSTOMER.popup_description_show = function() {

	}
	// открытие окна с поиском оборудования
	PAGE_CUSTOMER.popup_find_equipment_show = function() {
		PAGE_CUSTOMER.popup_find_equipment.show();
		PAGE_CUSTOMER.table_find_equipment_fill();
	}
	// открытие окна с редактированием аппарата
	PAGE_CUSTOMER.popup_equipment_edit_show = function() {

	}
	// открытие окна добавления/редактирования клиента
	PAGE_CUSTOMER.popup_customer_edit_show = function() {
		PAGE_CUSTOMER.popup_customer.show();
		PAGE_CUSTOMER.grid_customer_edit.controls['cCaption'].setValue();
		PAGE_CUSTOMER.grid_customer_edit.controls['cTown'].setValue();

	}
	// изменение/добавление клиента
	PAGE_CUSTOMER.edit_customer = function(edit) {
		edit = edit || false;
		if(edit) {
			// TODO
			// ...
		} else {
			var aCaption = PAGE_CUSTOMER.grid_customer_edit.controls['cCaption'].getValue();
			var aTown = PAGE_CUSTOMER.grid_customer_edit.controls['cTown'].getValue();
			_sqlAddCustomer('', aCaption, aTown);
		}
		PAGE_CUSTOMER.popup_customer.hide();
	}
	// изменение/добавление аппарата клиента
	PAGE_CUSTOMER.edit_equipment = function(edit) {
		if(edit == undefined) throw new SyntaxError('empty argument in PAGE_CUSTOMER.edit_equipment()');
		var aCaption = PAGE_CUSTOMER.grid_equipment_edit.controls['cCaption'].getValue();
		var aSerial = PAGE_CUSTOMER.grid_equipment_edit.controls['cSerial'].getValue();
		var aInvent = PAGE_CUSTOMER.grid_equipment_edit.controls['cInvent'].getValue();
		var aDate = PAGE_CUSTOMER.grid_equipment_edit.controls['cDate'].getValue();
		if(edit) {
			_sqlAddCustomerEquipment(PAGE_CUSTOMER.customer_equipment_GUID, '', PAGE_CUSTOMER.customer_GUID, PAGE_CUSTOMER.find_equipment_GUID, aSerial, aInvent, aDate);
		} else {
			_sqlAddCustomerEquipment('', '', PAGE_CUSTOMER.customer_GUID, PAGE_CUSTOMER.find_equipment_GUID, aSerial, aInvent, aDate);
		}
	}

}

function page_customer_prepare(){
	//	основное окно
	var panel_top = PAGE_CUSTOMER.add(Panel, 'cPanelTop');
	panel_top.add(Button, '').init('добавить клиента', PAGE_CUSTOMER.popup_customer_edit_show, 150);
	panel_top.add(SearchControl, 'cSearchControl').setClick(PAGE_CUSTOMER.table_customer_fill);
	var panel_main = PAGE_CUSTOMER.add(Panel, 'cPanelMain');
	panel_main.add(Table, 'cTableCustomer');
	
	// окно с описанием клиента
	PAGE_CUSTOMER.popup_description = PAGE_CUSTOMER.add(Popup, 'cPopup');
	//	первая панель
	var popup_panel_customer = PAGE_CUSTOMER.popup_description.add(Panel, '');
	PAGE_CUSTOMER.grid_customer_descr = popup_panel_customer.add(Grid, '');
	PAGE_CUSTOMER.grid_customer_descr.addRow('Наименование', Text, 'cTextTitle');
	PAGE_CUSTOMER.grid_customer_descr.addRow('Город', Text, 'cTextTown');
	PAGE_CUSTOMER.grid_customer_descr.addRow('', Button, '').init('добавить аппарат', PAGE_CUSTOMER.popup_find_equipment_show.bind(PAGE_CUSTOMER), '150');
	PAGE_CUSTOMER.grid_customer_descr.addRow('', Button, '').init('закрыть', page_customer_popup_description_close, '150');
	//	вторая панель
	var popup_panel_customer_equipment = PAGE_CUSTOMER.controls['cPopup'].add(Panel, '');
	PAGE_CUSTOMER.table_customer_equipment = popup_panel_customer_equipment.add(Table, '');
	//PAGE_CUSTOMER.table_customer_equipment.setClick(PAGE_CUSTOMER.popup_equipment_edit_show);
	//	третяя панель
	var popup_panel_customer_contract = PAGE_CUSTOMER.controls['cPopup'].add(Panel, '');
	PAGE_CUSTOMER.table_customer_contract = popup_panel_customer_contract.add(Table, '');
	
	//	окно добавления аппарата (поиска аппарата)
	PAGE_CUSTOMER.popup_find_equipment = PAGE_CUSTOMER.add(Popup, '');									//	создаем окно добавления аппарата (поиска аппарата)
	var popup_panel_add_equipment = PAGE_CUSTOMER.popup_find_equipment.add(Panel, '');					//	создали панель
	popup_panel_add_equipment.add(Button, '').init('закрыть', PAGE_CUSTOMER.popup_find_equipment.hide.bind(PAGE_CUSTOMER.popup_find_equipment), '150');	//	добавили кнопку закрыть
	PAGE_CUSTOMER.search_equipment = popup_panel_add_equipment.add(SearchControl, '');					//	добавили контрол поиска
	PAGE_CUSTOMER.search_equipment.setClick(PAGE_CUSTOMER.popup_find_equipment_show);					//	назначили кнопку поиска
	PAGE_CUSTOMER.table_search_equipment = popup_panel_add_equipment.add(Table, '');					//	добавили таблицу
	
	// окно для добавления/редактирования аппарата
	PAGE_CUSTOMER.popup_equipment_edit = PAGE_CUSTOMER.add(Popup, '');									//	создаем окно редактирования аппарата
	var popup_panel_equipment_edit = PAGE_CUSTOMER.popup_equipment_edit.add(Panel, '');
	PAGE_CUSTOMER.grid_equipment_edit = popup_panel_equipment_edit.add(Grid);
	PAGE_CUSTOMER.grid_equipment_edit.addRow('аппарат', Text, 'cCaption');
	PAGE_CUSTOMER.grid_equipment_edit.addRow('серийный номер', Input, 'cSerial');
	PAGE_CUSTOMER.grid_equipment_edit.addRow('инвент. номер', Input, 'cInvent');
	PAGE_CUSTOMER.grid_equipment_edit.addRow('дата выпуска', Input, 'cDate');
	PAGE_CUSTOMER.grid_equipment_edit.addRow('', Button, 'btnSave').init('сохранить', PAGE_CUSTOMER.edit_equipment, '150');
	PAGE_CUSTOMER.grid_equipment_edit.addRow('', Button, '').init('закрыть', PAGE_CUSTOMER.popup_equipment_edit.hide.bind(PAGE_CUSTOMER.popup_equipment_edit), '150');
	
	// окно для добавления/редактирования клиента
	PAGE_CUSTOMER.popup_customer = PAGE_CUSTOMER.add(Popup, '');	
	var popup_panel_customer_edit = PAGE_CUSTOMER.popup_customer.add(Panel);
	PAGE_CUSTOMER.grid_customer_edit = popup_panel_customer_edit.add(Grid);
	PAGE_CUSTOMER.grid_customer_edit.addRow('Наименование', Input, 'cCaption');
	PAGE_CUSTOMER.grid_customer_edit.addRow('Город', Input, 'cTown');
	PAGE_CUSTOMER.grid_customer_edit.addRow('', Button, '').init('сохранить', PAGE_CUSTOMER.edit_customer, 150);
	PAGE_CUSTOMER.grid_customer_edit.addRow('', Button, '').init('закрыть', PAGE_CUSTOMER.popup_customer.hide.bind(PAGE_CUSTOMER.popup_customer), 150);
	


}


//	========================================================================================= //
//	Функция для заполнения страницы содержимым
function page_customer_show() {
	if(PAGE_CUSTOMER.is_prepare == false) {
		PAGE_CUSTOMER.is_prepare = true;
		page_customer_prepare();
	}
	PAGE_CUSTOMER.table_customer_fill();
}

//	========================================================================================= //
//	Функция для очистки содержимого страницы
function page_customer_clear() {

}



//	========================================================================================= //
//	Функция для закрытия всплывающего окна
function page_customer_popup_description_close() {
	PAGE_CUSTOMER.controls['cPopup'].hide();
}

function page_customer_close_popup_save() {
/*	PAGE_CUSTOMER.category_GUID = PAGE_CUSTOMER.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cSelectCategory'].getValue();
	PAGE_CUSTOMER.title = PAGE_CUSTOMER.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentTitle'].getValue();
	PAGE_CUSTOMER.model = PAGE_CUSTOMER.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentModel'].getValue();
	PAGE_CUSTOMER.manufacturer = PAGE_CUSTOMER.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentManufacturer'].getValue();
	EngineDB.addEquipment(PAGE_CUSTOMER.equipment_GUID, PAGE_CUSTOMER.category_GUID, PAGE_CUSTOMER.title, PAGE_CUSTOMER.model, PAGE_CUSTOMER.manufacturer);
	PAGE_CUSTOMER.controls['cPopup'].hide();
	page_customer_show();
*/
}

function page_customer_popup_equipment_edit_save(GUID) {
	GUID = GUID || '';
	_sqlAddCustomerEquipment(GUID, '', customer_guid, equipment_guid, num_serial, num_invent, date_create);
}


function page_customer_fill_popup_clear() {
/*
	PAGE_CUSTOMER.popup_description_show();
	PAGE_CUSTOMER.equipment_GUID = guid();
	PAGE_CUSTOMER.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cSelectCategory'].setSelect('');
	PAGE_CUSTOMER.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentTitle'].setValue('');
	PAGE_CUSTOMER.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentModel'].setValue('');
	PAGE_CUSTOMER.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentManufacturer'].setValue('');
*/
}





