$( document ).ready(function() {


	// Draggable blocks
	var DRAGGABLE_SETTINGS = {
		appendTo: 'parent',
		//containment: '.page-content-wrap',
		revert: false,
		connectToSortable: '.page-content-block-body',
		handle: '.icon-gripper',
		//cursorAt: { left: 0,top:0 },
		revert: 'invalid',
		revertDuration: 0,
		//helper: 'clone',
		//scroll: false,
		helper: function() {
			var helper = $(this); // Untested - I create my helper using other means...

			// jquery.ui.sortable will override width of class unless we set the style explicitly.
			helper.css({'width': '450px', 'height': 'auto'});
			return helper;
   	},
		stop: function( event, ui ) {
			var helper = $(this);
			helper.css({'width': 'auto', 'height': 'auto'});
		}
	}
	$('.cms-item').draggable(DRAGGABLE_SETTINGS);



	var SORTABLE_SETTINGS = {
		items: '.cms-item',
		handle: '.icon-gripper',
		scroll: false,
		forceHelperSize:true,
		forcePlaceholderSize: true,
		//helper: 'clone',
		receive: function( event, ui ) {
			$(this).find('.cms-item').width('auto').height('auto').css('z-index','');
		},
	}
	$('.page-content-block-body').sortable(SORTABLE_SETTINGS);

	var $CURRENT_CONTENT_BLOCK = '';
	var setCurrentContentBlock = function (e) {
		$CURRENT_CONTENT_BLOCK =  $(this).closest('.page-content-block').find('.page-content-block-body').filter(':first');
		console.log( $CURRENT_CONTENT_BLOCK );
	}

	$('.page-content-block-title a').on('click',setCurrentContentBlock);

	$('.btn-insert').on('click', function () {
		var $this = $(this);
		var $modal = $(this).closest('.modal');
		var $itemsSelected = $(this).closest('.modal-content').find('.toggle-on');
		var itemType = $modal.data('cms-item-type');

		$itemsSelected.each(function () {
			var $item = $(this);
			var $cmsItem = $('#generic-cms-item').clone();
			var itemName = $item.parents('tr').find('.name').text();
			$cmsItem.attr('id','');
			$cmsItem.removeClass('hide');
			$cmsItem.find('.cms-item-title').text(itemName);
			$cmsItem.find('.cms-item-type').text(itemType);
			$CURRENT_CONTENT_BLOCK.append( $cmsItem );
			$cmsItem.draggable(DRAGGABLE_SETTINGS);

			$cmsItem.find('.btn-remove-item').on('click', removeCmsBlock);
			$cmsItem.find('.cms-item-header').on( "dblclick", function () {
				$(this).find('.btn-edit-item').trigger('click');
			});
			console.log( $cmsItem );
		});

		$modal.modal('hide');
		$itemsSelected.removeClass('toggle-on').addClass('toggle-off');


	});

	$('.btn-insert-columns').on('click', function (e) {
		var $this = $(this);
		var $modal = $(this).closest('.modal');
		var $itemSelected = $modal.find('.columns-picker .btn-default');

		var $cmsItem = $('#column-cms-item').clone();
		$cmsItem.attr('id','');
		$cmsItem.removeClass('hide');
		$CURRENT_CONTENT_BLOCK.append( $cmsItem );
		$cmsItem.draggable(DRAGGABLE_SETTINGS);
		$cmsItem.find('.page-content-block-body').sortable(SORTABLE_SETTINGS);

		$modal.modal('hide');
		$itemSelected.removeClass('btn-default').addClass('btn-tertiary').text('Select');
		$itemSelected.closest('tr').removeClass('active');
		$cmsItem.find('.btn-remove-item').on('click', removeCmsBlock);
		$cmsItem.find('.page-content-block-title a').on('click',setCurrentContentBlock);
		$cmsItem.find('.cms-item-header').on( "dblclick", function () {
			$(this).find('.btn-edit-item').trigger('click');
		});
	});


	$('.btn-insert-block').on('click', function (e) {
		var $this = $(this);
		var $modal = $(this).closest('.modal');
		var $itemSelected = $modal.find('.toggle-on');

		var $cmsItem = $('#block-cms-item').clone();
		$cmsItem.attr('id','');
		$cmsItem.removeClass('hide');
		$CURRENT_CONTENT_BLOCK.append( $cmsItem );
		$cmsItem.draggable(DRAGGABLE_SETTINGS);

		$modal.modal('hide');
		$cmsItem.find('.btn-remove-item').on('click', removeCmsBlock);
		$itemSelected.removeClass('toggle-on').addClass('toggle-off');
		$cmsItem.find('.cms-item-header').on( "dblclick", function () {
			$(this).find('.btn-edit-item').trigger('click');
		});

	});

	$('.btn-change-layout').on('click', function (e) {
		var $this = $(this);
		var $modal = $(this).closest('.modal');
		var $itemSelected = $modal.find('.layout-list .layout-wrap.active');
		var layoutName = $itemSelected.find('> .layout-name').text();
		var layout = $itemSelected.data('layout');
		$('.page-content-wrap').addClass('hide');

		$('.page-content-wrap.' + layout ).removeClass('hide');

		$('.current-layout').text(layoutName);
		$modal.modal('hide');
		$itemSelected.find('.btn').removeClass('btn-default').addClass('btn-tertiary').text('Select');
		$itemSelected.removeClass('active');
	});


	$('.responsive-view-switcher .btn').on('click', function () {
		$(this).parent().find('.btn').removeClass('active');
		$(this).addClass('active');
	});

	var removeCmsBlock = function (e) {
		$(this).closest('.cms-item').slideUp('fast',function () {
			$(this).remove();
		});
	}

	$('.btn-remove-item').on('click', removeCmsBlock);



	$('.columns-picker tr').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).parent().find('tr').removeClass('active');
		$(this).parent().find('.btn').removeClass('btn-default').addClass('btn-tertiary').text('Select');
		$(this).addClass('active');
		$(this).find('.btn').removeClass('btn-tertiary').addClass('btn-default').text('Selected');
	});

	$('.layout-list .layout-wrap').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).closest('.layout-list').find('.layout-wrap').removeClass('active');
		$(this).closest('.layout-list').find('.btn').removeClass('btn-default').addClass('btn-tertiary').text('Select');
		$(this).addClass('active');
		$(this).find('.btn').removeClass('btn-tertiary').addClass('btn-default').text('Selected');
	});



	$('[data-cms-item-type] tbody tr').on('click', function (e) {
		$(this).find('.toggle-on, .toggle-off').toggleClass('toggle-on').toggleClass('toggle-off');
	})


	// Save button shows an alert
	var PAGE_CAN_SAVE = false;
	var $generalInfoForm = $('#page-settings');
	var $pageSavedAlert = $('.alert-page-saved');

	var validateGeneralForm = function (e) {
		e.preventDefault();
		$generalInfoForm.validator('validate');

		var $formErrors = $generalInfoForm.find('.has-error .form-control');
		if ( $formErrors.length > 0 ) {
			PAGE_CAN_SAVE = false;
			$pageSavedAlert.addClass('hide');
		} else {
			PAGE_CAN_SAVE = true;
		}

		// Save
		if ( PAGE_CAN_SAVE === true  ) {
			$pageSavedAlert.removeClass('hide');
		} else {
			$formErrors.filter(':first').focus();
		}
	}

	$generalInfoForm.on('submit', validateGeneralForm );
	$('.btn-save-page').on('click', validateGeneralForm );

	// Change H1 text on input
	$('#page-name').on('input',function () {
		var val = $(this).val();
		var $h1 = $('h1.page-name');
		if ( val != '' ) {
			$h1.text( val );
		} else {
			$h1.text('New Page');
		}
	});






});
