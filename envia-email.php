<?php
$nome = addslashes($_POST['name']);
$email = addslashes($_POST['email']);
$message  = addslashes($_POST['message']);

require("/home/usuario/diretoriodeinstalação/PHPMailer-master/src/PHPMailer.php");
require("/home/usuario/diretoriodeinstalação/PHPMailer-master/src/SMTP.php");

$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->IsSMTP(); // enable SMTP

//$mail->SMTPDebug = 2;
//$mail->Debugoutput = 'html';

$mail->SMTPAuth = true; // authentication enabled
$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
$mail->Host = "dominio.hostgator.com.br";
$mail->Port = 465; // or 587
$mail->IsHTML(true);
$mail->Username = "email@site.com";
$mail->Password = "senha do email@site.com";
 
$mail->SetFrom($email, $nome);
$mail->Subject = "Assunto da mensagem";
$mail->Body = $message;
$mail->AddAddress($mail->Username);


    if(!$mail->Send()) {
   echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
       echo "Mensagem enviada com sucesso";
    }
 ?>