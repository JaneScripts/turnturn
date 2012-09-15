var active_row = 0,t=1,defaultPage=1,f_currP=1,s_currP=1,delId=[];
var row_del = function(url){//删除行
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
batch_del = function(url){
	var $this = $(this),
		id = '',
		delId=[];
	select_rows = $this.parents().find('.check:checked');
	select_id = select_rows.each(function(){
		var t=$(this).parent().next().html();
		delId.push(t);
	})
	id = delId.join();
	$.getJSON(url+'?smallCheck='+id+'',function(msg){
		if(msg==1){
			alert("删除成功");
				select_rows.parent().remove();
		}else{
			alert("错误");
		}
	})
},
required_judge = function(){//必填项*号
	var $this = $(this);
	if($this.val()==''){
		$this.siblings('.star').html('*');
	}else{
		$this.siblings('.star').html('');
	}
},
addIframe = function(event){//大按钮弹出页面
	var $this = $(this),
	IframeName = $this.attr('id').split('_')[0];
	event.preventDefault();
	event.stopPropagation();
	$('#'+IframeName+'AddIframe').dialog('open');
},
s_addIframe = function(event){//小按钮弹出页面
	var $this = $(this),
	btn = $this.attr('n').split('_')[1];
	btnName = btn+'AddIframe';
	event.preventDefault();
	event.stopPropagation();
	$('#'+btnName).dialog('open');
},
select_all = function(){//checkbox全选
	var $this = $(this)
	,selected = $this.attr('checked')
	,checks = $this.parents().find('table').children().find('.check');
	if(selected=='checked'){
		checks.attr('checked','checked');
	}else{
		checks.removeAttr('checked');
	}
},
clickTab = function(){//标签页切换
	var $this = $(this),
	textName = $this.attr('id').split('_')[1];
	$this.siblings().removeClass('tab_select');
	$this.addClass('tab_select');
	$('#text_'+textName).siblings('.text').hide();
	$('#text_'+textName).show();
},
clickRadio = function(){//raido选中切换面板
	var $this = $(this),
	textName = $this.attr('id').split('_')[1];
	$('#form_'+textName).siblings('form').hide();
	$('#form_'+textName).show();
},
btnDown = function(){
	$(this).css('box-shadow','black -2px -2px 2px');
},
btnUp = function(){
	$(this).css('box-shadow','black 2px 2px 2px');
},
btnMove = function(){
	$(this).css({'background-color':'#2f5684','color':'#FFFF09'});
},
btnOut = function(){
	$(this).css({'background-color':'#6a7d8c','color':'#fff'});
},
tabOn = function(){
	$(this).css('box-shadow','yellow 0 0 10px');
},
tabOut = function(){
	$(this).css('box-shadow','none');
},
f_getOneLine = function(json){//400号码插入每个单元格
	
	var str=''
	,fields=["id","itemnumber","itemtype","itemstatus","classification","createcode","createtime","numreleasedays","smallNum","area"]
	,x=0
	 ,op='<div class="ops" id="ftd_'+t+'"><a href="#" class="f_delt" onfocus=this.blur()><img src="themes/default/images/number/delt.png" /></a><a href="#" class="s_btnIframe" n="check" onfocus=this.blur()><img src="themes/default/images/number/check.png" /></a></div>'
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
		$('#tbody_f').html(finalhtml)
		t=1;
},
s_getOneLine = function(json){//小号码插入每个单元格
	var str=''
		,fields=["itemnumber","itemstatus"]
		,x=0
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
	$('#tbody_s').html(finalhtml)
	t=1;
},
goPage = function(page,url){//分页
	var $pg = $('.pg'),
	pageStr = '',
	currP = $('#tabs').data("currPage");
	if(page<1) return;	
	$.getJSON(url,function(data){
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
		$('#f_pages').html(pageStr);
		$pg.removeClass('page_select');
		$('.pg[p='+page+']').addClass('page_select');
		}
	)
}


$(document).ready(
	function(){
		var $tab = $('#tabs').children().find('.tab'),
			$tab_f = $('#tab_f'),
			$tab_s = $('#tab_s'),
		$radio = $('.radios').children('input'),
		$btnIframe = $('.btnIframe'),
		$s_btnIframe = $('.s_btnIframe'),
		$btn = $('.btn'),
		$divIframe = $('.divIframe'),
		$cusIframe = $('.cusIframe'),
		$numberIframe= $('.numberIframe'),
		$seatingIframe=$('.seatingIframe'),
		$packageIframe= $('.packageIframe'),
		$all_check = $('.all_check'),
		$s_del = $('#s_del'),
		$required = $('.required'),
		$pickDate = $('.pickDate');
		
		$divIframe.dialog({
			    show: null,
			    bgiframe: false,
			    autoOpen: false,
			    draggable: true,
			    resizable: true,
			    modal: true,
			    width: 650,
			    height: 400
			});
		$cusIframe.dialog({
			    show: null,
			    bgiframe: false,
			    autoOpen: false,
			    draggable: true,
			    resizable: true,
			    modal: true,
			    width: 520,
			    height: 400
			});
		$numberIframe.dialog({
			    show: null,
			    bgiframe: false,
			    autoOpen: false,
			    draggable: true,
			    resizable: true,
			    modal: true,
			    width: 520,
			    height: 400
			});
		$packageIframe.dialog({
			    show: null,
			    bgiframe: false,
			    autoOpen: false,
			    draggable: true,
			    resizable: true,
			    modal: true,
			    width: 520,
			    height: 400
			});
		$('#annexAddIframe').dialog({
			    show: null,
			    bgiframe: false,
			    autoOpen: false,
			    draggable: true,
			    resizable: true,
			    modal: true,
			    width: 650,
			    height: 400
			});
		$('#invoiceSupplyAddIframe').dialog({
			show: null,
			 bgiframe: false,
			 autoOpen: false,
			 draggable: true,
			resizable: true,
			modal: true,
			width: 470,
			height: 720
		});
		$seatingIframe.dialog({
			show: null,
			 bgiframe: false,
			 autoOpen: false,
			 draggable: true,
			resizable: true,
			modal: true,
			width: 650,
			height: 500
		});
		
		
		//$tab.click(clickTab);
		$tab_f.click(function(){
			var $this = $(this),
			textName = $this.attr('id').split('_')[1];
			$this.siblings().removeClass('tab_select');
			$this.addClass('tab_select');
			$('#text_'+textName).siblings('.text').hide();
			$('#text_'+textName).show();
			goPage(1,'http://localhost:8080/ajax/dahaoma.json');
		});
		$tab_s.click(function(){
			var $this = $(this),
			textName = $this.attr('id').split('_')[1];
			$this.siblings().removeClass('tab_select');
			$this.addClass('tab_select');
			$('#text_'+textName).siblings('.text').hide();
			$('#text_'+textName).show();
			goPage(1,'findAllSmallNum.action');
		});
		$radio.click(clickRadio);
		$btn.mousedown(btnDown).mouseup(btnUp).mousemove(btnMove).mouseout(btnOut);
		$tab.mousemove(tabOn).mouseout(tabOut);
		$s_btnIframe.click(s_addIframe);
		$s_del.click(batch_del('delByItemSmallNum'));
		$btnIframe.click(addIframe);
		$all_check.click(select_all);
		$pickDate.datepicker();
		$required.change(required_judge);	
	}
);