<?php

$_POST = json_decode(file_get_contents('php://input'), true);

// $file = '../../' . $_POST['pageName'];
// $newHtml = $_POST['html'];

if ('../../' . $_POST['pageName'] && $_POST['html']) {
    file_put_contents('../../' . $_POST['pageName'], $_POST['html']);
} else {
    header("HTTP/1.0 400 Bad Request");
}