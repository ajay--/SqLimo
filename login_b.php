<?php
	require_once("functions/connect.php");
	if(isset($_SESSION['username'])){
		header("Location: index.php");
		exit();
	}
	if(isset($_POST['username']) && isset($_POST['password'])){
		$a =  connect($_POST['username'],$_POST['password']);
		if($a){		   
			$_SESSION['username']=$_POST['username'];
			$_SESSION['password']=$_POST['password'];
			echo 1;
		}		
		else{
			echo 0;
		}
	}
	else
		echo 0;
?>