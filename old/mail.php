<?php

$to = 'test@gmail.com';

 

if ( !empty( $_FILES['file']['tmp_name'] ) and $_FILES['file']['error'] == 0 ) {
    $filepath = $_FILES['file']['tmp_name'];
    $filename = $_FILES['file']['name'];
} else {
    $filepath = '';
    $filename = '';
}
 

  foreach ( $_POST as $key => $value ) {
	if (($value != "") && ($key != "project_name") && ($key != "form_subject")  && ($key != "sendMail")) {
		$customkey = $key;
		if ($key == 'name') {
			$customkey = "Имя:";
		} elseif ($key == 'phone'){
			$customkey = 'Телефон:';
		} elseif ($key == 'email'){
			$customkey = 'E-mail:';
		} 


		$body .= "$customkey \r\n".$value."\r\n\r\n";
	}
}

send_mail($to, $body, $email, $filepath, $filename);


// Вспомогательная функция для отправки почтового сообщения с вложением
function send_mail($to, $body, $email, $filepath, $filename)
{
  $subject = 'Сообщение с сайта';
  $boundary = "--".md5(uniqid(time())); // генерируем разделитель
  $headers = "From: ".$email."\r\n";   
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .="Content-Type: multipart/mixed; boundary=\"".$boundary."\"\r\n";
  $multipart = "--".$boundary."\r\n";
  $multipart .= "Content-type: text/plain; charset=\"utf-8\"\r\n";
  $multipart .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";

  $body = $body."\r\n\r\n";
 
  $multipart .= $body;
 
  $file = '';
  if ( !empty( $filepath ) ) {
    $fp = fopen($filepath, "r");
    if ( $fp ) {
      $content = fread($fp, filesize($filepath));
      fclose($fp);
      $file .= "--".$boundary."\r\n";
      $file .= "Content-Type: application/octet-stream\r\n";
      $file .= "Content-Transfer-Encoding: base64\r\n";
      $file .= "Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n";
      $file .= chunk_split(base64_encode($content))."\r\n";
    }
  }
  $multipart .= $file."--".$boundary."--\r\n";
  mail($to, $subject, $multipart, $headers);
}
?>