var active_row = 0,t=1,defaultPage=1,f_currP=1,s_currP=1;
// td_edit = function(){//表格编辑
	// var	_this = $(this)
		// ,editable_row = _this.attr('r')
		// ,tdWidth = _this.css('width')
		// ,tdHeight = _this.css('height')
		// ,input = $('<input type="text" name="xxx" value="" style="border:none"/>');
	// if(editable_row==active_row){
			// input.val(_this.html());
			// _this.html('');
			// input.css({'width':tdWidth,'height':tdHeight})
			// _this.append(input);
			// input.focus();
	// }
// },
// td_blur = function(){//离开表格
	// var 	_this=$(this)
		// ,input = _this.children().val();
	// if(document.activeElement.type=='text'){
		
	// }else{
		// _this.html(input);
		// _this.children().remove();
	// }
// },
// activation = function(){//激活行
	// var _this = $(this)
	// active_row = _this.parent().attr('id').split('_')[1];
// },
row_del = function(url){
		var _this=$(this),
		del_row = _this.parent().attr('id').split('_')[1];
		num = $('td[r='+del_row+'][c=1]').html();
		$.getJSON(url+'?num='+num+'',function(msg){
			if(msg==1){
				alert("删除成功");
				$('tr[r='+del_row+']').remove();
			}else{
				alert("错误");
			}
			
		})
			
},
goPage = function(page,url){
		console.log(page)
	var $pg = $('.pg'),
		pageStr = '',
		currP = $('#tabs').data("currPage");
		console.log(currP)
		if(page<1) return;	
	$.getJSON(url+'?currPage='+currP+'&pageSize=1',function(data){
		var count = Math.ceil(data['total']/defaultPage);
		f_currP = data('currPage');
		f_getTable(data);
		if(page>count) {page = count};
			if(count>1&&count<6){
				for(i=0;i<count;i++){
					pageStr+='<span class="pg" p='+(i+1)+'>'+(i+1)+'</span>'
				}	
			}else{ 
				if(page<3){
				pageStr+='<span class="page_before" title="上一页"><<</span><span class="f_pg" p=1>1</span><span class="pg" p=2>2</span>';
				pageStr+='<span class="Ellipsis">...</span><span class="pg" p='+page+'>'+page+'</span><span class="page_next" title="下一页">>></span>';
				}else if((page>=3)&&(page<(count-3))){
					pageStr+='<span class="page_before" title="上一页"><<</span><span class="pg" p=1>1</span>';
					pageStr+='<span class="Ellipsis">...</span><span class="pg" p='+page+'>'+page+'</span><span class="pg" p='+(page+1)+'>'+(page+1)+'</span>'
					pageStr+='<span class="Ellipsis">...</span><span class="pg" p='+count+'>'+count+'</span><span class="page_next" title="下一页">>></span>'
				}else if(page=(count-3)){
					pageStr+='<span class="page_before" title="上一页"><<</span><span class="pg" p=1>1</span><span class="Ellipsis">...</span>';
					for(i=0;i<4;i++){
						pageStr+='<span class="pg" p='+(page+i)+'>'+(page+i)+'</span>'
					}
					pageStr+='<span class="page_next" title="下一页">>></span>'
				}else if(page>(count-3)){
					pageStr+='<span class="page_before" title="上一页"><<</span><span class="pg" p=1>1</span><span class="Ellipsis">...</span>';
					for(i=3;i>0;i--){
						pageStr+='<span class="pg" p='+(count-i)+'>'+(count-i)+''
					}
					pageStr+='<span class="page_next" title="下一页">>></span>'
				}
				pageStr+='<input type="text" class="page_skip" title="跳转到" /><input type="button" class="btn_skip" value="Go" />'
			}
			console.log(pageStr)
		$('#f_pages').html(pageStr);
		$pg.removeClass('page_select');
		$('.pg[p='+page+']').addClass('page_select');
		}
	)
},
f_getOneLine = function(json){//400号码插入每个单元格
	
	var str=''
		,fields=["id","itemnumber","itemtype","itemstatus","classification","createcode","createtime","numreleasedays","smallNum","area"]
	    //,fields=['a','b','c','d','e','f','g','h','i','j']
		,x=0
	    ,op='<div class="ops" id="ftd_'+t+'"><a href="#" class="f_delt" onfocus=this.blur()><img src="themes/default/images/number/delt.png" /></a><a href="#" class="f_check" onfocus=this.blur()><img src="themes/default/images/number/check.png" /></a></div>'
	    str+='<tr r='+t+'><td r='+t+' c='+0+'><input type="checkbox" class="check f_checkUnit"/></td>';
	    for (j in fields){
			var f=fields[j];
			str+='<td r='+t+' c='+(x+1)+'>'+json[fields[j]]+'</td>';
			x++;
	    }
	str+='<td>'+op+'</td></tr>';
	return str;
},
f_getTable = function(data){//400号码插入整行
	var finalhtml=''
	,oneline=''
	,i
	,rs = JSON.parse(data['result']);
	for(i in rs){
		oneline = f_getOneLine(rs[i]);
		finalhtml+=oneline;
		t++;
			}
		$('#f_tbody').html(finalhtml)
		t=1;
},
s_getOneLine = function(json){//小号码插入每个单元格
	var str=''
		,fields=["itemnumber","itemstatus"]
		,x=0
		,op='<div class="ops" id="ftd_'+t+'"><a href="#" class="s_delt" onfocus=this.blur()><img src="themes/default/images/number/delt.png" /></a><a href="#" class="f_check" onfocus=this.blur()><img src="themes/default/images/number/check.png" /></a></div>'
		str+='<tr r='+t+'><td r='+t+' c='+0+'><input type="checkbox" class="check s_checkUnit"/></td>';
			for(j in fields){
				var f=fields[j];
				str+='<td r='+t+' c='+(x+1)+'>'+json[fields[j]]+'</td>';
				x++;
		}
	str+='<td>'+op+'</td></tr>';
	return str;
},
s_getTable = function(data){//小号码插入整行
	var finalhtml=''
	,oneline=''
	,i
	,rs = JSON.parse(data['result']);
	for(i in rs){
		oneline = s_getOneLine(rs[i]);
		finalhtml+=oneline;
		t++;
	}
	$('#s_tbody').html(finalhtml)
	t=1;
},
select_all = function(){//勾选所有复选框
	var $this = $(this)
		,selected = $this.attr('checked')
		,checks = $this.parents('table').children().find('.check');
		if(selected=='checked'){
			checks.attr('checked','checked');
		}else{
			checks.removeAttr('checked');
		}
},
add = function(event){//添加弹出框
	var $this = $(this),
	btn = $this.attr('id').split('_')[0];
	btnName = btn+'AddIframe';
	event.preventDefault();
	event.stopPropagation();
	$('#'+btnName).dialog('open');
},
check = function(event){
	var $this = $(this),
	check_row = $this.parent().attr('id').split('_')[1],
	num = $('td[r='+check_row+'][c=1]').html();
	$.getJSON("findCompanyInfoNumber.action?num="+num);
	event.preventDefault();
    event.stopPropagation();
	$('#checkFile').dialog('open');
}
btn_down = function(){//按下按钮更换图片
	var $this = $(this).children('img'),
		down_src = $this.parent().attr('id').split('_')[1]+'_down';
		$this.attr('src','themes/default/images/number/'+down_src+'.png');
},
btn_up = function(){//弹起按钮切换图片
	var $this = $(this).children('img'),
		up_src = $this.parent().attr('id').split('_')[1];
		$this.attr('src','themes/default/images/number/'+up_src+'.png')
},
selecting = function(){//下拉菜单的切换
	var $this = $(this),
		t = $this.find('option:selected').attr('p');
		$('.selecting').removeClass('selecting').hide();
		$('#'+t).show().addClass('selecting');
}
$(document).ready(
	function(){
		var $release_start = $('#u2_text')
			,$release_end = $('#u3_text')
			,$tab1 = $('#fNumber')
			,$tab2 = $('#sNumber')
			,$s_text = $('#s_text')
			,$f_text = $('#f_text')
			,$fAddIframe = $('#fAddIframe')
			,$sAddIframe = $('#sAddIframe')
			,$divIframe = $('.divIframe')
			,$all = $('.all')
			,$f_add = $('#f_add')
			,$s_add = $('#s_add')
			,$btn = $('.btn')
			,$f_padTail = $('#f_padTail')
			,$s_padTail = $('#s_padTail')
			,$f_delt = $('.f_delt')
			,$f_check = $('.f_check')
			,$s_delt = $('.s_delt')
			,$num_select = $('#num_select')
			,$checkUnit = $('.checkUnit')
			,$f_pageBefore = $('#f_pages').children('.page_before')
			,$f_pageNext = $('#f_pages').children('.page_next')
			,$s_pageBefore = $('#s_pages').children('.page_before')
			,$s_pageNext = $('#s_pages').children('.page_next')
			,$pageNext = $('page_next');
		
			$release_start.datepicker();
			$release_end.datepicker();
			$divIframe.dialog({
			    show: null,
			    bgiframe: false,
			    autoOpen: false,
			    draggable: true,
			    resizable: true,
			    modal: true,
			    width: 500,
			    height: 400
			});
			$tab1.click(
				function(){
					$tab2.children().find('img').attr('src','themes/default/images/number/tab_s_select.png');
					$tab1.children().find('img').attr('src','themes/default/images/number/tab_400.png');
					$s_text.hide();
					$f_text.show();
					$('#tabs').data("currPage",f_currP);
					//$.getJSON(url+'?currPage='+x+'&pageSize='+x+'',f_getTable)
					goPage(1,'findByPageNumber.action');
					//$.getJSON("http://localhost:8080/ajax/dahaoma.json",f_getTable);
				});
			$tab2.click(
				function(){
					$tab1.children().find('img').attr('src','themes/default/images/number/tab_400_select.png');
					$tab2.children().find('img').attr('src','themes/default/images/number/tab_s.png');
					$f_text.hide();
					$s_text.show();
					$('#tabs').data("currPage",s_currP);
					//$.getJSON("http://localhost:8080/ajax/Testing.json",s_getTable);
					//$.getJSON("findAllSmallNum.action",s_getTable);
					goPage(1,'findAllSmallNum.action');
					
				}
			);
		$f_delt.live('click',row_del);
		$s_delt.live('click',row_del);
		$all.click(select_all);
		$f_add.click(add);
		$s_add.click(add);
		$btn.mousedown(btn_down).mouseup(btn_up);
		$num_select.change(selecting);
		/*$f_pageBefore.live('click',function(){
			var c = f_currP-1;
			goPage(c,'findByPageNumber.action');
		});*/
		$f_pageBefore.live('click',goPage((f_currP-1),url));
		$s_pageBefore.live('click',goPage((s_currP-1),url));
		$f_pageNext.live('click',goPage((f_currP+1),url));
		$s_pageNext.live('click',goPage((s_currP+1),url));
		$f_delt.live('mousedown',function(){
			var $this = $(this);
			$this.children('img').attr('src','themes/default/images/number/delt_down.png')
		}).live('mouseup',function(){
			var $this = $(this);
			$this.children('img').attr('src','themes/default/images/number/delt.png')
		});
		$f_check.live('mousedown',function(){
			var $this = $(this);
			$this.children('img').attr('src','themes/default/images/number/check_down.png')
		}).live('mouseup',function(){
			var $this = $(this);
			$this.children('img').attr('src','themes/default/images/number/check.png')
		}).live('click',check);
		$tab1.trigger('click');
	}
);