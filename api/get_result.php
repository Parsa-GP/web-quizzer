<?php
    if (!isset($_GET["data"]) && !isset($_GET["testname"])) {
        exit("The \"data\" or \"testname\" parameter is not set.\nThe data is base64'd answers in form of a json array btw.");
    }
    $tests = json_decode(file_get_contents("tests.json"), true)[$_GET["testname"]];

    $answers = json_decode(base64_decode($_GET["data"]));
    $score = 0;
    $i=0;
    foreach ($answers as $answer) {
        $score += $tests[$i]["options"][$answers[$i]-1]["score"];
        $i+=1;
    }
    
    if ($score < 5) {
        $grade = "It's fucking terrible";
    } elseif ($score < 10) {
        $grade = "Terrible";
    } elseif ($score < 20) {
        $grade = "Normal";
    } elseif ($score > 20) {
        $grade = "Great";
    }
    echo $score;
?>
