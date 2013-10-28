<?php
    error_reporting(E_ERROR);
	session_start();
	function connect($u,$p){
		if($u == NULL || $p == NULL)
			return 0;		
		$res = mysqli_connect("localhost",$u,$p);		
		return $res;
	}
	function connecti(){   	
		if(func_num_args() == 1)		
			$res = mysqli_connect("localhost",$_SESSION['username'],$_SESSION['password'],func_get_arg(0));		
		else
			$res = mysqli_connect("localhost",$_SESSION['username'],$_SESSION['password']);		
		return $res;
	}
	function is_in(){
		if(!isset($_SESSION['username'])){
		header("Location: http://".$_SERVER['HTTP_HOST']."sqlimo/login.php");
		exit();
		}
	}	
?>