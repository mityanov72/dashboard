//	========================================================================================= //
//	Объявляется переменная для страницы
var PAGE_EQUIPMENT;

//	========================================================================================= //
//	Страница регистрируется в приложении
Application.registryPage('PAGE_EQUIPMENT', 'Каталог оборудования', page_equipment_init, page_equipment_show, page_equipment_clear);

//	========================================================================================= //
//	Функция для инициализации страницы. Тут строятся все контролы
function page_equipment_init() {
	PAGE_EQUIPMENT.add(Panel, 'cPanelTop');
	var btnAdd = PAGE_EQUIPMENT.controls['cPanelTop'].add(Button, 'cButtonAdd');
	btnAdd.setText('добавить аппарат');
	btnAdd.setWidth(150);
	btnAdd.setClick(page_equipment_fill_popup_clear);
	PAGE_EQUIPMENT.controls['cPanelTop'].add(SearchControl, 'cSearchControl');
	PAGE_EQUIPMENT.controls['cPanelTop'].controls['cSearchControl'].setClick(page_equipment_show);
	
	PAGE_EQUIPMENT.add(Panel, 'cPanelMain');
	PAGE_EQUIPMENT.controls['cPanelMain'].add(Table, 'cTableEquipment');
	
	PAGE_EQUIPMENT.add(Popup, 'cPopup');
	PAGE_EQUIPMENT.controls['cPopup'].add(Panel, 'cPopupPanel');
	PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].add(Grid, 'cPopupGrid');
	PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].addRow('category', Select, 'cSelectCategory');
	PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cSelectCategory'].setWidth('100%');
	PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].addRow('title', Input, 'cInputEquipmentTitle');
	PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].addRow('model', Input, 'cInputEquipmentModel');
	PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].addRow('manufacturer', Input, 'cInputEquipmentManufacturer');
	var btnSaveEquipment = PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].addRow('', Button, 'cButtonSaveEquipment');
	var btnClose = PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].addRow('', Button, 'cButtonClosePopup');
	btnSaveEquipment.setText('save');
	btnSaveEquipment.setWidth(100);
	btnSaveEquipment.setClick(page_equipment_close_popup_save);
	btnClose.setText('cancel');
	btnClose.setWidth(100);
	btnClose.setClick(page_equipment_close_popup);
	PAGE_EQUIPMENT.equipment_GUID = undefined;
	PAGE_EQUIPMENT.category_GUID = undefined;
	PAGE_EQUIPMENT.title = undefined;
	PAGE_EQUIPMENT.model = undefined;
	PAGE_EQUIPMENT.manufacturer = undefined;
}

//	========================================================================================= //
//	Функция для заполнения страницы содержимым
function page_equipment_show() {
	var search_text = '%'+PAGE_EQUIPMENT.controls['cPanelTop'].controls['cSearchControl'].getValue()+'%';
	PAGE_EQUIPMENT.controls['cPanelMain'].controls['cTableEquipment'].init(HTML_TABLE_EQUIPMENT, 'SELECT GUID, "<p class=\'p_first_table_string\'>" || title || "</p><p class=\'p_second_table_string\'>" || model || "</p>" AS title_model, manufacturer '+
			'FROM equipment WHERE title LIKE ? OR model LIKE ? ORDER BY title, model', [search_text, search_text], 'SELECT COUNT(1) FROM equipment WHERE title LIKE ? OR model LIKE ?', [search_text, search_text], 'каталог оборудования',  page_equipment_table_click);
	PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cSelectCategory'].init(HTML_TABLE_EQUIPMENT_CAT, 'SELECT [GUID], [title] AS [value] FROM equipment_category',
			[], 'SELECT COUNT(1) FROM equipment_category', []);
}

//	========================================================================================= //
//	Функция для очистки содержимого страницы
function page_equipment_clear() {

}

//	========================================================================================= //
//	Функция для обработки кликов на таблице
function page_equipment_table_click(sender) {
	var callbackFunction = function(result) {
		result = result[0];
		PAGE_EQUIPMENT.category_GUID = result['category_GUID'];
		PAGE_EQUIPMENT.title = result['title'];
		PAGE_EQUIPMENT.model = result['model'];
		PAGE_EQUIPMENT.manufacturer = result['manufacturer'];
		page_equipment_show_popup();
		page_equipment_fill_popup(PAGE_EQUIPMENT.category_GUID, PAGE_EQUIPMENT.title, PAGE_EQUIPMENT.model, PAGE_EQUIPMENT.manufacturer);		
	}
	PAGE_EQUIPMENT.equipment_GUID = getTrGUID(sender);
	alasql('SELECT category_GUID, title, model, manufacturer FROM equipment WHERE GUID = ?', [PAGE_EQUIPMENT.equipment_GUID], callbackFunction);
	//EngineDB.executeSql('SELECT category_GUID, title, model, manufacturer FROM equipment WHERE GUID = ?', [PAGE_EQUIPMENT.equipment_GUID], callbackFunction, [], true);
}

//	========================================================================================= //
//	Функция для вызова всплывающего окна
function page_equipment_show_popup() {
	PAGE_EQUIPMENT.controls['cPopup'].show();
	
}

//	========================================================================================= //
//	Функция для закрытия всплывающего окна
function page_equipment_close_popup() {
	PAGE_EQUIPMENT.controls['cPopup'].hide();
}

function page_equipment_close_popup_save() {
	PAGE_EQUIPMENT.category_GUID = PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cSelectCategory'].getValue();
	PAGE_EQUIPMENT.title = PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentTitle'].getValue();
	PAGE_EQUIPMENT.model = PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentModel'].getValue();
	PAGE_EQUIPMENT.manufacturer = PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentManufacturer'].getValue();
	_sqlAddEquipment(PAGE_EQUIPMENT.equipment_GUID, PAGE_EQUIPMENT.category_GUID, PAGE_EQUIPMENT.title, PAGE_EQUIPMENT.model, PAGE_EQUIPMENT.manufacturer);
	//EngineDB.addEquipment(PAGE_EQUIPMENT.equipment_GUID, PAGE_EQUIPMENT.category_GUID, PAGE_EQUIPMENT.title, PAGE_EQUIPMENT.model, PAGE_EQUIPMENT.manufacturer);
	PAGE_EQUIPMENT.controls['cPopup'].hide();
	page_equipment_show();
}

//	========================================================================================= //
//	Функции для заполнения всплывающего окна
function page_equipment_fill_popup(category_GUID, title, model, manufacturer) {
	PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cSelectCategory'].setSelect(category_GUID);
	PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentTitle'].setValue(title);
	PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentModel'].setValue(model);
	PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentManufacturer'].setValue(manufacturer);
}

function page_equipment_fill_popup_clear() {
	page_equipment_show_popup();
	PAGE_EQUIPMENT.equipment_GUID = guid();
	PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cSelectCategory'].setSelect('');
	PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentTitle'].setValue('');
	PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentModel'].setValue('');
	PAGE_EQUIPMENT.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentManufacturer'].setValue('');
}





