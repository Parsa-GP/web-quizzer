<?php
    if (!isset($_GET["testname"])) {
     exit("The \"testname\" parameter is not set.");
    }
    $tests = json_decode(file_get_contents("tests.json"), true);

    $questions = [];

    foreach ($tests[$_GET["testname"]] as $key => $value) {
        $q = [];
        $q["q"] = $value["question"];
        $options = [];
        foreach($value["options"] as $option) {
            $options[] = $option["text"];
        }
        $q["options"] = $options;
        $questions[] = $q;
    }
    echo json_encode($questions, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
?>
