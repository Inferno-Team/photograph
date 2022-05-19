<?php
require_once './config.php';
function image_upload()
{
    if (isset($_FILES['file']['name'])) {
        // file name
        $filename = $_FILES['file']['name'];

        // Location
        $location = "../images/";


        // file extension
        $file_extension = pathinfo($location . $filename, PATHINFO_EXTENSION);
        $file_extension = strtolower($file_extension);

        // Valid extensions
        $valid_ext = array("jpg", "png", "jpeg");

        $response = "";
        if (in_array($file_extension, $valid_ext)) {
            // Upload file
            $time = microtime(true) * 1000;
            $v = "$location$time.$file_extension";
            if (move_uploaded_file($_FILES['file']['tmp_name'], $v)) {
                $response = "/photograph/images/$time.$file_extension";
            }
        }

        return $response;
    }
}

$img_url = image_upload();
$fieldId = $_POST['fieldId'];
$userId = $_POST['userId'];
$desc = $_POST['desc'];
$ufId = -1;
// geting user field id from user_id & field_id
$query = "SELECT id from user_field where user_id = $userId and field_id = $fieldId";
$qResult = mysqli_query($dbConnection, $query);
if ($row = mysqli_fetch_array($qResult)) {
    $ufId = $row['id'];
} else {
    // user field not found  [ not possible ]
}
if ($ufId == -1) die("user field not found");
$query = "INSERT into user_images (`uf_id` ,`img_url` , `dsc`) values ($ufId , '$img_url','$desc') ; ";
if ($dbConnection->query($query)) {
    echo json_encode([
        'msg' => 'uploaded',
        'image' => [
            'img_url' => $img_url,
            'id' => $dbConnection->insert_id,
            'dsc' => $desc
        ]
    ]);
}
