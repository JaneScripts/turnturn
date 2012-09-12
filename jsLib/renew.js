var select_all = function(){
	var $this = $(this)
		,selected = $this.attr('checked')
		,checks = $this.parents('table').children().find('.check');
		if(selected=='checked'){
			checks.attr('checked','checked');
		}else{
			checks.removeAttr('checked');
		}
},
select_change = function(){
	var $this = $(this),
		t = $this.val();
		$('#'+t).siblings('form').hide();
		$('#'+t).show();
}
$(document).ready(
	function(){
		$('.renew_select').change(select_change);
		$('.all_check').click(select_all);
	}
);