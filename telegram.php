<?php

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];

$token = ""; // http://joxi.ru/v295MB7tzM6g72 - при создании бота в BotFather дается токен
$chat_id = ""; /* https://api.telegram.org/bot2117022617:AAGiEjf92HROsOrrQpol2eoikgRD4DBy-T4/getUpdates, где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее. http://joxi.ru/p27DqBgcWqBVXA - где потом взять chat_id. Сначала бота нужно добавить в группу и отправить сообщение. id у бота начинается с минуса*/

$arr = array(
    'Имя пользователя: ' => $name,
    'Email' => $email,
    'Номер телефона: ' => $phone,
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
    echo "Success";
} else {
    echo "Error";
}