<?php 
    $dsn = getenv('MYSQL_DSN');
    $user = getenv('MYSQL_USER');
    $password = getenv('MYSQL_PASSWORD');
    if (!isset($dsn, $user)|| false === $password) {
        throw new Exception('set env variables');
    }
    $db = new PDO($dsn, $user, $password);
    $statement = $db->prepare("select message from demo");
    $statement->execute()
    $all = $statement->fetchAll();

    foreach ($all as $data) {
        echo $data["message"]."<br>";
    }
?>