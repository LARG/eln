<?php

$file_list = array();

if (isset($_GET['path'])) {
  $path = $_GET['path'];
  $files = scandir($path);
  foreach($files as $file) {
    $tmp = $path . "/" . $file;
    array_push($file_list, $tmp);
  }
}

echo json_encode($file_list);