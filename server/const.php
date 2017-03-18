<?php
defined('_EXEC') or die('Restricted access');

$_GLOBAL['ACCESS_LEVEL'] = 0;
/*
	0 - guest
	1 - customer
	2 - engeenear
	3 - chief
	4 - header
	5 - director
*/
define('SLASH', '/');
define('PHP_TAB', '	');
$_SERVER_PORT = '80';
$_SERVER_URL = $_SERVER['SERVER_NAME'].':'.$_SERVER_PORT;

$_GLOBAL['DB_NAME'] = 'web';
$_GLOBAL['DB_TABLE_PREFIX'] = '';
$_GLOBAL['DB_RECORD_LIMIT'] = 20;


function getGUID(){
    if (function_exists('com_create_guid')){
        return com_create_guid();
    }else{
        mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $hyphen = chr(45);// "-"
        $uuid = substr($charid, 0, 8).$hyphen
            .substr($charid, 8, 4).$hyphen
            .substr($charid,12, 4).$hyphen
            .substr($charid,16, 4).$hyphen
            .substr($charid,20,12);
        return $uuid;
    }
}

?>