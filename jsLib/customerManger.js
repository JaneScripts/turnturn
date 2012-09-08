// JavaScript Document
var select_all = function(){
	var $this = $(this)
		,selected = $this.attr('checked')
		,checks = $this.parents().find('table').children().find('.check');
		if(selected=='checked'){
			checks.attr('checked','checked');
		}else{
			checks.removeAttr('checked');
		}
},
S_addIframe = function(event){
	var $this = $(this),
		btn = $this.attr('n').split('_')[1];
		btnName = btn+'Iframe';
		event.preventDefault();
		event.stopPropagation();
		$('#'+btnName).dialog('open');
}
$(document).ready(
				  function(){
					  	$start = $('.startDate'),
						$end = $('.endDate'),
						$all_check = $('.all_check'),
						$divIframe = $('.divIframe')
						$c_btn = $('.c_btn')
						$distribute = $('.distribute');
						
						$divIframe.dialog({
							show: null,
							bgiframe: false,
							autoOpen: false,
							draggable: true,
							resizable: true,
							modal: true,
							width: 500,
							height: 500
						});
						$c_btn.live('click',add)
						$start.datepicker();
						$end.datepicker();
						$all_check.click(select_all);
					  }
				  );