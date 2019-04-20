<?php
    include('encrypt.php');
    $config = parse_ini_file('config.txt');
    $converter = new Encryption;

    $dbuser = $converter->decode($config['db_user']); 
    $dbpass = $converter->decode($config['db_password']);    
    $dbhost = $config['db_host'];
    $dbname = $config['db_name'];

    
?>