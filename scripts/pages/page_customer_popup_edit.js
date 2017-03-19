PAGE_CUSTOMER.popup_customer.prepare = function() {
	// окно для добавления/редактирования клиента
	PAGE_CUSTOMER.popup_customer = PAGE_CUSTOMER.add(Popup, '');	
	var popup_panel_customer_edit = PAGE_CUSTOMER.popup_customer.add(Panel);
	PAGE_CUSTOMER.grid_customer_edit = popup_panel_customer_edit.add(Grid);
	PAGE_CUSTOMER.grid_customer_edit.addRow('Наименование', Input, 'cCaption');
	PAGE_CUSTOMER.grid_customer_edit.addRow('Город', Input, 'cTown');
	PAGE_CUSTOMER.grid_customer_edit.addRow('', Button, '').init('сохранить', PAGE_CUSTOMER.edit_customer, 150);
	PAGE_CUSTOMER.grid_customer_edit.addRow('', Button, '').init('закрыть', PAGE_CUSTOMER.popup_customer.hide.bind(PAGE_CUSTOMER.popup_customer), 150);
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