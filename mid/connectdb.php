<?php
    include('encrypt.php');
    $config = parse_ini_file('config.txt');
    $converter = new Encryption;

    $dbuser = $converter->decode($config['db_user']); 
    $dbpass = $converter->decode($config['db_password']);    

    $con=mysql_connect($config['db_host'],$dbuser,$dbpass);
    mysql_select_db($config['db_name'],$con) or die ("Cannot connect the Database");
    mysql_query("SET NAMES 'utf8'",$con);
?>
