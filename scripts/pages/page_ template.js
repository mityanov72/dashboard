//	========================================================================================= //
//	Объявляется переменная для страницы
var PAGE_TEMPLATE;

//	========================================================================================= //
//	Страница регистрируется в приложении
Application.registryPage('PAGE_TEMPLATE', 'Template page', page_template_init, page_template_show, page_template_clear);

//	========================================================================================= //
//	Функция для инициализации страницы. Тут строятся все контролы
function page_template_init() {
/*	PAGE_TEMPLATE.add(Panel, 'cPanelTop');
	PAGE_TEMPLATE.controls['cPanelTop'].add(SearchControl, 'cSearchControl');
	let btnAdd = PAGE_TEMPLATE.controls['cPanelTop'].add(Button, 'cButtonAdd');
	btnAdd.setText('add equipment');
	btnAdd.setWidth(100);
	btnAdd.setClick(page_template_fill_popup_clear);
	
	PAGE_TEMPLATE.equipment_GUID = undefined;
	PAGE_TEMPLATE.category_GUID = undefined;
	PAGE_TEMPLATE.title = undefined;
	PAGE_TEMPLATE.model = undefined;
	PAGE_TEMPLATE.manufacturer = undefined;
*/
	

}

//	========================================================================================= //
//	Функция для заполнения страницы содержимым
function page_template_show() {
/*	let search_text = '%'+PAGE_TEMPLATE.controls['cPanelTop'].controls['cSearchControl'].getValue()+'%';
	PAGE_TEMPLATE.controls['cPanelMain'].controls['cTableEquipment'].init(HTML_TABLE_EQUIPMENT, 'SELECT GUID, "<p class=\'p_first_table_string\'>" || title || "</p><p class=\'p_second_table_string\'>" || model || "</p>" AS title_model, manufacturer '+
			'FROM equipment WHERE title LIKE ? OR model LIKE ? ORDER BY title, model', [search_text, search_text], 'SELECT COUNT(1) FROM equipment WHERE title LIKE ? OR model LIKE ?', [search_text, search_text], 'table equipment',  page_template_table_click);
	PAGE_TEMPLATE.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cSelectCategory'].init(HTML_TABLE_EQUIPMENT_CAT, 'SELECT GUID, title AS value FROM equipment_category',
			[], 'SELECT COUNT(1) FROM equipment_category', []);
*/
}

//	========================================================================================= //
//	Функция для очистки содержимого страницы
function page_template_clear() {

}

//	========================================================================================= //
//	Функция для обработки кликов на таблице
function page_template_table_click(sender) {
/*
	let callbackFunction = function(error_level, result, param) {
		result = result[0];
		PAGE_TEMPLATE.category_GUID = result['category_GUID'];
		PAGE_TEMPLATE.title = result['title'];
		PAGE_TEMPLATE.model = result['model'];
		PAGE_TEMPLATE.manufacturer = result['manufacturer'];
		page_template_show_popup();
		page_template_fill_popup(PAGE_TEMPLATE.category_GUID, PAGE_TEMPLATE.title, PAGE_TEMPLATE.model, PAGE_TEMPLATE.manufacturer);		
	}
	PAGE_TEMPLATE.equipment_GUID = getTrFieldValue(sender, 'GUID');
	EngineDB.executeSql('SELECT category_GUID, title, model, manufacturer FROM equipment WHERE GUID = ?', [PAGE_TEMPLATE.equipment_GUID], callbackFunction, [], true);
*/
}

//	========================================================================================= //
//	Функция для вызова всплывающего окна
function page_template_show_popup() {
	PAGE_TEMPLATE.controls['cPopup'].show();
	
}

//	========================================================================================= //
//	Функция для закрытия всплывающего окна
function page_template_close_popup() {
	PAGE_TEMPLATE.controls['cPopup'].hide();
}

function page_template_close_popup_save() {
/*	PAGE_TEMPLATE.category_GUID = PAGE_TEMPLATE.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cSelectCategory'].getValue();
	PAGE_TEMPLATE.title = PAGE_TEMPLATE.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentTitle'].getValue();
	PAGE_TEMPLATE.model = PAGE_TEMPLATE.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentModel'].getValue();
	PAGE_TEMPLATE.manufacturer = PAGE_TEMPLATE.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentManufacturer'].getValue();
	EngineDB.addEquipment(PAGE_TEMPLATE.equipment_GUID, PAGE_TEMPLATE.category_GUID, PAGE_TEMPLATE.title, PAGE_TEMPLATE.model, PAGE_TEMPLATE.manufacturer);
	PAGE_TEMPLATE.controls['cPopup'].hide();
	page_template_show();
*/
}

//	========================================================================================= //
//	Функции для заполнения всплывающего окна
function page_template_fill_popup(category_GUID, title, model, manufacturer) {
/*	PAGE_TEMPLATE.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cSelectCategory'].setSelect(category_GUID);
	PAGE_TEMPLATE.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentTitle'].setValue(title);
	PAGE_TEMPLATE.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentModel'].setValue(model);
	PAGE_TEMPLATE.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentManufacturer'].setValue(manufacturer);
*/
}

function page_template_fill_popup_clear() {
/*
	page_template_show_popup();
	PAGE_TEMPLATE.equipment_GUID = guid();
	PAGE_TEMPLATE.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cSelectCategory'].setSelect('');
	PAGE_TEMPLATE.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentTitle'].setValue('');
	PAGE_TEMPLATE.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentModel'].setValue('');
	PAGE_TEMPLATE.controls['cPopup'].controls['cPopupPanel'].controls['cPopupGrid'].controls['cInputEquipmentManufacturer'].setValue('');
*/
}





