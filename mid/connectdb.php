<?php
    $hostname="localhost";
    $username="rocco";
    $password="M1dr34lm";
    $db_name="rocco_auths";
    $con=mysql_connect($hostname,$username,$password);
    mysql_select_db($db_name,$con) or die ("Cannot connect the Database");
    mysql_query("SET NAMES 'utf8'",$con);

?>
