

// Hello world
/*
$('.collapse').on('shown.bs.collapse', function(){
$(this).parent().find(".glyphicon-chevron-up").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
}).on('hidden.bs.collapse', function(){
$(this).parent().find(".glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
});
*/



$('.collapse').on('shown.bs.collapse', function(){
$(this).parent().find(".glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
}).on('hidden.bs.collapse', function(){
$(this).parent().find(".glyphicon-chevron-up").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
});



$('.collapse').on('shown.bs.collapse', function(){
$(this).parent().find(".expander-collapsed").removeClass("expander-collapsed").addClass("expander-expanded");
}).on('hidden.bs.collapse', function(){
$(this).parent().find(".expander-expanded").removeClass("expander-expanded").addClass("expander-collapsed");
});

/*Control for second level*/
$('.control-secondLevel').click(function(){

	if( $(this).hasClass("expander-collapsed-nth-level") ){
		$(this).removeClass("expander-collapsed-nth-level").addClass("expander-expanded-nth-level");
	}else {
		$(this).removeClass("expander-expanded-nth-level").addClass("expander-collapsed-nth-level");
	}

});