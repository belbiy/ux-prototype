

//----------Enable buttons on Orders-------------------
$( document ).ready(function() {  

	$('input:radio[name=a_SignatureOption]').prop('checked', false);
    $('#commandButton_1_0').attr('disabled', 'true');  
    $('input:radio[name=a_SignatureOption]').click(function () {
    var checkval = $('input:radio[name=a_SignatureOption]:checked').val();
    if (checkval == '1' || checkval == '2') {
        $('#commandButton_1_0').removeAttr('disabled');
    }
	});


});