$(document).ready(
	function(){
		$('.tab').click(
			function(){
				var $this = $(this),
					t = $this.attr('id').split('_')[1];
					$('.tab_select').removeClass('.tab_select')
					$this.siblings().each(function(){
						$(this).children('img').attr('src','themes/default/images/number/tab_'+t+'_select.png')
					});
					$('#text_'+t).siblings('.text_detail').hide();
					$('#text_'+t).show().addClass('.tab_select');
			}
		);
	}
);