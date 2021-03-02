<?php

$nome = utf8_encode($_POST['name']);
$email  = utf8_encode($_POST['email']);
$message  = utf8_encode($_POST['message']);

require 'php/PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;

$mail->SMTPDebug = SMTP::DEBUG_SERVER;

// server
$mail->isSMTP();
// // smtp
$mail->Password = 'senha do seu email usando em $mail->Username  ';


$mail->Host = 'smtp.gmail.com';
$mail->Port = '587';
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = 'true';
// fim server

// email que recebe a mensagem
$mail->Username = 'email@gmail.com';

//de
$mail->setFrom($email, $nome);

//para
$mail->addAddress($mail->Username); 





$mail->isHTML(true);
$mail->Subject = "Fale conosco";
$mail->Body=$message;

if($mail->send()){
	echo "Email enviado com sucesso!";
}
else{
	echo 'Falha ao enviar o email: ' . $mail->ErrorInfo;
}
