<?php

function display_text_from_dir($dirname, $ext) {
  $files = glob($dirname."*.".$ext);
  foreach($files as $file) {
    echo '<b>'.$file.'</b> ';
    // readfile("$file");
    $text = file_get_contents("$file");
    echo nl2br($text);
  }
}

function display_images_from_dir($dirname, $ext) {
  $images = glob($dirname."*.".$ext);
  foreach($images as $image) {
    echo '<a href="'.$image.'"/><img src="'.$image.'" width=250/></a>';
  }
}

// $projects = array_filter(glob('*'), 'is_dir');
// $dates = array_filter(glob('*/*/*'), 'is_dir');

$arr = array();
$projects = array_filter(glob('*'), 'is_dir');
foreach($projects as $project) {
  $arr[$project] = array();
  $sub = $project . "/*";
  $exps = array_filter(glob("$sub"), 'is_dir');
  foreach($exps as $exp) {
    $sub = $exp . "/*";
    $dates = array_filter(glob("$sub"), 'is_dir');
    $arr[$project][$exp] = $dates;
    // array_push($arr, $dates);
    // foreach($dates as $date) {
    //   array_push($arr, $date);
    // }
  }
}

echo json_encode($arr);
