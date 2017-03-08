<?php
header('Access-Control-Allow-Origin: *');
define( '_EXEC', 1);
include_once '/const.php';
require_once '/connection.php';

function issetPostEmpty($value) {
	if(isset($_POST[$value])) {
		return htmlspecialchars($_POST[$value]);
	}
	return '';
}

if(isset($_POST['SQL_QUERY_NAME'])) {
	$query_sring = '';
	$table_name = '';
	$is_delete = 0;
	$GUID = issetPostEmpty('GUID');
	if($_POST['SQL_QUERY_TYPE'] == 'delete') {
		$is_delete = 1;
	}
	switch($_POST['SQL_QUERY_NAME']) {
		case 'STRUCT_TABLE_CHAT':
		$descr = issetPostEmpty('descr');
		$query_sring = 
			"REPLACE INTO ".$_GLOBAL['DB_TABLE_PREFIX']."chat (is_delete, time_update, GUID, descr) ".
			"VALUES ".
			"(".$is_delete.", NOW(), '".$GUID."', '".$descr."')";
		$table_name = 'chat';
		break;
		
		case 'STRUCT_TABLE_CUSTOMER':
		$title = issetPostEmpty('title');
		$address = issetPostEmpty('address');
		$town = issetPostEmpty('town');
		$query_sring = 
			"REPLACE INTO ".$_GLOBAL['DB_TABLE_PREFIX']."customer (is_delete, time_update, GUID, title, address, town) ".
			"VALUES ".
			"(".$is_delete.", NOW(), '".$GUID."', '".$title."', '".$address."', '".$town."')";
		$table_name = 'customer';
		break;
		
		case 'STRUCT_TABLE_EQUIPMENT':
		$category_GUID = issetPostEmpty('category_GUID');
		$title = issetPostEmpty('title');
		$model = issetPostEmpty('model');
		$manufacturer = issetPostEmpty('manufacturer');
		$query_sring = 
			"REPLACE INTO ".$_GLOBAL['DB_TABLE_PREFIX']."equipment (is_delete, time_update, GUID, category_GUID, title, model, manufacturer) ".
			"VALUES ".
			"(".$is_delete.", NOW(), '".$GUID."', '".$category_GUID."', '".$title."', '".$model."', '".$manufacturer."')";
		$table_name = 'equipment';
		break;
		
		case 'STRUCT_TABLE_CUSTOMER_EQUIPMENT':
		$QR_string = issetPostEmpty('QR_string');
		$customer_GUID = issetPostEmpty('customer_GUID');
		$equipment_GUID = issetPostEmpty('equipment_GUID');
		$num_serial = issetPostEmpty('num_serial');
		$num_invent = issetPostEmpty('num_invent');
		$date_create = issetPostEmpty('date_create');
		$query_sring = 
			"REPLACE INTO ".$_GLOBAL['DB_TABLE_PREFIX']."customer_equipment (is_delete, time_update, GUID, QR_string, customer_GUID, equipment_GUID, num_serial, num_invent, date_create) ".
			"VALUES ".
			"(".$is_delete.", NOW(), '".$GUID."', '".$QR_string."', '".$customer_GUID."', '".$equipment_GUID."', '".$num_serial."', '".$num_invent."', '".$date_create."')";
		$table_name = 'customer_equipment';
		break;
		
	}
	$GUID = getGUID();
	if(mysqli_query($_GLOBAL['DB_CONNECTION'], $query_sring)) {
		$query_sring = 
			"INSERT INTO ".$_GLOBAL['DB_TABLE_PREFIX']."server_transact (GUID, time_update, table_name, query_type, record_GUID) ".
			"VALUES ".
			"('".$GUID."', NOW(), '".$table_name."', '".htmlspecialchars($_POST['SQL_QUERY_TYPE'])."', '".htmlspecialchars($_POST['GUID'])."')";
		mysqli_query($_GLOBAL['DB_CONNECTION'], $query_sring);
		echo 'ok';
	} else {
		echo $query_sring.PHP_EOL;
		echo 'error'.PHP_EOL;
		print_r($_POST);
	}
}
//echo getGUID();
?>