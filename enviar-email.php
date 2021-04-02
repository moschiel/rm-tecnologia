<?php

$nome = addslashes($_POST['name']);
$email = addslashes($_POST['email']);
$cell = addslashes($_POST['cell']);
$message  = addslashes($_POST['message']);

require("/home2/terate88/public_html/php/PHPMailer/src/PHPMailer.php");
require("/home2/terate88/public_html/php//PHPMailer/src/SMTP.php");
$mail = new PHPMailer\PHPMailer\PHPMailer();

$mail->IsSMTP(); // enable SMTP


// $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
//$mail->Debugoutput = 'html';

$mail->SMTPAuth = true; // authentication enabled
$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
$mail->Host = "ns952.hostgator.com.br";
$mail->Port = 465; // or 587
$mail->IsHTML(true);
$mail->Username = "contato@teratech.com.br";

$myfile = fopen("./pass.txt", "r") or die("Unable to open file!");
$mail->Password = fgets($myfile);
fclose($myfile);
 
$mail->SetFrom($email, $nome);
$mail->Subject = "Contato do Formulario";
$mail->Body = "telefone: " . $cell ."\n\nmensagem: " . $message;
$mail->AddAddress("contato@teratech.com.br");


if(!$mail->Send()) {
   echo "Mailer Error: " . $mail->ErrorInfo;
} else {
   echo "Mensagem enviada com sucesso";
}

?>