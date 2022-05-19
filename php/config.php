<?php

$HOST = '127.0.0.1';
$USERNAME = 'root';
$PASSWORD = '';
$DB = 'photograph';
$dbConnection = mysqli_connect($HOST, $USERNAME, $PASSWORD, $DB) or die(json_encode([
        'code' => 401,
        'msg' => 'mysql connection error'
    ]));
