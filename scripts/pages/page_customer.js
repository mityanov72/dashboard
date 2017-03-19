//	========================================================================================= //
//	Объявляется переменная для страницы
var PAGE_CUSTOMER;

//	========================================================================================= //
//	Страница регистрируется в приложении
Application.registryPage('PAGE_CUSTOMER', 'Клиенты', page_customer_init, page_customer_show, page_customer_clear);

//	========================================================================================= //
//	Добавляем дочерние скрипты
loadScript('scripts/pages/page_customer_popup_equipment.js');
loadScript('scripts/pages/page_customer_popup_find_equipment.js');
loadScript('scripts/pages/page_customer_popup_edit.js');
loadScript('scripts/pages/page_customer_popup_description.js');

PAGE_CUSTOMER.customer_GUID					= undefined;	//	GUID клиента
PAGE_CUSTOMER.customer_equipment_GUID		= undefined;	//	GUID аппарата клиента (имеет серийник)
PAGE_CUSTOMER.find_equipment_GUID			= undefined;	//	GUID аппарата из таблицы оборудования (нет поля с серийником)

//	Объекты на странице
PAGE_CUSTOMER.table_customer			= {}	// список клиентов
PAGE_CUSTOMER.table_customer_equipment	= {}	// оборудование клиента
PAGE_CUSTOMER.table_find_equipment		= {}	// поиск оборудования
PAGE_CUSTOMER.table_contract			= {}	// контракты клиента

PAGE_CUSTOMER.popup_description			= {}	// окно с описанием клиента
PAGE_CUSTOMER.popup_find_equipment		= {}	// окно поиска аппарата из реестра
PAGE_CUSTOMER.popup_equipment_edit		= {}	// окно для добавления/редактирования аппарата
PAGE_CUSTOMER.popup_customer			= {}	// окно для добавления/редактирования клиента

PAGE_CUSTOMER.grid_customer_descr		= {}	// решетка с описанием клиента
PAGE_CUSTOMER.grid_equipment_edit		= {}	// решетка с описанием аппарата
PAGE_CUSTOMER.grid_customer_edit		= {}	// решетка для редактирования клиента

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

//	========================================================================================= //
//	Функция для инициализации страницы. Тут строятся все контролы
function page_customer_init() {
	// заполнение таблицы списка клиентов
	PAGE_CUSTOMER.table_customer_fill = function() {
		var search_text = '%'+PAGE_CUSTOMER.controls['cPanelTop'].controls['cSearchControl'].getValue()+'%';
		PAGE_CUSTOMER.controls['cPanelMain'].controls['cTableCustomer'].init(HTML_TABLE_CUSTOMER, 'SELECT GUID, title AS customer_title FROM customer WHERE title LIKE ? OR town LIKE ? ORDER BY title', [search_text, search_text], 
				'SELECT COUNT(1) FROM customer WHERE title LIKE ? OR town LIKE ?', [search_text, search_text], 'table customer',  PAGE_CUSTOMER.table_customer_click);
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

	PAGE_CUSTOMER.popup_equipment_edit.init();

}

function page_customer_prepare(){
	//	основное окно
	var panel_top = PAGE_CUSTOMER.add(Panel, 'cPanelTop');
	panel_top.add(Button, '').init('добавить клиента', PAGE_CUSTOMER.popup_customer_edit_show, 150);
	panel_top.add(SearchControl, 'cSearchControl').setClick(PAGE_CUSTOMER.table_customer_fill);
	var panel_main = PAGE_CUSTOMER.add(Panel, 'cPanelMain');
	panel_main.add(Table, 'cTableCustomer');
	

	
	PAGE_CUSTOMER.popup_description.prepare();
	PAGE_CUSTOMER.popup_find_equipment.prepare();
	PAGE_CUSTOMER.popup_equipment_edit.prepare();
	PAGE_CUSTOMER.popup_customer.prepare();
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





