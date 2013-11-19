<?php
	include_once("connect.php");
	is_in();
	if(isset($_GET['db']) && isset($_GET['table']) && isset($_GET['query']) ){
		$con=connecti($_GET['db']);		
		$query = $_GET['query'];
		$result=mysqli_query($con,$query);
		echo mysqli_error($con);
	}
?>