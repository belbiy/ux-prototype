$( document ).ready(function() {

	// APP NAV
	$('body').wrapInner('<div class="app-container" />');
	$('body').append( '<a href="#app-nav" class="app-nav-toggle"><i class="glyphicon glyphicon-th-list"></i></a>');


	if ( localStorage.getItem('app-show-interactive' ) == 'true' ) {
		$('body').addClass('app-show-interactive');
		$('.app-show-interactive-toggle').attr('checked','checked');
	}


	$('.app-main-wrap').click( function (e) {
		 $('body').removeClass('app-nav-open')
	});

	$('.app-nav-toggle').click( function (e) {
		e.preventDefault();
		$('body').toggleClass('app-nav-open');
	});


	$('.app-show-interactive-toggle').change( function ( e ) {
		if ( $(this).is(':checked') ) {
			localStorage.setItem('app-show-interactive',true);
			$('body').addClass('app-show-interactive');
		} else {
			localStorage.setItem('app-show-interactive',false);
			$('body').removeClass('app-show-interactive');
		}

	});
	/*	$('.app-main-wrap').append( '<a href="" class="app-nav-fader"></a>');
	$('.app-nav-fader').click( function (e) {
		e.preventDefault();
		$('body').toggleClass('app-nav-open');
	});*/



	///////// ADMIN NAV

	$('.admin-nav-main .nav a ').click( function (e) {
		e.preventDefault();
		$('.admin-nav-main a').removeClass('active');
		var current_class = $(this).parent().attr('class');
		$(this).addClass('active');
		$('.admin-nav-secondary').removeClass('active');
		$('.admin-nav-secondary.' + current_class + '-secondary' ).toggleClass('active');
		$('.admin-page').addClass('nav-active');
	});

	$('.admin-nav-secondary').append('<a href="#" class="close-nav"></a>');

	$('.close-nav').click( function (e) {
		e.preventDefault();
		$('.admin-nav-main a').removeClass('active');
		$('.admin-page').removeClass('nav-active');
		$(this).parent().removeClass('active');
	});


	$('.admin-page .main-content').append( '<a href="#" class="admin-nav-fader"></a>');
	$('.admin-nav-fader').click( function (e) {
		e.preventDefault();
		$('.admin-nav-secondary').removeClass('active');
		$('.admin-nav-main a').removeClass('active');
		$('.admin-page').removeClass('nav-active');
	});

	$('.admin-nav-main .nav .dashboard a').unbind( "click" );


	 $('[data-toggle="tooltip"]').tooltip();

});
