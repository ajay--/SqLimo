<?php
	include_once("connect.php");
	is_in();	
	$con=connecti();
	$query = "select schema_name from information_schema.schemata order by schema_name;";
	$result=mysqli_query($con,$query);
	while ($row=mysqli_fetch_array($result)){		
		echo '<li><a class="db" data-toggle="collapse" data-target="#db_'.$row[0].'">'.$row[0].'</a></li>';
		echo '<div id="db_'.$row[0].'" class="bs-sidebar hidden-print collapse table-list" role="complementary"><ul class="nav bs-sidenav"></ul></div>'  ;
		//<li><a>HA HA</a></li>
	}
?>