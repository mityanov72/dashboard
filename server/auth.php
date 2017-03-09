<?php
defined('_EXEC') or die('Restricted access');
include_once '/const.php';


if(isset($_GET['SESSION'])) {
	$session = htmlspecialchars($_GET['SESSION']);
	$query_sring = "DELETE * FROM session WHERE last_expir > NOW()";
	mysqli_query($_GLOBAL['DB_CONNECTION'], $query_sring);
	$query_sring = "SELECT *, session.GUID AS session_GUID, session.user_GUID AS user_GUID, users.level AS user_level FROM session WHERE session.GUID = '".$session."'";
	if($result = mysqli_query($_GLOBAL['DB_CONNECTION'], $query_sring)) {
		if($result->num_rows == 1) {
			$row = mysqli_fetch_assoc($result);
			$_GLOBAL['ACCESS_LEVEL'] = $row['user_level'];
			$query_sring = "UPDATE session SET last_expir = NOW() + INTERVAL 10 DAY, WHERE GUID = '".$session."');";
			mysqli_query($_GLOBAL['DB_CONNECTION'], $query_sring);
		}
	}
}

?>