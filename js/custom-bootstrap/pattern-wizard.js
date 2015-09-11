$(function() {
// TODO: Revrite to one, using plugin pattern
// TODO: onStepChangeEvent
// TODO: 

/*==========================================First Version*==========================================*/


var current_step = $("#contentOfStep-1"); //set current step to cotent of step 1
var next_step, prev_step;
var num_steps_in_progress = $("#steps_bar > li").length;
var current_li = $("#wizard-step-1");
var next_li, prev_li;

//NEXT==========================================

$("#next_button").click(function(){


  if(current_li.is("#wizard-step-1")){
      $("#back_button").removeClass("disabled");
      $("#back_button").removeAttr("disabled", true);
  }

  
  current_step.hide(); 
  current_li.removeClass("active");

  //set next step content to show.
  next_step = current_step.next(); 
  next_step.show();

  //set progress bar list to mark active
  next_li = current_li.next();
  next_li.addClass("active");
  next_li.addClass("visited");

  current_step = next_step; //set current step to next step
  current_li = next_li;

  //Set next button to disabled at last step
  if(current_li.is(':last-child')){
      $("#next_button").addClass("disabled");
      $("#next_button").attr("disabled", true);
      return;
  }

  $(window).trigger('resize');


});


//BACK==========================================

$("#back_button").click(function(){

  //Going back to previous step, so next button should be enabled

  if(current_li.is(':last-child')){
      $("#next_button").removeClass("disabled");
      $("#next_button").removeAttr("disabled", true);
  }

  //hide current step's content
  current_step.hide(); 
  current_li.removeClass("active");

  //set previous step's content to show.
  prev_step = current_step.prev(); 
  prev_step.show();

  //set progress bar list to mark active
  prev_li = current_li.prev();
  prev_li.addClass("active");

  current_step = prev_step; //set current step to next step
  current_li = prev_li;

  if(current_li.is("#wizard-step-1")){
      $("#back_button").addClass("disabled");
      $("#back_button").attr("disabled", true);
  }
  
  $(window).trigger('resize');

});


/*==========================================Second Version*==========================================*/
//NEXT==========================================
var $wizard = $('#steps_bar_2');
$wizard.data('current_step_2', $("#contentOfStep_2") );
$wizard.data('next_step_2', '' );
$wizard.data('prev_step_2', '' );
$wizard.data('num_steps_in_progress_2', $("#steps_bar_2 > li").length );
$wizard.data('current_li_2', $("#wizard-step-2") );
$wizard.data('next_li_2', '' );
$wizard.data('prev_li_2', '' );

//var current_step_2 = $("#contentOfStep_2"); //set current step to cotent of step 1
var next_step_2, prev_step_2;
var num_steps_in_progress_2 = $("#steps_bar_2 > li").length;
var current_li_2 = $("#wizard-step-2");
var next_li_2, prev_li_2;


$("#next_button2").click(function(){


  if( $wizard.data('current_li_2').is("#wizard-step-2") ){
      $("#back_button2").removeClass("disabled");
      $("#back_button2").removeAttr("disabled", true);
  }

  
  $wizard.data('current_step_2').hide(); 
  $wizard.data('current_li_2').removeClass("active");

  //set next step content to show.
  $wizard.data('next_step_2', $wizard.data('current_step_2').next() ); 
  $wizard.data('next_step_2').show();
  

  //set progress bar list to mark active
  $wizard.data('next_li_2', $wizard.data('current_li_2').next() );
  $wizard.data('next_li_2').addClass("active");
  $wizard.data('next_li_2').addClass("visited");

  $wizard.data('current_step_2', $wizard.data('next_step_2') ); //set current step to next step
  $wizard.data('current_li_2', $wizard.data('next_li_2') );

  //Set next button to disabled at last step
  if(  $wizard.data('current_li_2').is(':last-child')){
      $("#next_button2").hide();
      $(".second-wizard-save-button").show();
       
  }


  $(window).trigger('resize');

});


//BACK==========================================

$("#back_button2").click(function(){

  //Going back to previous step, so next button should be enabled
  if( $wizard.data('current_li_2').is(':last-child') ){
      $("#next_button2").show();
      $(".second-wizard-save-button").hide();
  }

  //hide current step's content
  $wizard.data('current_step_2').hide(); 
  $wizard.data('current_li_2').removeClass("active");

  //set previous step's content to show.
  $wizard.data('prev_step_2', $wizard.data('current_step_2').prev() ); 
  $wizard.data('prev_step_2').show();

  //set progress bar list to mark active
  $wizard.data('prev_li_2', $wizard.data('current_li_2').prev() );
  $wizard.data('prev_li_2').addClass("active");


  $wizard.data('current_step_2', $wizard.data('prev_step_2') ); //set current step to next step
  $wizard.data('current_li_2', $wizard.data('prev_li_2') );

  if( $wizard.data('current_li_2').is("#wizard-step-2")){
      $("#back_button2").addClass("disabled");
      $("#back_button2").attr("disabled", true);
  }

  $(window).trigger('resize');

});


});


// WIZARD JQUERY PATTERN

/*
 * 'Highly configurable' mutable plugin boilerplate
 * Author: @markdalgleish
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// Note that with this pattern, as per Alex Sexton's, the plugin logic
// hasn't been nested in a jQuery plugin. Instead, we just use
// jQuery for its instantiation.
/*

;(function( $, window, document, undefined ){

	// our plugin constructor
	var Wizard = function( elem, options ){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		
		

		// This next line takes advantage of HTML5 data attributes
		// to support customization of the plugin on a per-element
		// basis. For example,
		// <div class=item' data-plugin-options='{"message":"Goodbye World!"}'></div>
		this.metadata = this.$elem.data( "plugin-options" );
	};

	// the plugin prototype
	Wizard.prototype = {
		defaults: {
			activeSelector: 		'.active',
			visitedSelector: 		'.visited',
			navSelector: 			'.wizard-nav li',
			bodySelector:			'.wizard-content',
			stepSelector:			'.wizard-step',
			nextSelector:			'.wizard-next',
			prevSelector:			'.wizard-prev',
			endSelector:			'.wizard-end',
			startStep:				1,
		},

		init: function() {
			// Introduce defaults that can be extended either
			// globally or using an object literal.
			var self = this;
			this.config = $.extend({}, this.defaults, this.options, this.metadata);
			
			this.config.currentStep = this.config.startStep;
			
			// Store dom objects for later use
			this.config.nav = $(this.elem).find(this.config.navSelector);
			this.config.steps = $(this.elem).find(this.config.stepSelector);
			

			// Bind events
			$(this.elem).find(this.config.nextSelector).on('click', self.nextStep );
			$(this.elem).find(this.config.prevSelector).on('click', self.prevStep );
			
			$(this.elem).on('lastStep', this.lastStep );
			
			
			// hide all but current step
			this.goToStep( this.config.startStep );
			
			return this;
		},
		lastStep: function () {
			
		}
		goToStep: function (step) {
			
			_step = parseInt(step,10) - 1;
			
			// Track min-max step values
			if ( _step <= 0 ) {
				_step = 0;
				$(this.elem).trigger('firstStep');
			} 
			if ( _step > this.config.steps.length ) {
				_step = this.config.steps.length - 1;
				$(this.elem).trigger('lastStep');
			}
	
			// set human-readable step number
			this.config.currentStep = _step + 1;

			// Update wizard steps
			this.config.steps.addClass('hide');
			$(this.config.steps[_step]).removeClass('hide').addClass('active');
			
			// Update navigation 
			$(this.config.nav).removeClass('visited active').eq(_step).addClass('active').prevAll().addClass('visited');
			
			// Fire event
			$(this.elem).trigger('changedStep');

		},
		nextStep: function (event) {
			this.goToStep( this.config.currentStep + 1 );
		},
		prevStep: function (event) {
			this.goToStep( this.config.currentStep - 1 );
		}
	}
	
	Wizard.defaults = Wizard.prototype.defaults;

	$.fn.wizard = function(options) {
		return this.each(function() {
			var wiz = new Wizard(this, options).init();
			
			$(this).data('wizard',wiz);
		});
	};

  //optional: window.Plugin = Plugin;

})( jQuery, window , document );

*/
