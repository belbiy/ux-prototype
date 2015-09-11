$( document ).ready(function() {
	
	$('.toggle-off, .toggle-on').click(function (e) {
		var $this = $(this);
		
		if ( $this.hasClass( 'toggle-on' ) ) {
			$this.removeClass('toggle-on').addClass('toggle-off').html('Off');
		} else {
			$this.removeClass('toggle-off').addClass('toggle-on').html('On');
		}
		
		
	});
	
	/*
	
	function toggleClass(el){
	
	if(el.className == "toggle-off"){
	el.className = "toggle-on";
	el.innerHTML = 'On';
	} else {
	el.className = "toggle-off";
	el.innerHTML = 'Off';
	}
	}
	*/
});