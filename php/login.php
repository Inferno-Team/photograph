<?php
require_once './config.php';
header('Content-Type: application/json; charset=utf-8');
$email = $_POST['email'];
$password = $_POST['password'];

$query = "SELECT id,password from user where email like '$email'";
$qResult = mysqli_query($dbConnection, $query);

if ($row = mysqli_fetch_array($qResult)) {
    if (password_verify($password, $row['password']))
        echo json_encode(array(
            'msg' => 'login success',
            "token" => $row['id'],
            "code" => 200
        ));
    else {
        echo json_encode(array(
            'msg' => 'the provided data dont match our records !!',
            // 'msg' => password_hash($password,PASSWORD_DEFAULT),
            "token" => '',
            "code" => 404
        ));
    }
} else {
    echo json_encode(array(
        'msg' => "can't log in.",
        "token" => "",
        "code" => 401
    ));
}
exit;
