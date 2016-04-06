<?php

$arr = array_filter(glob('*/*/*'), 'is_dir');
$dates = array();
foreach($arr as $a) {
  // array_push($dates, basename($a));
  //array_push($dates, $a);
  $dates[$a] = basename($a);
}
echo json_encode($dates);