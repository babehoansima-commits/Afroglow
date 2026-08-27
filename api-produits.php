<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';

$stmt = $pdo->query('SELECT * FROM produits ORDER BY id');
$produits = $stmt->fetchAll();

echo json_encode($produits, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>