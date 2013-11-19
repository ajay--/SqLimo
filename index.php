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
<p class="navbar-brand">sqLimo</p>
<p class="navbar-text pull-right"><b>
	<?php 
		session_start();
		echo $_SESSION['username']; 
	?>
	</b>&nbsp;&nbsp;
	<a href="logout.php" class="navbar-link">Log Out&nbsp;</a></p>
<div align="center">
	<ol class="breadcrumb">
	  <li><a href="./">Home</a></li>	  
	</ol>
</div>	
</nav>
<div id="main">
	<div id="left" class="easyui-resizable ">
		<div class="bs-sidebar hidden-print " role="complementary">
            <ul class="nav bs-sidenav">
                <?php include_once("functions/get_db.php");?>
			</ul>
          </div>
	</div>
	<div class="easyui-tabs" >	
        <div id="tab-data" title="Data" style="padding:10px">
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>
			<input class="btn btn-primary" id="new_btn" value="+ New Database" type="button" onclick="insert_new()"/>
            <div id="table-main"></div>
        </div>
        <div id="tab-struct" title="Structure" style="padding:10px">
            
        </div>       
    </div>
</div>
<script>
	$(".db").click(function (){
	   get_table_list($(this).text());
	});
	get_db_table();
</script>
</body>
</html>