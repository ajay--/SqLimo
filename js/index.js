function get_table_list(db){
	$.get( "functions/get_table.php?db="+db, function(data) {
	  data = $.parseJSON(data);
	  //alert(db);
	});
}