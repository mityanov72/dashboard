PAGE_CUSTOMER.popup_equipment_edit.init = function() {
}

PAGE_CUSTOMER.popup_equipment_edit.prepare = function() {
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
		PAGE_CUSTOMER.grid_equipment_edit.controls['btnSave'].setClick(PAGE_CUSTOMER.edit_equipment.bind(null, true, result['equipment_GUID'], result['customer_equipment_GUID'], PAGE_CUSTOMER.customer_GUID));
	}
	PAGE_CUSTOMER.customer_equipment_GUID = getTrGUID(sender);
	alasql('SELECT [customer_equipment].[GUID] AS [customer_equipment_GUID], * FROM [customer_equipment] JOIN [equipment] ON [customer_equipment].[equipment_GUID] = [equipment].[GUID] WHERE [customer_equipment].[GUID] = ?', [PAGE_CUSTOMER.customer_equipment_GUID], callbackFunction);
}

// изменение/добавление аппарата клиента
PAGE_CUSTOMER.edit_equipment = function(edit, equipment_GUID, customer_equipment_GUID, customer_GUID) {
	if(edit == undefined) 						throw new SyntaxError('empty argument (edit) in PAGE_CUSTOMER.edit_equipment()');
	if(equipment_GUID == undefined) 			throw new SyntaxError('empty argument (equipment_GUID) in PAGE_CUSTOMER.edit_equipment()');
	if(customer_equipment_GUID == undefined) 	throw new SyntaxError('empty argument (customer_equipment_GUID) in PAGE_CUSTOMER.edit_equipment()');
	if(customer_GUID == undefined) 				throw new SyntaxError('empty argument (customer_GUID) in PAGE_CUSTOMER.edit_equipment()');
	var aCaption = PAGE_CUSTOMER.grid_equipment_edit.controls['cCaption'].getValue();
	var aSerial = PAGE_CUSTOMER.grid_equipment_edit.controls['cSerial'].getValue();
	var aInvent = PAGE_CUSTOMER.grid_equipment_edit.controls['cInvent'].getValue();
	var aDate = PAGE_CUSTOMER.grid_equipment_edit.controls['cDate'].getValue();
	if(edit) {
		_sqlAddCustomerEquipment(customer_equipment_GUID, '', customer_GUID, equipment_GUID, aSerial, aInvent, aDate);
	} else {
		_sqlAddCustomerEquipment('', '', customer_GUID, equipment_GUID, aSerial, aInvent, aDate);
	}
	PAGE_CUSTOMER.popup_equipment_edit.hide();
	PAGE_CUSTOMER.table_customer_equipment.fill();
}