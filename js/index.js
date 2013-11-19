var tbl='',dbn='',new_row=false,page=0;
function get_table_list(db){  	
	page=1;
	$('.breadcrumb').html($('.breadcrumb li:first'))
	$('.breadcrumb').append('<li><a onclick=get_table_list(\''+db+'\')>'+db+'</a></li>');
	dbn = db;
	if($('#db_'+db+' ul').children().length == 0){		
		$.get( "functions/get_table.php?db="+db, function(data) {
		  	data = $.parseJSON(data);
		  	i=data.length;
	  		while(i--){
	  			$('#db_'+db+' ul').append('<li><a onclick=table_onclick("'+ db +'","'+ data[i] +'")>'+ data[i] +'</a></li>');				
			}		   
			k();
		});
	}
	else
		$('#db_'+db).collapse('toggle');
	k();
	function k(){
		temp = $('#db_'+db+' ul li a');
		$('#table-main').text('');
		temptxt = '<table class="table table-hover"><tr><th width="30px">#<th>Table Name</th><th>Options</th></tr>';
		for(i=0;i<temp.length;i++){
			temptxt += '<tr><td>'+(i+1)+'</td><td onclick=table_onclick("'+ db +'","'+ $(temp[i]).text() +'")>'+$(temp[i]).text()+'</td><td><a onclick=drop_tbl(\''+$(temp[i]).text()+'\')>Drop</a></td></tr>';
		}
		$('#table-main').append(temptxt+'</table>');
		$('#new_btn').attr("value","+ New Table");
	}
}

function table_onclick(dbname,tablename){
	$('.breadcrumb').html($('.breadcrumb li:first'))
	$('.breadcrumb').append('<li><a onclick=get_table_list(\''+dbname+'\')>'+dbname+'</a></li>');
	$('.breadcrumb').append('<li><a onclick=table_onclick(\''+dbname+'\',\''+tablename+'\')>'+tablename+'</a></li>');
	//alert(dbname+' '+tablename);
	$('#new_btn').attr("value","+ New Record")
	page=2;
	tbl = tablename;
	dbn = dbname;
	var str,col_count;
	$.get( "functions/get_column.php?db="+dbname+"&table="+tablename, function(data) {
		  str = '<table id="tt" class="easyui-datagrid" ><thead><tr>';
		  data = $.parseJSON(data);		  
		  for(i=0;i<data[0].length;i++){
		  	str=str.concat('<th data-options="editor:\'text\'" field="'+data[0][i][0]+'" >'+data[0][i][0]+'</th>');		  	
		  }
		  col_count = i;
		  str=str.concat('<th field="edit">Edit</th></tr></thead><tbody>');
		  for(i=0;i<data[1].length;i++){
		  	str=str.concat('<tr>');
		  	for(j=0;j<col_count;j++){
		  		str=str.concat('<td>'+data[1][i][j]+'</td>');		  	
	  		}
	   		str=str.concat('<td class="edit_label"><span class="elabel"><a href="#" onclick="editrow(this)">Edit</a><a href="#" onclick="deleterow(this)">Delete</a></span></td></tr>');
		  }
		  str=str.concat('</tbody></table>');
		  
		  $('#table-main').text('');
		  $('#table-main').append(str);
		  $('#tt').datagrid({
		  	singleSelect:true,	
			//fitColumns:true,		
			onBeforeEdit:function(index,row){
				row.old = jQuery.extend({}, row);;
	            row.editing = true;
	            updateActions(index,row);				
	        },
	        onAfterEdit:function(index,row){
	            row.editing = false;
				update_edit(row);
	            updateActions(index,row);
	        },
	        onCancelEdit:function(index,row){
	            row.editing= false;
	            updateActions(index,row);
	        },		
			  
		  });
		});
}

function updateActions(index,row){
	if(!row.editing){
		row.edit = '<span class="elabel"><a href="#" onclick="editrow(this)">Edit</a><a href="#" onclick="deleterow(this)">Delete</a></span>'
	}
	else{
		row.edit = '<span class="elabel"><a href="#" onclick="saverow(this)">Save</a><a href="#" onclick="cancelrow(this)">Cancel</a></span>'
	}
    $('#tt').datagrid('updateRow',{
        index: index,
        row:{}
    });	
}

function getRowIndex(target){
    var tr = $(target).closest('tr.datagrid-row');
    return parseInt(tr.attr('datagrid-row-index'));
}

function editrow(target){
    $('#tt').datagrid('beginEdit', getRowIndex(target));
}

function deleterow(target){
    $.messager.confirm('Confirm','Are you sure?',function(r){
        if (r){
			delete_row(target);
            $('#tt').datagrid('deleteRow', getRowIndex(target));
        }
    });
}
function saverow(target){
    $('#tt').datagrid('endEdit', getRowIndex(target));
}
function cancelrow(target){
    $('#tt').datagrid('cancelEdit', getRowIndex(target));
	if(new_row)
		table_onclick(dbn,tbl);
}

function delete_row(target){	
	field = $($('td',$('.datagrid-row')[getRowIndex(target)])[0]).attr('field');
	key = $($('td',$('.datagrid-row')[getRowIndex(target)])[0]).text();
	query = 'DELETE FROM '+tbl+' WHERE '+field+" = '"+key+"';";
	do_query(query,'Record Deleted');
}

function do_query(query,msg){
	//alert(query)
	$.get( "functions/update.php", {db:dbn , table:tbl ,query:query} , function(data) {
			if(!data){
				alert(msg);
				if(page == 0)
					location.reload()
				else if(page == 1){
					$('#myModal').modal('hide');
					$('#db_'+dbn+' ul').html('');
					get_table_list(dbn);
				}
			}
			else{
				alert("Error: "+data);
				if(page == 2)
					table_onclick(dbn,tbl);				
			}
		});
}

function update_edit(row){
	//$($('.datagrid-header-row td')[0]).attr('field')
	col = $('.datagrid-header-row td');
	query = 'UPDATE '+tbl+' SET ';
	temp='INSERT into '+tbl+' VALUES(';
	for(i=0;i<col.length-1;i++){
		t = $(col[i]).attr('field');
		query+= t+" = '"+row[t]+"',";
		temp+="'"+row[t]+"',";
	}
	if(new_row){
		query = temp.substr(0,temp.length - 1);
		query+=');';
		new_row = false;
	}else{
		query=query.substr(0,query.length - 1);
		t = $(col[0]).attr('field');
		query+= ' WHERE '+t+' = \''+row.old[t]+'\';';
	}
	do_query(query,'Record Inserted');
}

function insert_new(){
	if(page==2)
		insert_row();
	else if(page == 1){
		$('#myModal').modal({
  			remote:'new_table.html'
		});
	}
	else
		$.messager.prompt('New Database', 'Enter database name ', function(r){
			if (r){
				do_query('CREATE DATABASE '+r+';','Database Created');
				//location.reload();
			}
		});
}

function insert_row(){
	new_row = true;
	index = 0;
	$('#tt').datagrid('insertRow', {
				index: index,
				row:{}
			});	
	$('#tt').datagrid('selectRow',index);
	$('#tt').datagrid('beginEdit',index);

}

function get_db_table(){
	temp = $('.db');
	$('#table-main').text('');
	temptxt = '<table class="table table-hover"><tr><th width="30px">#<th>Database Name</th><th>Options</th></tr>';
	for(i=0;i<temp.length;i++){
		temptxt += '<tr ><td>'+(i+1)+'</td><td onclick=get_table_list("'+ $(temp[i]).text() +'")>'+$(temp[i]).text()+'</td><td><a onclick=drop_db(\''+$(temp[i]).text()+'\')>Drop</a></td></tr>';
	}
	$('#table-main').append(temptxt+'</table>');
	$('#new_btn').attr("value","+ New Database");
}

function drop_db(dn){
	$.messager.confirm('Confirm','Are you sure?',function(r){
        if (r){
        	query = "DROP DATABASE "+dn
			do_query(query,"Database Dropped")
        }
    });
}

function drop_tbl(dn){
	$.messager.confirm('Confirm','Are you sure?',function(r){
        if (r){
        	query = "DROP TABLE "+dn
			do_query(query,"Table Dropped")
        }
    });
}

function new_table(){
	query = "CREATE TABLE "+$('.tbl_name').val()+' (';
	pk = ' ,PRIMARY KEY ( '
	uk = ' ,UNIQUE KEY ( '
	for(i=0;i< $('.col_name').length;i++){
		query += $($('.col_name')[i]).val() + ' '+$($('.col_type')[i]).val() + ($($('.col_len')[i]).val() ? '('+$($('.col_len')[i]).val()+')' : '') +' '+ ($($('.col_null')[i]).is(':checked') ? 'NOT NULL ' : '') + ($($('.col_dfl')[i]).val() ? 'DEFAULT \''+$($('.col_dfl')[i]).val()+'\'' : '') + ' ,' ;
		if($($('input:radio[name=col_key]:checked')[i]).val() == 'primary')
			pk += $($('.col_name')[i]).val()+','
		else if($($('input:radio[name=col_key]:checked')[i]).val() == 'unique')
			uk += $($('.col_name')[i]).val()+','
	}
	query=query.substr(0,query.length - 1);
	if(pk == ' ,PRIMARY KEY ( ')
		pk = ''
	else
		pk =  pk.substr(0,pk.length - 1)+')'; 
	if(uk == ' ,UNIQUE KEY ( ')
		uk = ''
	else
		uk =  uk.substr(0,uk.length - 1)+')';
	query += pk+' '+uk+' )';
	do_query(query,"Table Created")
}
