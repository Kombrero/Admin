<?php 
$newFile = "../../" . $_POST["name"].".html";

if(file_exists($newFile)){
    header("HTTP/1.0 400 Bad response");
}else{
    fopen($newFile, "w");
}