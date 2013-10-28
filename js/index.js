function get_table_list(db){
	if($('#db_'+db+' ul').children().length == 0){
		$.get( "functions/get_table.php?db="+db, function(data) {
		  data = $.parseJSON(data);
		  i=data.length;
		  while(i--)
		  	$('#db_'+db+' ul').append('<li><a>'+ data[i] +'</a></li>');
		});
	}
	else
		$('#db_'+db).collapse('toggle');
}