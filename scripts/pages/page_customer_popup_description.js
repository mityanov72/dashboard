// окно с описанием клиента

PAGE_CUSTOMER.popup_description.prepare = function() {
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
	
	//	третяя панель
	var popup_panel_customer_contract = PAGE_CUSTOMER.controls['cPopup'].add(Panel, '');
	PAGE_CUSTOMER.table_customer_contract = popup_panel_customer_contract.add(Table, '');

}

// заполнение таблицы оборудования клиента
PAGE_CUSTOMER.table_equipment_fill = function() {
	PAGE_CUSTOMER.table_customer_equipment.init(HTML_TABLE_CUSTOMER_EQUIPMENT,
			'SELECT customer_equipment.GUID, equipment.title || "</br>" || equipment.model || " " || customer_equipment.date_create AS title_model_date, customer_equipment.num_serial '+
			'|| "</br>" || customer_equipment.num_invent AS num_serial_invent FROM customer_equipment, equipment WHERE customer_equipment.equipment_GUID = equipment.GUID AND customer_GUID = ?', [PAGE_CUSTOMER.customer_GUID],
			'SELECT COUNT(1) FROM customer_equipment, equipment WHERE customer_equipment.equipment_GUID = equipment.GUID AND customer_GUID = ?', [PAGE_CUSTOMER.customer_GUID], 'оборудование клиента', PAGE_CUSTOMER.table_equipment_click);
}

// заполнение таблицы контрактов клиента
PAGE_CUSTOMER.table_contract_fill = function() {

}


