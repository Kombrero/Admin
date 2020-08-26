<?php 
$oldFile = "../../" . $_POST["name"].".html";

echo $oldFile;

if(file_exists($oldFile)){
    unlink($oldFile);
}else{
    header("HTTP/1.0 400 Bad response");
}