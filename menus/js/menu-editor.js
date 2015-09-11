$( document ).ready(function() {


	/*
	var SORTABLE_SETTINGS = {
		items: 'li',
		handle: '.icon-gripper',
		scroll: false,
		placeholder: 'sortable-placeholder',
		forceHelperSize:true,
		forcePlaceholderSize: true,
		//helper: 'clone',
		stop: function( event, ui ) {
			$(this).find('li').removeClass('parent_li');
			$(this).find('li:has(li)').addClass('parent_li');
			console.log( $(this).find('li:has(li)') );

		},
	}
	$('.menu-items').sortable(SORTABLE_SETTINGS);
	*/


	$('.menu-items .nested-sortable').nestedSortable({
		items: '.node',
		listType: 'ul',
		isTree: true,
		handle: '.icon-gripper',
		sort: function () {

			$('.menu-items .parent_li').removeClass('parent_li');
			$('.menu-items').find('li:has(ul.children > li)').addClass('parent_li');
		}
	});


	// Change H1 text on input
	$('#menu-name').on('input',function () {
		var val = $(this).val();
		var $h1 = $('h1.menu-name');
		if ( val != '' ) {
			$h1.text( val );
		} else {
			$h1.text('New Menu');
		}
	});



	$('.columns-picker tr').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).parent().find('tr').removeClass('active');
		$(this).parent().find('.btn').removeClass('btn-default').addClass('btn-tertiary').text('Select');
		$(this).addClass('active');
		$(this).find('.btn').removeClass('btn-tertiary').addClass('btn-default').text('Selected');
	})

	$('[data-cms-item-type] tbody tr').on('click', function (e) {
		$(this).find('.toggle-on, .toggle-off').toggleClass('toggle-on').toggleClass('toggle-off');
	});



	$('.btn-insert').on('click', function () {
		var $this = $(this);
		var $modal = $(this).closest('.modal');
		var $itemsSelected = $(this).closest('.modal-content').find('.toggle-on');
		var itemType = $modal.data('cms-item-type');

		$itemsSelected.each(function () {
			var $item = $(this);
			if (itemType == 'Widget' || itemType == 'Banner') {
				var $cmsItem = $('#menu-item-widget').clone();
			} else if (itemType == 'Page' ) {
				var $cmsItem = $('#menu-item-page').clone();
			}
			else {
				var $cmsItem = $('#menu-item-block').clone();
			}
			var itemName = $item.parents('tr').find('.name').text();
			$cmsItem.attr('id','');
			$cmsItem.removeClass('hide');
			$cmsItem.find('.node-label').text(itemName);
			$cmsItem.find('.node-type').text(itemType);
			$('.nested-sortable').append( $cmsItem );
			$cmsItem.find('.btn-remove-item').on('click', removeCmsBlock);
			$cmsItem.find('.btn-edit-item').on('click', updateModalData);
			$cmsItem.find('.node-wrap').on( "dblclick", function () {
				$(this).find('.btn-edit-item').trigger('click');
			});
			$cmsItem.removeClass('hide');

		});

		$modal.modal('hide');
		$('#add-menu-item-modal').modal('hide');
		$itemsSelected.removeClass('toggle-on').addClass('toggle-off');

	});



	$('.btn-insert-link').on('click', function () {
		var $this = $(this);
		var $modal = $(this).closest('.modal');
		var itemType = $modal.data('cms-item-type');

		var itemName = $('#link-label').val();
		var $cmsItem = $('#menu-item-link').clone();
		$cmsItem.attr('id','');
		$cmsItem.removeClass('hide');
		$cmsItem.find('.node-label').text(itemName);
		$cmsItem.find('.node-type').text(itemType);
		$('.nested-sortable').append( $cmsItem );
		$cmsItem.find('.btn-remove-item').on('click', removeCmsBlock);
		$cmsItem.find('.btn-edit-item').on('click', updateModalData);
		$cmsItem.find('.node-wrap').on( "dblclick", function () {
			$(this).find('.btn-edit-item').trigger('click');
		});

		$modal.modal('hide');
		$('#add-menu-item-modal').modal('hide');
		$('#link-label').val('');
		$('#link-url').val('');

	});


	$('.btn-insert-block').on('click', function () {
		var $this = $(this);
		var $modal = $(this).closest('.modal');
		var $itemsSelected = $(this).closest('.modal-content').find('.toggle-on');
		var itemType = $modal.data('cms-item-type');

		$itemsSelected.each(function () {
			var $item = $(this);
			console.log(itemType);
			var $cmsItem = $('#menu-item-block').clone();

			var itemName = $item.parents('tr').find('.name').text();
			$cmsItem.attr('id','');
			$cmsItem.removeClass('hide');
			$('.nested-sortable').append( $cmsItem );
			$cmsItem.find('.btn-remove-cms-item').on('click', removeCmsBlock);
			$cmsItem.find('.btn-edit-item').on('click', updateModalData);
			$cmsItem.find('.node-wrap').on( "dblclick", function () {
				$(this).find('.btn-edit-item').trigger('click');
			});
			$cmsItem.removeClass('hide');

		});

		$modal.modal('hide');
		$('#add-menu-item-modal').modal('hide');
		$itemsSelected.removeClass('toggle-on').addClass('toggle-off');

	});


	$('.btn-insert-columns').on('click', function (e) {
		var $this = $(this);
		var $modal = $(this).closest('.modal');
		var $itemSelected = $modal.find('.columns-picker .btn-default');

		var $cmsItem = $('#menu-item-columns').clone();
		$cmsItem.attr('id','');
		$cmsItem.removeClass('hide');
		$('.nested-sortable').append( $cmsItem );
		//$cmsItem.draggable(DRAGGABLE_SETTINGS);
		//$cmsItem.find('.page-content-block-body').sortable(SORTABLE_SETTINGS);

		$modal.modal('hide');
		$('#add-menu-item-modal').modal('hide');
		$itemSelected.removeClass('btn-default').addClass('btn-tertiary').text('Select');
		$itemSelected.closest('tr').removeClass('active');
		$cmsItem.find('.btn-remove-item').on('click', removeCmsBlock);
		$cmsItem.find('.btn-edit-item').on('click', updateModalData);
		$cmsItem.find('.page-content-block-title a').on('click',setCurrentContentBlock);
		$cmsItem.find('.collapse-toggle').on('click', function () {
			$(this).closest('li').toggleClass('collapsed').find('.cms-item').slideToggle('fast');
		});
		$cmsItem.find('.node-wrap').on( "dblclick", function () {
			$(this).find('.btn-edit-item').trigger('click');
		});
	});


	$('.btn-insert-category').on('click', function (e) {
		var $this = $(this);
		var $modal = $(this).closest('.modal');
		var $itemsSelected = $modal.find('input[type="checkbox"]:checked');

		$itemsSelected.each(function () {
			var $item = $(this);
			var categoryName = $item.parent().text();
			var $cmsItem = $('#menu-item-category').clone();

			$cmsItem.find('.node-label').text(categoryName);
			$cmsItem.attr('id','');
			$cmsItem.removeClass('hide');
			$cmsItem.find('.btn-remove-item').on('click', removeCmsBlock);
			$cmsItem.find('.btn-edit-item').on('click', updateModalData);
			$('.nested-sortable').append( $cmsItem );

			$cmsItem.removeClass('hide');
			$cmsItem.find('.node-wrap').on( "dblclick", function () {
				$(this).find('.btn-edit-item').trigger('click');
			});

		});

		$modal.modal('hide');
		$('#add-menu-item-modal').modal('hide');
		$itemsSelected.prop('checked',false);

	});

	//btn-insert-auto-category
	$('.btn-insert-auto-category').on('click', function (e) {
		var $this = $(this);
		var $modal = $(this).closest('.modal');
		var $itemsSelected = $modal.find('input[type="checkbox"]').filter(function() { return !this.disabled && this.checked; });

		$itemsSelected.each(function () {
			var $item = $(this);
			var categoryName = $item.parent().text();
			var $cmsItem = $('#menu-item-auto-category').clone();

			$cmsItem.find('.node-label:first').text(categoryName);
			$cmsItem.attr('id','');
			$cmsItem.removeClass('hide');
			$('.nested-sortable').append( $cmsItem );
			$cmsItem.find('.btn-remove-item').on('click', removeCmsBlock);
			$cmsItem.find('.btn-edit-item').on('click', updateModalData);
			$cmsItem.removeClass('hide');
			$cmsItem.find('.node-wrap').on( "dblclick", function () {
				$(this).find('.btn-edit-item').trigger('click');
			});
			$cmsItem.find('.collapse-toggle').on('click', function () {
				$(this).closest('li').toggleClass('collapsed').find('.subtree').slideToggle('fast');
			});

		});

		$modal.modal('hide');
		$('#add-menu-item-modal').modal('hide');
		$modal.find('input[type="checkbox"]').prop('checked',false).prop('disabled',false).removeClass('disabled').parent().removeClass('disabled');

	});


	$('.btn-remove-item').on('click', removeCmsBlock);

	var removeCmsBlock = function (e) {
		$(this).closest('.node').slideUp('fast',function () {
			$(this).remove();
		});
	}

	var $CURRENT_CONTENT_BLOCK = '';
	var setCurrentContentBlock = function (e) {
		$CURRENT_CONTENT_BLOCK =  $(this).closest('.page-content-block').find('.page-content-block-body').filter(':first');
		console.log( $CURRENT_CONTENT_BLOCK );
	}

	$('.menu-items .node-wrap').on( "dblclick", function () {
		$(this).find('.btn-edit-item').trigger('click');
	});



	var updateModalData = function () {
		var $node = $(this).closest('.node');
		var $modal = $('#edit-item-modal');
		var nodeName = $node.find('.node-label:first').text();
		var nodeType = $node.data('node-type');
		console.log(nodeType);
		if (nodeType == 'auto-category') {
			$modal.find('.auto-category').removeClass('hide');
		} else {
			$modal.find('.auto-category').addClass('hide');
		}

		$('#edit-item-modal .menu-item-category-name').text(nodeName);
		$('#edit-item-modal .menu-item-name').val(nodeName);
	};

	$('#add-menu-item-modal .modal-body .btn').on('click', function () {
		$('.modal[data-cms-item-type]').addClass('level-2');
	});

	$('.add-menu-item-button .dropdown-menu a').on('click',function () {
		$('.modal[data-cms-item-type]').removeClass('level-2');
	});


	$('#add-auto-category-modal .tree input[type="checkbox"]').on('change', function (e) {
		e.stopPropagation();
		var $this = $(this);
		var state = $this.prop('checked');
		if ( state ) {
			$this.closest('li').find('.children input[type="checkbox"]').prop('disabled', true).prop('checked', true).addClass('disabled').closest('label').addClass('disabled');
		} else {
			$this.closest('li').find('.children input[type="checkbox"]').prop('disabled', false).prop('checked', false).removeClass('disabled').closest('label').removeClass('disabled');
		}

		console.log(state);
	});



	$('.menu-items .node-wrap').on( 'dblclick', function () {
		$(this).find('.btn-edit-item').trigger('click');
	});
	$('.btn-edit-item').on('click', updateModalData);


});
