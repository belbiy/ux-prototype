
/*function enableAndDisable(idController, idContent){
	if(document.getElementById(idController).checked){
		$(idContent).css('visibility', 'visible');
		$(idContent).css('height', '100%');
	}else{
		$(idContent).css('visibility', 'hidden');
		$(idContent).css('height', '0');
	}

}*/

/*function enableAndDisable(idController, idContent){
	if(document.getElementById(idController).checked){
		$(idContent).removeClass("collapse").addClass("collapse.in");
	}else{
		$(idContent).removeClass("collapse.in").addClass("collapse");
	}

}


$("#PayflowPro-checkbox").click(function(){
	enableAndDisable("PayflowPro-checkbox", "#PayflowPro-content");
});


$("#Ogone-checkbox").click(function(){
	enableAndDisable("Ogone-checkbox", "#Ogone-content");
});*/



$(".collapse").on('shown.bs.collapse', function(){
		$(this).parent().find('#carrot-icon').removeClass("icon-caret-down").addClass("icon-caret-up");
}).on('hidden.bs.collapse', function(){

		$(this).parent().find('#carrot-icon').removeClass("icon-caret-up").addClass("icon-caret-down");
	
});