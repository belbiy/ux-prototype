




$("#first-select-button").click(function(){
	
	$("#theme1").hide();
	$("#theme1-selected").show();

	/*unselect the second theme*/
	$("#theme2").show();
	$("#theme2-selected").hide();

});


$("#second-select-button").click(function(){
	
	$("#theme2").hide();
	$("#theme2-selected").show();

	/*unselect the first theme*/
	$("#theme1").show();
	$("#theme1-selected").hide();
	
});
