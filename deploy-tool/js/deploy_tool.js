
//----------READINESS CHECK-------------------

//Show the rest of checks
	$('#php_extensions').delay(500).show(0);
	$('#file_permissions').delay(800).show(0);
	$('#module_dependencies').delay(1100).show(0);

	//Marking each checks done
	$('#php_version').delay(1400).hide(0);
	$('#php_version_done').delay(1400).show(0);

	$('#php_extensions').delay(1400).fadeOut(10);
	$('#php_extensions_done').delay(1960).show(0);


	$('#file_permissions').delay(2000).fadeOut(10);
	$('#file_permissions_done').delay(2860).show(0);


	$('#module_dependencies').delay(2900).fadeOut(10);
	$('#module_dependencies_done').delay(4100).show(0);


	$('#original_message').delay(4100).hide(0);
	$('#complete_message').delay(4100).show(0);

	
	$('#disabled_next_button').delay(4100).hide(0);
	$('#enabled_next_button').delay(4100).show(0);

	$('#disabled_back_button').delay(4100).hide(0);
	$('#enabled_back_button').delay(4100).show(0);

	$('#component-update-checking').delay(3000).hide(0);
	$('#you-have-updates').delay(3000).show(0);
	$('.updates-available').delay(3000).show(0);

//-------TOOL TIP-----------//
$(function () {
  $('[data-toggle="tooltip"]').tooltip()

})

$(function () {
  $('[data-toggle="popover"]').popover()
})

