var li_select = function(){
	$this = $(this),
	content = $this.attr('content'),
	$default = $this.parents('.selectUI').children().find('.default');
	
	$this.siblings().removeClass('li_selected');
	$this.addClass('li_selected');
	$this.parents('.selectBox').hide();
	$default.html(content);
},
li_hover = function(){
	$this = $(this),
	$this.siblings().removeClass('li_selected');
	$this.addClass('li_selected');
}
$(document).ready(
	function(){
		$selectInfo = $('.selectInfo'),
		$items = $('.items')
		$selectBox = $('.selectBox'),
		$u0 = $('#u0'),
		$u1 = $('#u1');
		$selectInfo.click(function(){
			if($(this).siblings().css('display')=='none'){
			$(this).siblings().show();
			$(this).parent().siblings('.selectUI').children('.selectBox').hide();
			$(this).siblings().css('z-index','1000');
			
			}else{
				$(this).siblings().hide();
			}
			
		});
		$items.hover(li_hover).click(li_select);
		$u0.click(function(event){
				event.stopPropagation();
		});
		$u1.click(function(event){
				event.stopPropagation();
		});
		$(document).click(function(event){
				$selectBox.hide();
		});
		
	}
);