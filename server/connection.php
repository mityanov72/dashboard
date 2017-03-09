<?php
defined('_EXEC') or die('Restricted access');
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'web';

global $db_connection;
$db_connection = @mysqli_connect($db_host, $db_user, $db_pass, $db_name) 
	or die('DOC_ENGINE: Connection error ('.$db_connection->connect_errno.' '. $db_connection->connect_error.')');
if ($db_connection->connect_errno) {
	die('DOC_ENGINE: Connection error ('.$db_connection->connect_errno.' '. $db_connection->connect_error.')');
}
@mysqli_set_charset($db_connection, "utf8");
$_GLOBAL['DB_CONNECTION'] = $db_connection;
/*mysql_query("SET NAMES 'utf8'"); 
mysql_query("SET CHARACTER SET 'utf8'");
mysql_query("SET SESSION collation_connection = 'utf8_general_ci'");
mysql_query('SET NAMES utf8 COLLATE utf8_general_ci');*/

require_once '/auth.php';

?>