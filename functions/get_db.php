<?php
	include_once("connect.php");
	is_in();	
	$con=connecti();
	$query = "SHOW DATABASES";
	$result=mysqli_query($con,$query);
	while ($row=mysqli_fetch_array($result)){		
		echo '<li><a class="db" data-toggle="collapse" data-target="#'.$row[0].'">'.$row[0].'</a></li>';
		echo '<div id="'.$row[0].'" class="bs-sidebar hidden-print collapse" role="complementary"><ul class="nav bs-sidenav"><li><a>HA HA</a></li></ul></div>'  ;		
	}
?>