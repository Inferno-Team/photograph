<?php
include_once './config.php';
header('Content-Type: application/json; charset=utf-8');
$email = $_POST['email'];
$password = $_POST['password'];
$phone = $_POST['phone'];
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$query = "insert into user ( `email`, `password`) VALUES ('" . $email . "' , '" . $hashedPassword . "')";
if ($dbConnection->query($query)) {
    $userId = $dbConnection->insert_id;
    //create user contact
    $query = "INSERT into user_contact (`user_id` , `phone_number`) values ($userId,$phone);";
    $dbConnection->query($query);
    //create user feld connection

    $query = "INSERT into user_field (`user_id`,`field_id`) VALUES 
    ($userId,1),($userId,2),($userId,3),($userId,4),($userId,5);";
    $dbConnection->query($query);
    echo json_encode([
        'code' => 200,
        'token' => $userId,
        'msg' => 'user created successfully'
    ]);
} else {
    echo json_encode([
        'code' => 300,
        'token' => '',
        'msg' => 'cant create this user now'
    ]);
}
