<html>
<body>
<script type="text/javascript" src="js/jquery-1.10.1.min.js"></script>
<script type="text/javascript" src="js/index.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css">
<link rel="stylesheet" href="css/index.css" type="text/css">
<link rel="stylesheet" href="css/easyui.css" type="text/css">

<nav class="navbar navbar-default" role="navigation">
<p class="navbar-brand">GUI</p>
	<p class="navbar-text pull-right"><b>
	<?php 
		session_start();
		echo $_SESSION['username']; 
	?>
	</b>&nbsp;&nbsp;
	<a href="logout.php" class="navbar-link">Log Out&nbsp;</a></p>
</nav>
<div id="main">
	<div id="left" class="easyui-resizable ">
		<div class="bs-sidebar hidden-print " role="complementary">
            <ul class="nav bs-sidenav">
                <?php include_once("functions/get_db.php");?>
			</ul>
          </div>
	</div>
</div>
<script>
	$(".db").click(function (){
	   get_table_list($(this).text());
	});
</script>
</body>
</html>