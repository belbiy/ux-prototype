

/*
// Show modal before exiting the page
var $exitModal = $('#exit-product-modal');
if ( $exitModal.length ) {
	
	$(window).on('beforeunload',function (e) {
		var product_saved = 0;
		//return false;
		//if ( !product_saved ) {
		e.preventDefault();
		e.stopPropagation();
		
		$exitModal.modal('show');
	
	//	}
	
	});
	
}
*/


// Image upload - main upload area, uses full screen
Dropzone.autoDiscover = false;
Dropzone.options.mainDropzone = {
	paramName: "main-file", // The name that will be used to transfer the file
	maxFilesize: 4, // MB
	url: '/',
	clickable: true,
	autoProcessQueue:false,
	thumbnailWidth:150,
	thumbnailHeight: 150,
	//clickable:'.dz-message',
	previewsContainer: '#image-upload-main',
	dictDefaultMessage:'<i class="icon icon-camera"></i> Browse to find or drag image here',
	addRemoveLinks:true,
	accept: function(file, done) {
		if (file.name == "justinbieber.jpg") {
			done("Naha, you don't.");
		}
		else { 
			done(); 
			$('#image-management-panel').collapse('show');
		}
	}
};

Dropzone.options.regularDropzone = {
	paramName: "file", // The name that will be used to transfer the file
	maxFilesize: 4, // MB
	url: '/11/',
	clickable: true,
	autoProcessQueue:false,
	thumbnailWidth:150,
	thumbnailHeight: 150,
	//clickable:'.dz-message',
	dictDefaultMessage:'<i class="icon icon-camera"></i> Browse to find or drag image here',
	addRemoveLinks:true
};


// drag&drop to reorder images
$(".image-upload.sortable").sortable({
	items:'.dz-preview',
	cursor: '-webkit-grabbing',
	opacity: 0.7,
	zIndex: 99,	
	distance: 10,
	tolerance: 'pointer',
}).disableSelection();

$("body").dropzone(Dropzone.options.mainDropzone);

$('.image-upload.regular-dropzone').dropzone(Dropzone.options.regularDropzone);





// Entering product name updates h1 
$('#product-name').on('input',function () {
	var val = $(this).val();
	var $h1 = $('h1.product-name');
	//console.log(val);
	if ( val != '' ) {
		$h1.text( val );
	} else {
		$h1.text('New Product');
	}
	
});




// Hide weight field for virtual product 
$('[name="weight-radio"]').on('change', function () {
	var val = $(this).val();
	var $weight = $('.product-weight');
	
	if (val == 'virtual' ) {
		$weight.addClass('hide');
		$('.configurations-panel').addClass('hide');
		$('.downloadable-panel').removeClass('hide');
	} else {
		$weight.removeClass('hide');
		$('.configurations-panel').removeClass('hide');
		$('.downloadable-panel').addClass('hide');

	}
	
	
});



// Atrribute set switcher
// Show/hides the #length-input
$('#attribute-set-dropdown').on('change', function () {
	var val = $(this).val();
	var $element = $('#length-input');
	var match = 'Belts';
	
	if ( val == match ) {
		$element.removeClass('hide');
	} else {
		$element.addClass('hide');
	}
});






// Save Related Products
// Clicking on save button in select related products modal
$('#select-related-products .button-bar .btn-primary').on('click', function () {
	$('.related-products-button').text('Edit Related Products');
	$('#related-products-addition').removeClass('hide');
	$('#select-related-products').modal('hide');
});





// Save Product button shows an alert 
var PRODUCT_CAN_SAVE = false;
var $generalInfoForm = $('#product-general-information-form');


$('.btn-save-product a, .btn-save-product .btn').on('click',function (){
	
	$generalInfoForm.validator('validate');
	
	var $formErrors = $generalInfoForm.find('.has-error .form-control');
	if ( $formErrors.length > 0 ) {
		PRODUCT_CAN_SAVE = false;
	} else {
		PRODUCT_CAN_SAVE = true;
	}
	//console.log($formErrors);
	
	// Save product
	if ( PRODUCT_CAN_SAVE === true  ) {
		
		$('.alert-product-saved').removeClass('hide');
	} else {
		$('#general-information-panel').collapse('show');
		$formErrors.filter(':first').focus();
	}
	
});



$('.alert-product-saved').on('close.bs.alert', function () {
	$(this).addClass('hide');
	return false;
})



$('.config-attr-vals-body .select-all-link').on('click', function () {
	var $this = $(this);
	var $checkboxes = $this.closest('.config-attr-vals-body').find('input[type="checkbox"]');
	
	if ( $this.text() == 'Select All' ) {
		$checkboxes.prop('checked', true).trigger('change');
		$this.text('Deselect All');
	} else {
		$checkboxes.prop('checked', false).trigger('change');
		$this.text('Select All');
	}
	
});



// Checking the attributes value events 
$('[name*="attr-vals-"').on('change', function () {
	var $this = $(this);
	var val = $this.val();
	var attr = $this.data('attr');
	//console.log($('tr.attr-' + attr + '-' + val ));
	if ( $(this).prop( "checked" ) ) {
		$('.config-attribute-' + attr + '-' + val ).removeClass('hide');
		$('tr.attr-' + attr + '-' + val ).addClass('has-' + attr);
	} else {
		$('.config-attribute-' + attr + '-' + val ).addClass('hide');
		$('tr.attr-' + attr + '-' + val ).removeClass('has-' + attr);
	}
	showConfigProducts();
});



// Update the grid
var showConfigProducts = function () {
	var n = 0;
	var $counter = $('.config-products-count');
	var $new = $('.config-products-new');
	var $newCount = $new.find('.config-products-new-count');
	var $table = $('table.config-products');
	var newProductsCount = 0;
	
	$table.each( function () {
		
		var $products = $(this).find('tbody tr');	
		n = 0;
		newProductsCount = 0;
	
		$products.each( function () {
			
			var $product = $(this);
	
			if ( $product.hasClass('has-color') && $product.hasClass('has-width') && $product.hasClass('has-size') ) {
				
				if( $product.hasClass('hide') ) {
					$product.addClass('new');
					
					$product.find('input[type="checkbox"]').prop('checked',true);
					newProductsCount++;
				}
				$product.removeClass('hide');
				n++;
				
			} else {
				$product.addClass('hide');
				$product.removeClass('new');
			}

		});
		
	});
	
	$counter.text(n);
	
	
	/*
	if ( updatedProducts ) {
		$updated.removeClass('hide');
		$updatedCount.text( updatedProducts );
	} else {
		$updated.addClass('hide');
	}*/
	
	
	if ( $createdProducts.length > newProductsCount ) {
		$new.removeClass('hide');
		$newCount.text( newProductsCount );
	} else {
		$new.addClass('hide');
	}
}

// Assign images to product grid
$('#next_button2').on('click', function () {
	
	$('.image-config-attribute-color [class*="config-attribute-color"]').each(function () {
		var $this = $(this);
		if (!$this.hasClass('hide') ) {
			var color = $this.data('color');
			var $images = $this.find('.dz-image img');
			$('table.config-products .attr-color-' + color ).find('.images').append( $images.filter(':first') );
			//'images'
			//console.log(color);
		}
	});

});

// Assign one price
$('#price-config-price').on('change',function () {
	var val = $(this).val();
	if (val) {
		$('table.config-products .price').text(val);
		$('table.config-products .form-control.price').val(val);
	}	
});


// Assign individual price 
$('[id*="price-config-multiple-"]').on('change', function () {
	var $this = $(this);
	var val = $this.val();
	var id = $this.data('id');
	var attr = $this.data('attr');
	var $products = $('table.config-products .attr-' + attr + '-' + id);
	if (val) {
		$products.find('.price').text(val);
		$products.find('.form-control.price').val(val);
	}
	if ( $createdProducts.length ) {
		updateCheckboxes();
		$products.filter(':not(.hide)').addClass('updated').find('input[type="checkbox"]').prop('checked',true);
		countUpdatedProduct();
	}
});

// Assign one inventory
$('#inventory-config-qty').on('change',function () {
	var val = $(this).val();
	if (val) {
		$('table.config-products .qty').text(val);
		$('table.config-products .form-control.qty').val(val);
	}	
});

// Assign individual inventory
$('[id*="inventory-config-multiple-"]').on('change', function () {
	var $this = $(this);
	var val = $this.val();
	var id = $this.data('id');
	var attr = $this.data('attr');
	var $products = $('table.config-products .attr-' + attr + '-' + id);
	
	if (val) {
		$products.find('.qty').text(val);
		$products.find('.form-control.qty').val(val);
	}
	if ( $createdProducts.length ) {
		updateCheckboxes();
		$products.filter(':not(.hide)').addClass('updated').find('input[type="checkbox"]').prop('checked',true);
		countUpdatedProduct();
	}
});


var UPDATED_COUNT = 0;
function countUpdatedProduct() {
	$table = $('table.config-products');
	var $updated = $('.config-products-updated');
	var $updatedCount = $updated.find('.config-products-updated-count');
	
	$table.each( function () {
		UPDATED_COUNT = 0;
		$products = $(this).find('tbody tr');
		$products.each( function () {
			$product = $(this);
			if ($product.hasClass('updated') ) {
				UPDATED_COUNT++;
			}
		});
		
	});
	
	if ( UPDATED_COUNT ) {
		$updated.removeClass('hide');
		$updatedCount.text( UPDATED_COUNT );
	} else {
		$updated.addClass('hide');
	}

};


function updateCheckboxes () {
	
	$('table.config-products tr').each( function () {
		$p = $(this);
		if ( !$p.hasClass('updated') ) {
			$p.find('input[type="checkbox"]').prop('checked',false);
		}
	});
	
}


// Assign images to configuration
$('[name="image-config"]').on('change', function () {
	var val = $(this).val();
	
	switch(val) {
		case 'single':
		$('.image-config-single').removeClass('hide');
		$('.image-config-multiple').addClass('hide');
		break;
		
		case 'multiple':
		$('.image-config-multiple').removeClass('hide');
		$('.image-config-single').addClass('hide');
		break;
		
		case 'skip':
		$('.image-config-multiple').addClass('hide');
		$('.image-config-single').addClass('hide');
	}
	$(window).trigger('resize');
	
});

$('.image-config-select-attribute').on('change', function () {
	var val = $(this).val();
	
	$('[class*="image-config-attribute-"').addClass('hide');
	if ( val ) {
		$('.image-config-attribute-' + val).removeClass('hide');
	}
	$(window).trigger('resize');
});




// Assign prices to configuration
$('[name="price-config"]').on('change', function () {
	var val = $(this).val();
	
	switch(val) {
		case 'single':
		$('.price-config-single').removeClass('hide');
		$('.price-config-multiple').addClass('hide');
		break;
		
		case 'multiple':
		$('.price-config-multiple').removeClass('hide');
		$('.price-config-single').addClass('hide');
		break;
		
		case 'skip':
		$('.price-config-multiple').addClass('hide');
		$('.price-config-single').addClass('hide');
	}
	$(window).trigger('resize');

});

$('.price-config-select-attribute').on('change', function () {
	var val = $(this).val();
	
	$('[class*="price-config-attribute-"').addClass('hide');
	if ( val ) {
		$('.price-config-attribute-' + val).removeClass('hide');
	}
	$(window).trigger('resize');
});


// Assign qty to configurations 
$('[name="inventory-config"]').on('change', function () {
	var val = $(this).val();
	switch(val) {
		case 'single':
		$('.inventory-config-single').removeClass('hide');
		$('.inventory-config-multiple').addClass('hide');
		break;
		
		case 'multiple':
		$('.inventory-config-multiple').removeClass('hide');
		$('.inventory-config-single').addClass('hide');
		break;
		
		case 'skip':
		$('.inventory-config-multiple').addClass('hide');
		$('.inventory-config-single').addClass('hide');
	}
	$(window).trigger('resize');
	
});
$('.inventory-config-select-attribute').on('change', function () {
	var val = $(this).val();
	
	$('[class*="inventory-config-attribute-"').addClass('hide');
	if ( val ) {
		$('.inventory-config-attribute-' + val).removeClass('hide');
	}
	$(window).trigger('resize');
});





var $createdProducts = '';
// CLicking final save button in wizard 
$('.second-wizard-save-button').on('click',function () {
	//$( 'table.config-products' ).clone().appendTo( '#configurable-table' );
	$('#configurable-table').removeClass('hide');
	$('.btn-create-configurations').addClass('hide');
	$('.btn-edit-configurations').removeClass('hide');
	$('#config-1').modal('hide');
	
	$('table.config-products tbody tr').removeClass('updated').removeClass('new');
	$('.config-products-new').addClass('hide');
	updateCheckboxes();
	$createdProducts = $('table.config-products tbody').filter(':first').find('tr:not(.hide)');
	
	
	
	// Reset Wizard to first step:
	$('#steps_bar_2 li').removeClass('active').filter(':first').addClass('active');
	$('.wizard-step').hide().filter(':first').show();
	$('.wizard-end').hide();
	$('#next_button2').show();
	$('#back_button2').addClass('disabled');
	$('#steps_bar_2').data( 'current_step_2', $("#contentOfStep_2") );
	$('#steps_bar_2').data( 'current_li_2', $("#wizard-step-2") );
	/*
	current_step_2 = $("#contentOfStep_2"); //set current step to cotent of step 1
	next_step_2 = null;
	prev_step_2 = null;
	num_steps_in_progress_2 = $("#steps_bar_2 > li").length;
	current_li_2 = $("#wizard-step-2");
	next_li_2 = null; 
	prev_li_2 = null;
	
	*/
	
	
	
	
});




// remove product from configurable table 
// TODO: add undo
$('.configurable-table-remove').on('click',function () {
	var $this = $(this);
	$this.closest('tr').remove();
})


















// downlodable-link-switcher
$('.downlodable-link-switcher .donwloadable-url').on('focus',function () {
	$(this).parent().find('.radio-mage').prop('checked',true);
});

$('.downlodable-link-switcher .donwloadable-file').on('focus',function () {
	$(this).parent().find('.radio-mage').prop('checked',true);
});


$('.downlodable-link-switcher .donwloadable-file').on('focus',function () {
	$(this).parent().find('.radio-mage').prop('checked',true);
});

$('.downloadable-links .btn-delete, .downloadable-samples .btn-delete').on('click', function () {
	$(this).closest('tr').remove();
});




$('.downloadable-links .btn-add-row, .downloadable-samples .btn-add-row').on('click', function () {
	var $this = $(this);
	var $tbody = $this.parent().parent().find('tbody');
	var $row = $tbody.find('tr').filter(':last').clone(true);
	//console.log($row);
	$row.appendTo($tbody);
	
});



/*
onClick="javascript:hideContent('related-products-control-1');revealContent('related-products-control-2');revealContent('related-products-addition');$('#select-related-products').modal('hide');"
*/

// Hello world
/*
$('.collapse').on('shown.bs.collapse', function(){
$(this).parent().find(".glyphicon-chevron-up").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
}).on('hidden.bs.collapse', function(){
$(this).parent().find(".glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
});
*/
function toggleClass(el){

	if(el.className == "toggle-off"){
		el.className = "toggle-on";
		el.innerHTML = 'Include';
	} else {
		el.className = "toggle-off";
		el.innerHTML = 'Exclude';
	}
}


function revealContent(elem){
  	/*alert(document.getElementById(elem).style.display)*/
  	document.getElementById(elem).style.display = 'block';
}


function hideContent(elem){
	/*alert(document.getElementById(elem).style.display)*/
  	document.getElementById(elem).style.display = 'none';
}

function selectImage(pict){
	if(pict.className == "image-off"){
		pict.className = "image-on";
	} else {
		pict.className = "image-off";
	}


}


function deselectImages(){

	document.getElementById('shoe-image-table-1a').className = "toggle-off";
	document.getElementById('shoe-image-table-1b').className = "toggle-off";
	document.getElementById('shoe-image-table-1c').className = "toggle-off";
	document.getElementById('shoe-image-table-1d').className = "toggle-off";
	document.getElementById('shoe-image-table-1e').className = "toggle-off";
	document.getElementById('shoe-image-table-1f').className = "toggle-off";
	document.getElementById('shoe-image-table-1g').className = "toggle-off";
}

function brownshoes(){
	
	document.getElementById('brownshoe1').src = 'img/product-images/product-22.gif';
	document.getElementById('brownshoe2').src = 'img/product-images/product-22.gif';
	document.getElementById('brownshoe3').src = 'img/product-images/product-22.gif';

}

function redshoes(){
	
	document.getElementById('redshoe1').src = 'img/product-images/product-21.gif';
	document.getElementById('redshoe2').src = 'img/product-images/product-21.gif';
	document.getElementById('redshoe3').src = 'img/product-images/product-21.gif';

}

function blackshoes(){
	
	document.getElementById('blackshoe1').src = 'img/product-images/product-20.gif';
	document.getElementById('blackshoe2').src = 'img/product-images/product-20.gif';
	document.getElementById('blackshoe3').src = 'img/product-images/product-20.gif';

}
