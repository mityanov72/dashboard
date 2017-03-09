<?php
header('Access-Control-Allow-Origin: *');

define( '_EXEC', 1);
include_once '/const.php';
require_once '/connection.php';

function getLoginResult($num_rows, $query_result) {
	if($num_rows == 1) {
		$row = mysqli_fetch_assoc($query_result);
		echo '{'.PHP_EOL;
		echo PHP_TAB.'"result": "ok",'.PHP_EOL;
		echo PHP_TAB.'"error_code": 0,'.PHP_EOL;
		echo PHP_TAB.'"session_GUID": "'.$row['session_GUID'].'"'.PHP_EOL.'}';
	}
}

function issetPostEmpty($value) {
	if(isset($_POST[$value])) {
		return htmlspecialchars($_POST[$value]);
	}
	return '';
}

if(isset($_POST['SESSION'])) {
	$session = issetPostEmpty('SESSION');
	$client = issetPostEmpty('CLIENT');
	$mail = issetPostEmpty('MAIL');
	$hash = issetPostEmpty('HASH');
	$query_sring = "SELECT *, session.GUID AS session_GUID, session.user_GUID AS user_GUID FROM session WHERE session.GUID = '".$session."'";
	if($result = mysqli_query($_GLOBAL['DB_CONNECTION'], $query_sring)) {
		if($result->num_rows == 0) {
			$query_sring = "SELECT GUID FROM users WHERE mail = '".$mail."' AND hash = '".$hash."'";
			$result = mysqli_query($_GLOBAL['DB_CONNECTION'], $query_sring);
			if($result->num_rows != 1) {
				echo '{"result":"error", "error_code": -1}';
				exit;
			}
			$row = mysqli_fetch_assoc($result);
			$user_GUID = $row['GUID'];
			$session = getGUID();
			$query_sring = "INSERT INTO session (GUID, user_GUID, last_expir, client) VALUES ('".$session."', '".$user_GUID."', NOW() + INTERVAL 10 DAY, '".$client."');";
			mysqli_query($_GLOBAL['DB_CONNECTION'], $query_sring);
			$query_sring = "SELECT *, session.GUID AS session_GUID, session.user_GUID AS user_GUID FROM session WHERE session.GUID = '".$session."'";
			$result = mysqli_query($_GLOBAL['DB_CONNECTION'], $query_sring);
			getLoginResult($result->num_rows, $result);
		} else if($result->num_rows == 0) {
			getLoginResult($result->num_rows, $result);
		}
	}
} else {
	echo '{"result":"error", "error_code": -2}';
}
/*
{
	"result": "ok",
	"error_code": 0,
	"session_GUID": "9813216f-e001-11e6-83aa-0016364dcf75",
	"user_GUID": "0d2abe61-4777-b6d5-e9b0-169ce8340b18"
}

*/
?>