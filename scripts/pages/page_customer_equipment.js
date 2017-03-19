PAGE_CUSTOMER.popup_equipment_edit.init = function() {
	alert('dd');
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