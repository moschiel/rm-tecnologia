<?php

$nome = addslashes($_POST['name']);
$email = addslashes($_POST['email']);
$message  = addslashes($_POST['message']);

require("/home1/rmsoft57/public_html/php/PHPMailer/src/PHPMailer.php");
require("/home1/rmsoft57/public_html/php//PHPMailer/src/SMTP.php");
$mail = new PHPMailer\PHPMailer\PHPMailer();

$mail->IsSMTP(); // enable SMTP


//$mail->SMTPDebug = 2;
//$mail->Debugoutput = 'html';

// $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
$mail->SMTPAuth = true; // authentication enabled
$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
$mail->Host = "br118.hostgator.com.br";
$mail->Port = 465; // or 587
$mail->IsHTML(true);
$mail->Username = "contato@rmsoftwarehouse.com";
$mail->Password = "wk15nj8dsp";
 
$mail->SetFrom($email, $nome);
$mail->Subject = "Assunto da mensagem";
$mail->Body = $message;
$mail->AddAddress("contato@rmsoftwarehouse.com");


if(!$mail->Send()) {
   echo "Mailer Error: " . $mail->ErrorInfo;
} else {
   echo "Mensagem enviada com sucesso";
}

?>