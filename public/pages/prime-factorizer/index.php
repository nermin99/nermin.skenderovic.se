<!DOCTYPE html>
<html lang="en">

<head>
    <title>Prime Factorizer</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <form method="post">
        <label>Input</label><br>
        <input type="text" name="input" autocomplete="off" placeholder="210"><br>
        <input type="submit" value="Factorize"><br>
    </form>
    <hr>
</body>

</html>

<?php
    if (isset($_POST["input"])) {
        $input = $_POST["input"];
        $number = $input;

        echo $input;

        $i = 2;
        $iterations = 0;

        while ($i <= $number) {
            // Kollar om talet är jämnt delbart med primtalen. Med början på det minsta primtalet
            if ($number % $i == 0) {
                $number /= $i;
                $primes[] = $i; // Lagrar primtalet som gick att dela med
            }
            // Endast primtal upp till roten ur talet behöver kollas
            else if ($i >= sqrt($input)) {
                $primes[] = $number;
                break;
            }
            // Är inte första primtalen 2, testas 3
            else if ($i == 2){
                $i++;
            }
            // Funkar inte det testas nästa ojämna tal (jämna tal går att dela med 2).
            else {
                $i += 2;
            }
            $iterations++;
        }

        echo " = ";
        if($input < 2) exit($input);

        for ($j=0; $j < count($primes) ; $j++) {
            echo "$primes[$j] ";
        }
        echo "<br><br>";
        echo "Iterations = $iterations <br>";
        echo "Square root of number ≈ " . round(sqrt($input), 2) . "<br>";
        if(count($primes) == 1) echo "<b>prime</b>";
    }
?>