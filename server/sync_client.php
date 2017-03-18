<?php
header('Access-Control-Allow-Origin: *');

define( '_EXEC', 1);
include_once 'const.php';
require_once '../../connection.php';
$query_sring = "SELECT * FROM `users` LIMIT 10";

//if($_GLOBAL['ACCESS_LEVEL'])

	
//========================================================================================================================================================//
//	возвращает строку в BASE-64 кодировке и добавляет кавычки. если в параметре не строка, то ничего не делает
//
//	var_string			- исходная строка для перевода
function quote_is_string($var_string) {
	$var_string = base64_decode(base64_encode($var_string));
	if(is_int($var_string)) {
		return $var_string;
	} else {
		return '"'.$var_string.'"';
	}
}

/*
Формат POST запроса
SQL_QUERY_NAME 		- имя запроса, например SQL_SELECT_SERVER_TRANSACT
time_update 		- время последнего обновления
SQL_QUERY_PAGE		- номер страницы в SQL таблице
*/

//print_r($_POST);

if(isset($_POST['SQL_QUERY_NAME'])) {
	$query_sring = '';
	$query_sring_count = '';
	if(!isset($_POST['SQL_QUERY_PAGE'])) {
		$_POST['SQL_QUERY_PAGE'] = 0;
	}
	if(!isset($_POST['SQL_TIME_UPDATE'])) {
		$_POST['SQL_TIME_UPDATE'] = '2011-01-01 01:00:00';
	} else {
		$time_update = htmlspecialchars($_POST['SQL_TIME_UPDATE']);
	}
	if(!isset($_POST['GUID'])) {
		$_POST['GUID'] = 0;
	} else {
		$GUID = htmlspecialchars($_POST['GUID']);
	}
	$page = $_GLOBAL['DB_RECORD_LIMIT'] * htmlspecialchars($_POST['SQL_QUERY_PAGE']);
	switch($_POST['SQL_QUERY_NAME']) {
		case 'SQL_SELECT_SERVER_TRANSACT':
			$query_sring = "SELECT * FROM server_transact WHERE time_update > STR_TO_DATE('".$time_update."', '%Y-%m-%d %H:%i:%s') ORDER BY time_update, GUID DESC LIMIT ".$page.", ".$_GLOBAL['DB_RECORD_LIMIT'];
			$query_sring_count = "SELECT COUNT(1) FROM server_transact WHERE time_update > STR_TO_DATE('".$time_update."', '%Y-%m-%d %H:%i:%s')";
		break;
		case 'SQL_SELECT_CHAT':
			$query_sring = "SELECT * FROM chat WHERE GUID = '".$GUID."'";
		break;
		case 'SQL_SELECT_CUSTOMER':
			$query_sring = "SELECT * FROM customer WHERE GUID = '".$GUID."'";
		break;
		case 'SQL_SELECT_EQUIPMENT':
			$query_sring = "SELECT * FROM equipment WHERE GUID = '".$GUID."'";
		break;
		case 'SQL_SELECT_CUSTOMER_EQUIPMENT':
			$query_sring = "SELECT * FROM customer_equipment WHERE GUID = '".$GUID."'";
		break;

	}
	//echo $query_sring;
	if($query_sring_count != '') {
		$result = mysqli_query($_GLOBAL['DB_CONNECTION'], $query_sring_count);
		$result_array = mysqli_fetch_array($result);
	} else {
		$result_array[0] = 1;
	}
	getJsonFromSQL($query_sring, $_POST['SQL_QUERY_PAGE'], ceil($result_array[0] / $_GLOBAL['DB_RECORD_LIMIT']));
}

//========================================================================================================================================================//
//	переводит таблицу SQL в JSON формат
//
//	query_sring			- строка SQL запроса
//	sql_page			- номер страницы в полученной таблице
//	sql_page_total		- общее количество страниц в полученной таблице
function getJsonFromSQL($query_sring, $sql_page = 1, $sql_page_total = 0) {
	global $_GLOBAL;
	if($result = mysqli_query($_GLOBAL['DB_CONNECTION'], $query_sring)) {
		$is_one = true;
		echo '{'.PHP_EOL;
		echo PHP_TAB.'"sql": "'.$query_sring.'",'.PHP_EOL;
		echo PHP_TAB.'"fields_count": '.$result->field_count.','.PHP_EOL;
		echo PHP_TAB.'"sql_page": '.$sql_page.','.PHP_EOL;
		echo PHP_TAB.'"sql_page_total": '.$sql_page_total.','.PHP_EOL;
		echo PHP_TAB.'"num_rows": '.$result->num_rows.','.PHP_EOL;
		$indexRow = 0;
		while($row = mysqli_fetch_assoc($result)) {
			$index = 0;
			if($is_one) {
				
				echo PHP_TAB.'"fields": {'.PHP_EOL;
				foreach ($row as $key => $value) {
					$splitter = '';
					if($index < $result->field_count-1) { $splitter = ','; }
					echo PHP_TAB.PHP_TAB.'"field'.$index.'": "'.$key.'"'.$splitter.PHP_EOL;
					$index++;
				}
				echo PHP_TAB.'},'.PHP_EOL;
				$is_one = false;
			}
			$index = 0;
			echo PHP_TAB.'"row'.$indexRow.'": {'.PHP_EOL;
			foreach ($row as $key => $value) {
				$splitter = '';
				if($index < $result->field_count-1) { $splitter = ','; }
				echo PHP_TAB.PHP_TAB.'"'.$key.'": '.quote_is_string($value).$splitter.PHP_EOL;
				$index++;
				
			}
			echo PHP_TAB.'},'.PHP_EOL;
			$indexRow++;
		}
		echo PHP_TAB.'"end": "ok"'.PHP_EOL.'}';
	}
}

/*
виды запросов:
SELECT		получить таблицу server_transact, получить одну запись из любой таблицы


*/
?>