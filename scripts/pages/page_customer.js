//	========================================================================================= //
//	Объявляется переменная для страницы
var PAGE_CUSTOMER;

//	========================================================================================= //
//	Страница регистрируется в приложении
Application.registryPage('PAGE_CUSTOMER', 'Клиенты', page_customer_init, page_customer_show, page_customer_clear);

//	========================================================================================= //
//	Функция для инициализации страницы. Тут строятся все контролы
function page_customer_init() {
	
	//	Объекты на странице
	PAGE_CUSTOMER.table_customer		= {}	// список клиентов
	PAGE_CUSTOMER.table_equipment		= {}	// оборудование клиента
	PAGE_CUSTOMER.table_find_equipment	= {}	// поиск оборудования
	PAGE_CUSTOMER.table_contract		= {}	// контракты клиента
	
	PAGE_CUSTOMER.popup_description		= {}	// окно с описанием клиента
	PAGE_CUSTOMER.popup_find_equipment	= {}	// окно поиска аппарата из реестра
	PAGE_CUSTOMER.popup_equipment_edit	= {}	// окно для добавления/редактирования аппарата
	PAGE_CUSTOMER.popup_customer		= {}	// окно для добавления/редактирования клиента
	
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
	
	PAGE_CUSTOMER.customer_GUID					= undefined;	//	GUID клиента
	PAGE_CUSTOMER.customer_equipment_GUID		= undefined;	//	GUID аппарата клиента (имеет серийник)
	PAGE_CUSTOMER.find_equipment_GUID			= undefined;	//	GUID аппарата из таблицы оборудования (нет поля с серийником)	
}

function page_customer_prepare(){
	//	основное окно
	let panel_top = PAGE_CUSTOMER.add(Panel, 'cPanelTop');
	panel_top.add(Button, '').init('добавить клиента', null, 150);
	panel_top.add(SearchControl, 'cSearchControl').setClick(PAGE_CUSTOMER.table_customer_fill);
	let panel_main = PAGE_CUSTOMER.add(Panel, 'cPanelMain');
	panel_main.add(Table, 'cTableCustomer');
	
	//	всплывающее окно
	PAGE_CUSTOMER.add(Popup, 'cPopup');
	
	//	первая панель
	let popup_panel_customer = PAGE_CUSTOMER.controls['cPopup'].add(Panel, '');
	PAGE_CUSTOMER.popup_grid_customer = popup_panel_customer.add(Grid, '');
	PAGE_CUSTOMER.popup_grid_customer.addRow('Наименование', Text, 'cTextTitle');
	PAGE_CUSTOMER.popup_grid_customer.addRow('Город', Text, 'cTextTown');
	PAGE_CUSTOMER.popup_grid_customer.addRow('', Button, '').init('добавить аппарат', PAGE_CUSTOMER.popup_find_equipment_show, '150');
	PAGE_CUSTOMER.popup_grid_customer.addRow('', Button, '').init('Закрыть', page_customer_popup_description_close, '150');
	
	//	вторая панель
	let popup_panel_customer_equipment = PAGE_CUSTOMER.controls['cPopup'].add(Panel, '');
	PAGE_CUSTOMER.table_customer_equipment = popup_panel_customer_equipment.add(Table, '');
	
	//	третяя панель
	let popup_panel_customer_contract = PAGE_CUSTOMER.controls['cPopup'].add(Panel, '');
	PAGE_CUSTOMER.table_customer_contract = popup_panel_customer_contract.add(Table, '');
	
	//	окно добавления аппарата (поиска аппарата)
	PAGE_CUSTOMER.popup_find_equipment = PAGE_CUSTOMER.add(Popup, '');					//	создаем окно добавления аппарата (поиска аппарата)
	let popup_panel_add_equipment = PAGE_CUSTOMER.popup_find_equipment.add(Panel, '');	//	создали панель
	popup_panel_add_equipment.add(Button, '').init('закрыть', function() { PAGE_CUSTOMER.popup_find_equipment.hide(); }, '150');	//	добавили кнопку закрыть
	PAGE_CUSTOMER.search_equipment = popup_panel_add_equipment.add(SearchControl, '');					//	добавили контрол поиска
	PAGE_CUSTOMER.search_equipment.setClick(PAGE_CUSTOMER.popup_find_equipment_show);					//	назначили кнопку поиска
	PAGE_CUSTOMER.table_search_equipment = popup_panel_add_equipment.add(Table, '');					//	добавили таблицу
	
	// окно редактирования аппарата
	PAGE_CUSTOMER.page_customer_popup_equipment_edit = PAGE_CUSTOMER.add(Popup, '');					//	создаем окно редактирования аппарата
	let popup_panel_equipment_edit = PAGE_CUSTOMER.page_customer_popup_equipment_edit.add(Panel, '');
	PAGE_CUSTOMER.equipment_edit_grid = popup_panel_equipment_edit.add(Grid);
	PAGE_CUSTOMER.equipment_edit_grid.addRow('аппарат', Text, 'cCaption');
	PAGE_CUSTOMER.equipment_edit_grid.addRow('серийный номер', Input, 'cSerial');
	PAGE_CUSTOMER.equipment_edit_grid.addRow('инвент. номер', Input, 'cInvent');
	PAGE_CUSTOMER.equipment_edit_grid.addRow('дата выпуска', Input, 'cDate');
	PAGE_CUSTOMER.equipment_edit_grid.addRow('', Button, '').init('сохранить', function() { alert('s'); }, '150');
	PAGE_CUSTOMER.equipment_edit_grid.addRow('', Button, '').init('закрыть', function() { PAGE_CUSTOMER.page_customer_popup_equipment_edit.hide(); }, '150');
	
	// окно для добавления/редактирования клиента
	PAGE_CUSTOMER.popup_customer = PAGE_CUSTOMER.add(Popup, '');	
	let popup_panel_customer_edit = PAGE_CUSTOMER.popup_customer.add(Panel);
	PAGE_CUSTOMER.customer_edit_grid = popup_panel_customer_edit.add(Grid);
	PAGE_CUSTOMER.customer_edit_grid.addRow();
	


}


//	========================================================================================= //
//	Функция для заполнения страницы содержимым
function page_customer_show() {
	if(PAGE_CUSTOMER.is_init == false) {
		PAGE_CUSTOMER.is_init = true;
		page_customer_prepare();
	}
	PAGE_CUSTOMER.table_customer_fill();
}

//	========================================================================================= //
//	Функция для очистки содержимого страницы
function page_customer_clear() {

}

//	========================================================================================= //
//
//	Заполнение таблиц
//
//	========================================================================================= //
PAGE_CUSTOMER.table_customer_fill = function() {			// заполнение таблицы списка клиентов
	let search_text = '%'+PAGE_CUSTOMER.controls['cPanelTop'].controls['cSearchControl'].getValue()+'%';
	PAGE_CUSTOMER.controls['cPanelMain'].controls['cTableCustomer'].init(HTML_TABLE_CUSTOMER, 'SELECT GUID, title AS customer_title FROM customer WHERE title LIKE ? OR town LIKE ? ORDER BY title', [search_text, search_text], 
			'SELECT COUNT(1) FROM customer WHERE title LIKE ? OR town LIKE ?', [search_text, search_text], 'table customer',  PAGE_CUSTOMER.table_customer_click);
}
PAGE_CUSTOMER.table_equipment_fill = function() {			// заполнение таблицы оборудования клиента

}
PAGE_CUSTOMER.table_find_equipment_fill = function() {		// заполнение таблицы поиска оборудования
	let search_text = '%'+PAGE_CUSTOMER.search_equipment.getValue()+'%';
	PAGE_CUSTOMER.table_search_equipment.init(HTML_TABLE_EQUIPMENT, 
			'SELECT GUID,"<p class=\'p_first_table_string\'>" || title || "</p><p class=\'p_second_table_string\'>" || model || "</p>" AS title_model, manufacturer FROM equipment WHERE title LIKE ? OR model LIKE ?',
			[search_text, search_text], 'SELECT COUNT(1) FROM equipment WHERE title LIKE ? OR model LIKE ?', [search_text, search_text], 'поиск аппарата', PAGE_CUSTOMER.table_find_equipment_click);
}
PAGE_CUSTOMER.table_contract_fill = function() {			// заполнение таблицы контрактов клиента

}
//	========================================================================================= //
//
//	Клики на таблицы
//
//	========================================================================================= //
//
//	Функция для обработки кликов на таблице
PAGE_CUSTOMER.table_customer_click = function(sender) {
	let callbackFunction = function(error_level, result, param) {
		result = result[0];
		PAGE_CUSTOMER.title = result['title'];
		PAGE_CUSTOMER.town = result['town'];
		PAGE_CUSTOMER.popup_description_show();
		page_customer_popup_description_fill(PAGE_CUSTOMER.title, PAGE_CUSTOMER.town);		
	}
	PAGE_CUSTOMER.customer_GUID = getTrFieldValue(sender, 'GUID');
	EngineDB.executeSql('SELECT title, town FROM customer WHERE GUID = ?', [PAGE_CUSTOMER.customer_GUID], callbackFunction, [], true);
}

PAGE_CUSTOMER.table_find_equipment_click = function(sender) {
	let callbackFunction = function(error_level, result, param) {
		result = result[0];
		PAGE_CUSTOMER.equipment_edit_grid.controls['cCaption'].setValue('<b>'+result['title']+'</b> '+result['model']);
		PAGE_CUSTOMER.equipment_edit_grid.controls['cSerial'].setValue('');
		PAGE_CUSTOMER.equipment_edit_grid.controls['cInvent'].setValue('');
		PAGE_CUSTOMER.equipment_edit_grid.controls['cDate'].setValue('');
	}
	PAGE_CUSTOMER.page_customer_popup_equipment_edit.show();
	PAGE_CUSTOMER.find_equipment_GUID = getTrFieldValue(sender, 'GUID');
	EngineDB.executeSql('SELECT * FROM equipment WHERE GUID = ?', [PAGE_CUSTOMER.find_equipment_GUID], callbackFunction, [], true);
}

//	========================================================================================= //
//
//	Всплывающие окна
//
//	========================================================================================= //
//
//	Функция для вызова всплывающего окна
PAGE_CUSTOMER.popup_description_show = function() {			// открытие окна с описанием клиента
	PAGE_CUSTOMER.controls['cPopup'].show();
	PAGE_CUSTOMER.table_customer_equipment.init(HTML_TABLE_CUSTOMER_EQUIPMENT,
			'SELECT customer_equipment.GUID, equipment.title || "</br>" || equipment.model || " " || customer_equipment.date_create AS title_model_date, customer_equipment.num_serial '+
			'|| "</br>" || customer_equipment.num_invent AS num_serial_invent FROM customer_equipment, equipment WHERE customer_equipment.equipment_GUID = equipment.GUID AND customer_GUID = ?', [PAGE_CUSTOMER.customer_GUID],
			'SELECT COUNT(1) FROM customer_equipment, equipment WHERE customer_equipment.equipment_GUID = equipment.GUID AND customer_GUID = ?', [PAGE_CUSTOMER.customer_GUID], 'оборудование клиента', null);
}
PAGE_CUSTOMER.popup_find_equipment_show = function() {		// открытие окна с поиском оборудования
	PAGE_CUSTOMER.popup_find_equipment.show();
	PAGE_CUSTOMER.table_find_equipment_fill();
}
PAGE_CUSTOMER.popup_equipment_edit_show = function() {		// открытие окна с редактированием аппарата

}
function popup_find_equipment_show() {
	PAGE_CUSTOMER.popup_find_equipment.show();
	PAGE_CUSTOMER.table_find_equipment_fill();
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

function page_customer_popup_equipment_edit_save(GUID = '') {
	
	EngineDB.addCustomerEquipment(GUID, '', customer_guid, equipment_guid, num_serial, num_invent, date_create);
}

//	========================================================================================= //
//	Функции для заполнения всплывающего окна
function page_customer_popup_description_fill(title, town) {
	PAGE_CUSTOMER.popup_grid_customer.controls['cTextTitle'].setValue(title);
	PAGE_CUSTOMER.popup_grid_customer.controls['cTextTown'].setValue(town);
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





