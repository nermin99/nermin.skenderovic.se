<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Primtal</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <form method="post">
            <label>Tal</label> <br>
            <input type="text" name="number" autocomplete="off" placeholder="100"> <br>
            <input type="submit" value="Skicka"> <br>
        </form>
        <br>
    </body>
</html>

<?php
    if (isset($_POST["number"])) {
        $tal = $_POST["number"];
        $number = $tal;

        if ($number >= 2) {
            $i = 2;
            $körningar = 0;

            while ($i <= $number) {
                // Kollar om talet är jämnt delbart med primtalen. Med början på det minsta primtalet
                if ($number%$i == 0) {
                    $number /= $i;
                    $array[] = $i; // Lagrar primtalet som gick att dela med
                }
                // Endast primtal upp till roten ur talet behöver kollas
                else if ($i >= sqrt($tal)) {
                    $array[] = $number;
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
                $körningar++;
            }

            echo "<br>Roten ur tal = " . sqrt($tal) . "<br>";
            echo "Körningar = $körningar <br>";

            echo "$tal = ";
            for ($j=0; $j < count($array) ; $j++) {
                echo "$array[$j] ";
            }
        }
    }
?>