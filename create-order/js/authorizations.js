$( document ).ready(function() { 
	var $modal = $('#new-authorization-slide-in');
	var $capture_modal = $('#capture-authorization-slide-in');
	var $order_authorizations = $('.order-authorizations-table');
	var $toggles = $('#new-authorization-slide-in .toggle-on, #new-authorization-slide-in .toggle-off');
	var $qty_inputs = $('#new-authorization-slide-in .order-products-table input[type="number"]');
	var $alert_success = $('.alert-authorize-success');
	var $alert_capture_success = $('.alert-capture-success');
	
	var $authorize_btn = $('#authorize-btn');
	
	$order_authorizations.find('tr').on( 'click', function () {
		var $row = $(this);
		var status = $row.find('.status').text();
		$('.alert-warning').addClass('hidden');
		if ( status == 'Authorized' ) {
			$capture_modal.modal('show');
			
		} else {
			$modal.modal('show');
		}	
		
	});
	
	
	$authorize_btn.on('click', function () {
		
		var $row = $order_authorizations.find('tr').filter(':last');
		var $row = $row.clone(true, true);
		var $id = $row.find('.id');
		var amount = parseFloat( $('.grand-total-amount').text() );
		console.log(amount);
		if ( amount!= 0) {
			$modal.modal('hide');
			
			$id.text( parseInt ( $id.text()) + 1 );
			$row.find('.amount').text( amount );
			$row.find('.status').text( 'Authorized' );
			$row.appendTo( $order_authorizations.find('tbody') );
			$row.find('.capture-action').parent().show();
			
			$alert_success.find('.amount').text( amount );
			$alert_success.removeClass('hidden');
			$alert_capture_success.addClass('hidden');

			
		} else {
			$('.alert-warning').removeClass('hidden');
		}
		
		
	});
	
	
	var $new_authorization = $('.new-authorization-button');
	$new_authorization.on('click', function () {
		$('.alert-warning').addClass('hidden');
	});
	
	
	var $capture_btn = $('.capture-action');
	/*
	$capture_btn.on('click', function () {
		var $btn = $(this);
		var $row = $btn.closest('tr');
		var $status = $row.find('.status');
		
		$alert_success.addClass('hidden');
		$alert_capture_success.removeClass('hidden');
		
		$status.text('Captured');
		$btn.parent().hide();	
			
		
	});*/
	
	var $submit_capture_btn = $('#submit-capture-btn');
	$submit_capture_btn.on('click', function () {
		
		
		$alert_success.addClass('hidden');
		$alert_capture_success.removeClass('hidden');
		
		$capture_modal.modal('hide');
		
	});
	
	var $reauthorize_btn = $('.reauthorize-action');
	$reauthorize_btn.on('click', function () {
		var $btn = $(this);
		var $row = $btn.closest('tr');
		var $status = $row.find('.status');
		
		
		$status.text('Authorized');
		$row.find('.capture-action').parent().show();
		//$btn.parent().hide();
	});
	
	
	$qty_inputs.on('change', function () {
		updateAuthTotals();
	});
	
	$toggles.on( 'click', function () {
		var $toggle = $(this);
		var $row = $toggle.closest('tr');
		var $qty_input = $row.find('input[type="number"]');
		
		//toggle disabled property
		$qty_input.prop('disabled',function(i, v) { return !v; });
		updateAuthTotals();
		
	});
	updateAuthTotals();
});


function updateAuthTotals () {
	
	var $rows = $('#new-authorization-slide-in .order-products-table tbody tr');
	var $sub_total = $('.subtotal-amount');
	var $tax_total = $('.tax-total-amount');
	var $grand_total = $('.grand-total-amount');
	var $warning = $('.alert-warning');
	
	var subtotal = 0;
	var tax = 0;
	var grand = 0;
	

	$rows.each(function () {
		var $row = $(this);
		//var $row_toggle = $row.find('.toggle-on, .toggle-off');
		var $row_qty = $row.find('input');
		
		if ( !$row_qty.prop('disabled') ) { 
			var $row_price = $row.find('.row-price');
			var $row_subtotal = $row.find('.row-subtotal');
			var $row_tax = $row.find('.row-tax');
			var $row_total = $row.find('.row-total');
			
			var row_price = parseFloat( $row_price.text() );
			var row_qty = parseInt( $row_qty.val() );
			var row_tax = parseFloat( $row_tax.text() );
			var row_subtotal = row_price * row_qty;
			var row_total = row_subtotal + row_tax;
			
			$row_subtotal.text( row_subtotal.toFixed(2) );
			$row_total.text( row_total.toFixed(2) );
			
			subtotal += row_subtotal;
			tax += row_tax;
			
			
		}
		
	});
	
	
	grand = subtotal + tax;
	
	if ( grand == 0 ) {
		$warning.removeClass('hidden');
	} else {
		$warning.addClass('hidden');
	}
	
	
	
	$sub_total.text( subtotal.toFixed(2) );
	$tax_total.text( tax.toFixed(2) );
	$grand_total.text( grand.toFixed(2) );

	
} 