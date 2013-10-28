<?php
	include_once("connect.php");
	is_in();
	if(isset($_GET['db']) && isset($_GET['table'])){
		$con=connecti($_GET['db']);		
		$query = "SHOW COLUMNS FROM ".$_GET['table'];
		$result=mysqli_query($con,$query);
		while ($row=mysqli_fetch_array($result)){		
			echo '<p>'.$row[0].'</p><br>';
		}
	}
?>