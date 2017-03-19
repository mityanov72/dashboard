PAGE_CUSTOMER.popup_find_equipment.init = function() {

}

PAGE_CUSTOMER.popup_find_equipment.prepare = function() {
	//	окно добавления аппарата (поиска аппарата)
	PAGE_CUSTOMER.popup_find_equipment = PAGE_CUSTOMER.add(Popup, '');									//	создаем окно добавления аппарата (поиска аппарата)
	var popup_panel_add_equipment = PAGE_CUSTOMER.popup_find_equipment.add(Panel, '');					//	создали панель
	popup_panel_add_equipment.add(Button, '').init('закрыть', PAGE_CUSTOMER.popup_find_equipment.hide.bind(PAGE_CUSTOMER.popup_find_equipment), '150');	//	добавили кнопку закрыть
	PAGE_CUSTOMER.search_equipment = popup_panel_add_equipment.add(SearchControl, '');					//	добавили контрол поиска
	PAGE_CUSTOMER.search_equipment.setClick(PAGE_CUSTOMER.popup_find_equipment_show);					//	назначили кнопку поиска
	PAGE_CUSTOMER.table_search_equipment = popup_panel_add_equipment.add(Table, '');					//	добавили таблицу
}

PAGE_CUSTOMER.popup_find_equipment.show = function() {
	PAGE_CUSTOMER.popup_find_equipment.show();
	PAGE_CUSTOMER.table_find_equipment_fill();
}

// заполнение таблицы поиска оборудования
PAGE_CUSTOMER.table_find_equipment_fill = function() {
	var search_text = '%'+PAGE_CUSTOMER.search_equipment.getValue()+'%';
	PAGE_CUSTOMER.table_search_equipment.init(HTML_TABLE_EQUIPMENT, 
			'SELECT GUID,"<p class=\'p_first_table_string\'>" || title || "</p><p class=\'p_second_table_string\'>" || model || "</p>" AS title_model, manufacturer FROM equipment WHERE title LIKE ? OR model LIKE ?',
			[search_text, search_text], 'SELECT COUNT(1) FROM equipment WHERE title LIKE ? OR model LIKE ?', [search_text, search_text], 'поиск аппарата', PAGE_CUSTOMER.table_find_equipment_click);
}

//клик на таблице поиска оборудования
PAGE_CUSTOMER.table_find_equipment_click = function(sender) {
	var callbackFunction = function(result) {
		result = result[0];
		PAGE_CUSTOMER.grid_equipment_edit.controls['cCaption'].setValue('<b>'+result['title']+'</b> '+result['model']);
		PAGE_CUSTOMER.grid_equipment_edit.controls['cSerial'].setValue('');
		PAGE_CUSTOMER.grid_equipment_edit.controls['cInvent'].setValue('');
		PAGE_CUSTOMER.grid_equipment_edit.controls['cDate'].setValue('');
		PAGE_CUSTOMER.grid_equipment_edit.controls['btnSave'].setClick(PAGE_CUSTOMER.edit_equipment.bind(null, false, PAGE_CUSTOMER.find_equipment_GUID, '', PAGE_CUSTOMER.customer_GUID));
	}
	PAGE_CUSTOMER.popup_equipment_edit.show();
	PAGE_CUSTOMER.find_equipment_GUID = getTrGUID(sender);
	alasql('SELECT * FROM equipment WHERE GUID = ?', [PAGE_CUSTOMER.find_equipment_GUID], callbackFunction);
}