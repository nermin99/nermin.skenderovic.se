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
        <input type="text" name="input" autocomplete="off" placeholder="1337" autofocus><br>
        <input type="submit" value="Factorize"><br>
    </form>
    <hr>

    <?php
    if (isset($_POST["input"])) {
        $input = htmlspecialchars($_POST["input"]);
        $n = $input;
        $i = 2;
        $iterations = 0;

        echo $input;

        while ($i <= floor(sqrt($n))) {
            if ($n % $i == 0) { // if factor is divisible by the prime
                $primes[] = $i; // add the prime to array
                $n /= $i;       // get the next factor
            } else if ($i == 2) {  // increment until next prime is found
                $i++;
            } else { // if factor isn't even, increment by 2
                $i += 2;
            }
            $iterations++;
        }
		$primes[] = $n; // only necessary to check primes up to sqrt of factor, then factor itself is prime

        echo " = ";
        if($input < 2) exit($input);

        for ($j = 0; $j < count($primes); $j++) {
            echo "$primes[$j] ";
        }
        echo "<br><br>";
        echo "Iterations = $iterations <br>";
        echo "Square root of number ≈ " . round(sqrt($input), 2) . "<br>";
        if(count($primes) == 1) echo "<b>prime</b>";
    }
    ?>
</body>
</html>