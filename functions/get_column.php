<?php
	include_once("connect.php");
	is_in();
	if(isset($_GET['db']) && isset($_GET['table'])){
		$data = array();
		$con=connecti($_GET['db']);		
		$query = "SHOW COLUMNS FROM ".$_GET['table'];
		$result=mysqli_query($con,$query);
		$temp = array();
		$i = 0;
		while ($row=mysqli_fetch_array($result)){
			$temp[$i++] = $row;
		}
		$data[0] = $temp;
		$temp = array();
		$i=0;
		$query = "SELECT * FROM ".$_GET['table'];
		$result=mysqli_query($con,$query);
		while ($row=mysqli_fetch_array($result)){
			$temp[$i++] = $row;
		}
		$data[1] = $temp;
		echo json_encode($data);
		exit;
	}
?>