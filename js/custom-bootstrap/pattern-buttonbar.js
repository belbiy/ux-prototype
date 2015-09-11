//----------Sticky Button Bar-------------------

// Create a clone of the button bar, right next to original.
$( document ).ready(function() { 
	if ( $('.button-bar').length ) {
		
		// Grab each instance of button-bar and clone it. Then attach scrolling event to it's neares scrollable parent (.modal or .app-main-wrap)
		// This done because we have button bars inside fixed position elements which provides a buggy behavior. 
		
		$('.button-bar').each(function () {
			var buttonBar = $(this);
			var	parentFrame = buttonBar.closest( '.modal, .app-main-wrap' );
			var parent = buttonBar.parent();
			var	clone = buttonBar.clone();
			
			clone.appendTo(parent).addClass('cloned').hide();
			buttonBar.addClass('original');
			
			parentFrame.scroll( function () {
				
				if ( buttonBar.offset().top < 0 ) {

					clone.width( buttonBar.width() );
					//clone.css('top', $(this).scrollTop() );
					clone.css('left', buttonBar.offset().left );
					clone.show();
					//console.log(  $(this).attr('class') + ': ' + $(this).scrollTop() );
					
				} else {
					clone.hide();
				}				
				
				
			});
		
		}); 
	
	
	}
});