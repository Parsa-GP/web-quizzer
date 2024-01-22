<?php
    echo json_encode(array_keys(json_decode(file_get_contents("tests.json"), true)));
?>
