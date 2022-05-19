<?php
require_once './config.php';
$userId  = $_GET['user_id'];
$fieldID  = $_GET['field_id'];
$query = "SELECT user_images.* from user_images 
inner join user_field on user_images.uf_id = user_field.id 
where user_field.user_id = $userId and user_field.field_id = $fieldID";
$qResult = mysqli_query($dbConnection, $query);

$results = array();
while ($row = mysqli_fetch_array($qResult)) {
    array_push($results, [
        'id' => $row['id'],
        'uf_id' => $row['uf_id'],
        'img_url' => $row['img_url'],
        'dsc' => $row['dsc'],
    ]);
}
echo json_encode($results);
