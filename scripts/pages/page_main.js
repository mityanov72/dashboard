var PAGE_MAIN;

Application.registryPage('PAGE_MAIN', 'Main menu', page_main_init, page_main_show);

function page_main_init() {
	PAGE_MAIN.add(Panel, 'cPanel');
	PAGE_MAIN.controls['cPanel'].add(Grid, 'cGrid');
	var btnEquipment = PAGE_MAIN.controls['cPanel'].controls['cGrid'].addRow('', Button, 'btnEquipment');
	btnEquipment.setText('equipment');
	btnEquipment.setWidth(100);
	btnEquipment.setClick(function() { Application.open('PAGE_EQUIPMENT') });
	var btnCustomer = PAGE_MAIN.controls['cPanel'].controls['cGrid'].addRow('', Button, 'btnCustomer');
	btnCustomer.setText('customer');
	btnCustomer.setWidth(100);
	btnCustomer.setClick(function() { Application.open('PAGE_CUSTOMER') });
	var btnContract = PAGE_MAIN.controls['cPanel'].controls['cGrid'].addRow('', Button, 'btnContract');
	btnContract.setText('contract');
	btnContract.setWidth(100);
}

function page_main_show() {

}