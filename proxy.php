<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$number = isset($_GET['number']) ? trim($_GET['number']) : '';
if (!$number) { echo json_encode(["error"=>"missing number"]); exit; }

$api_url = "https://api.uspeoplesearch.net/tcpa/v1?x=" . urlencode($number);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 20);
$response = curl_exec($ch);
curl_close($ch);

echo $response ? $response : json_encode(["error"=>"no response"]);
