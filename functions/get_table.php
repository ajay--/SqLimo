<?php
	include_once("connect.php");
	is_in();
	if(isset($_GET['db'])){
		$con=connecti($_GET['db']);		
		//$query = "SHOW TABLES ";
		$query = "SELECT table_name
					FROM information_schema.tables    
					WHERE table_schema='".$_GET['db']."'  
					ORDER BY table_name DESC;";
		$result=mysqli_query($con,$query);
		$t = array();
		while ($row=mysqli_fetch_array($result)){		
			array_push($t,$row[0]);
		}
		echo json_encode($t);
	}
?>