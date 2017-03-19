var PAGE_MAIN;

Application.registryPage('PAGE_MAIN', 'Main menu', page_main_init, page_main_show);

function page_main_init() {
	PAGE_MAIN.add(Panel, 'cPanel');
	PAGE_MAIN.controls['cPanel'].add(Grid, 'cGrid');
	PAGE_MAIN.controls['cPanel'].controls['cGrid'].addRow('', Button, '').init('equipment', Application.open.bind(Application, 'PAGE_EQUIPMENT'), 100);
	PAGE_MAIN.controls['cPanel'].controls['cGrid'].addRow('', Button, '').init('customer', Application.open.bind(Application, 'PAGE_CUSTOMER'), 100);
	PAGE_MAIN.controls['cPanel'].controls['cGrid'].addRow('', Button, '').init('contract', alert, 100);
	PAGE_MAIN.controls['cPanel'].controls['cGrid'].addRow('', Button, '').init('task list', null, 100);
	PAGE_MAIN.controls['cPanel'].controls['cGrid'].addRow('', Button, '').init('login', Application.open.bind(Application, 'PAGE_LOGIN'), 100);

	var client = PAGE_MAIN.controls['cPanel'].add(Table);
	client.init(HTML_TABLE_CLIENT_TRANSACT, 'SELECT * FROM client_transact', [], 'SELECT COUNT(1) FROM client_transact', [], 'client_transact',  null);

	var server = PAGE_MAIN.controls['cPanel'].add(Table);
	server.init(HTML_TABLE_SERVER_TRANSACT, 'SELECT * FROM server_transact', [], 'SELECT COUNT(1) FROM server_transact', [], 'server_transact',  null);
}

function page_main_show() {

}