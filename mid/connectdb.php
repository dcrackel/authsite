<?php
    include('properties.php');

    $con=mysql_connect($dbhost,$dbuser,$dbpass);
    mysql_select_db($dbname,$con) or die ("Cannot connect the Database");
    mysql_query("SET NAMES 'utf8'",$con);
?>
