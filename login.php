<?php
	error_reporting(E_ERROR);
	session_start();
	if(isset($_SESSION['username'])){
		header("Location: index.php");
		exit();
	}	
	
?>
<html>
	<script src="js/jquery-1.10.1.min.js"></script>
	<link rel="stylesheet" href="css/login.css" type="text/css">
	<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css">
	<head><title>Login</title></head>
	<body>
		<div class="container">
			<form id="login_form" align="center">
				<input class="form-control" type="text" name="username" required placeholder="Username"/>
				<input class="form-control" type="password" name="password" required placeholder="Password"/><br>
				<span id="error" >Username or Password Error</span>
				<input class="btn btn-primary" id="button" type="submit" text="Log In"/>
			</form>
		</div>
	</body>
	
	
	
	
	<script>
		$("#login_form input")[0].focus();
		$("#login_form").submit(function(){
			$.post("./login_b.php", $('#login_form').serialize(),
				function(data){
					if(data == 0){
						$("#error").show();
					}
					else
						document.location = "index.php";
			});
			return false;
		});
			
	</script>
</html>