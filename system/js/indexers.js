$( document ).ready(function() {
	var checkboxes = $('.data-grid td input[type="checkbox"]');
	
	checkboxes.change( function () {
		
		var selectedCheckboxes = checkboxes.filter(":checked"),
			selectedCheckboxesCount = selectedCheckboxes.length;
		
		if ( selectedCheckboxesCount > 0 ) {
			$('.btn-primary').prop('disabled', false);
		}
		else {
			$('.btn-primary').prop('disabled', true);
		}
		
	});
	
});