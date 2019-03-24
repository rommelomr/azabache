<?php 

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	//Load Composer's autoloader
	require 'vendor/autoload.php';
	require 'constantes.php';
    
	if( (isset($_POST['nombre'])) 
		&& ($_POST['nombre']!='') 
		&& (isset($_POST['correo'])) 
		&& ($_POST['correo']!='') 
		&& (isset($_POST['mensaje'])) 
		&& ($_POST['mensaje']!='')
	){	

		$mail = new PHPMailer();
		$mail->isSMTP();
		$mail->Host='smtp.gmail.com';
		$mail->SMTPAuth = true;
		$mail->Username = 'azabache.mail@gmail.com';
		$mail->Password = PASS;
		$mail->SMTPSecure = 'tls';
		$mail->Port = 25;


		$mail->setFrom('azabache.mail@gmail.com');
		$mail->addAddress('rommelmontoya97@gmail.com');
		$mail->Subject='Contacto via pagina web';
		$mail->Body=$_POST['nombre'].' ha escrito: '.$_POST['mensaje'].'. Email de contacto: '.$_POST['correo'];

		$mail->send();
	}
	header('Location:'.$_POST['pag']);


?>