<?php
require_once './config.php';

$query = 'SELECT * from field';
$qResult = mysqli_query($dbConnection,$query);
$results = array();
while($row = mysqli_fetch_array($qResult)){
    array_push($results,[
        'name'=>$row['name'],
        'img'=>$row['img_url']
    ]);
}
echo json_encode($results);