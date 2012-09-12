var t=1,defaultPage=3;
var f_getOneLine = function(json){
	var str='',
		url1 = json['formResourceName']+'?taskId='+json['id']
		,url2 = 'view?taskId='+json['executionId']
		,fields=["id","activityName","createTime","assignee"]
		,x=0;
	    str+='<tr r='+t+'>';
	    for (j in fields){
			var f=fields[j];
			str+='<td r='+t+' c='+x+'>'+json[fields[j]]+'</td>';
			x++;
	    }
	str+='<td r='+t+' c=4><a href='+url1+' class="task_type">'+json['name']+'</a></td>';
	str+='<td r='+t+' c=5><a href='+url2+' class="task_checkPic">查看流程图</a></td></tr>';
	return str;
},
f_getTable = function(data){
	var finalhtml=''
	,oneline=''
	,i;
	for(i in data['results']){
		oneline = f_getOneLine(data['results'][i]);
		finalhtml+=oneline;
		t++;
			}
		$('#untask_tbody').html(finalhtml);
		t=1;
},
add = function(event){//添加弹出框
	var $this = $(this),
	btn = $this.attr('class').split('_')[1];
	btnName = btn+'AddIframe',
	url = $this.attr('href');
	event.preventDefault();
	event.stopPropagation();
	$('#'+btnName).children().attr('src',url);
	$('#'+btnName).dialog('open');
}

$(document).ready(
	function(){
		$task1 = $('#tab_task1'),
		$task2 = $('#tab_task2'),
		$divIframe = $('.divIframe'),
		$task1_text = $('#task1_text'),
		$task2_text = $('#task2_text');
		
		$divIframe.dialog({
			    show: null,
			    bgiframe: false,
			    autoOpen: false,
			    draggable: true,
			    resizable: true,
			    modal: true,
			    width: 700,
			    height: 500
			});
		
		$task1.click(function(){
			$task2.children('img').attr('src','themes/default/images/number/tab_s_select.png');
			$task1.children('img').attr('src','themes/default/images/number/tab_400.png');
			$task2_text.hide();
			$task1_text.show();
			$.getJSON("http://127.0.0.1/EnterpriseManager/index.action",f_getTable);
		});
		$task2.click(function(){
			$task1.children('img').attr('src','themes/default/images/number/tab_400_select.png');
			$task2.children('img').attr('src','themes/default/images/number/tab_s.png');
			$task1_text.hide();
			$task2_text.show();
		});
		$('.task_checkPic').live('click',add);
		$('.task_taskType').live('click',add);
	}
);