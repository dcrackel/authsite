<?php
    $hostname="localhost:3306";
    $username="marshaldbmidreal"; //marshaldbmidreal_authsite rocco_auths
    $password="Cando@123"; //Dr4g0nMidrealm! Dr4g0n
    $dbname="marshald_marshaldb"; //marshald_marshaldb rocco_auths

    $con=mysql_connect($hostname,$username,$password);
    mysql_select_db($dbname,$con) or die ("Cannot connect the Database");
    mysql_query("SET NAMES 'utf8'",$con);

?>
