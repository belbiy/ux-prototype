$(document).ready(function () {

	// TODO: Allow for inline options using the data-joyride attribute
	$("ol[data-joyride]").joyride({
		'autoStart': true,
		'tipContainer': '.main-content',
		'template' : { // HTML segments for tip layout
			'link'    : '<a href="#close" class="joyride-close-tip">&times;</a>',
			'timer'   : '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
			'tip'     : '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
			'wrapper' : '<div class="joyride-content-wrapper" role="dialog"></div>',
			'button'  : '<a href="#" class="joyride-next-tip btn btn-primary"></a>',
			'modal'   : '<div class="joyride-modal-bg"></div>',
			'expose'  : '<div class="joyride-expose-wrapper"></div>',
			'exposeCover': '<div class="joyride-expose-cover"></div>'
		}
	});
});