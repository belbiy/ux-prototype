

/*Grid-List View Toggle Function*/
function gridListViewToggle(idGrid, idList, currentIsGridOrList){
	if( currentIsGridOrList == "grid"){
		$(idGrid).addClass("selected");
		$(idList).removeClass("selected");
	}else if(currentIsGridOrList == "list"){
		$(idList).addClass("selected");
		$(idGrid).removeClass("selected");
	}
}

/*Grid-List View Toggle in Product-System Generated*/

$("#toggle-grid-view").click(function(){
	gridListViewToggle("#toggle-grid-view","#toggle-list-view","grid");
	$("#product-system-grid-view").show();
	$("#product-system-list-view").hide();
});

$("#toggle-list-view").click(function(){
	gridListViewToggle("#toggle-grid-view","#toggle-list-view","list");
	$("#product-system-list-view").show();
	$("#product-system-grid-view").hide();
});


/*Grid-List View Toggle in Product-Customized Results*/

$("#toggle-grid-view-2").click(function(){
	gridListViewToggle("#toggle-grid-view-2","#toggle-list-view-2","grid");
	$("#product-customized-grid-view").show();
	$("#product-customized-list-view").hide();
	$("#search-filter-on-grid").hide();
});

$("#toggle-list-view-2").click(function(){
	gridListViewToggle("#toggle-grid-view-2","#toggle-list-view-2","list");
	$("#product-customized-list-view").show();
	$("#product-customized-grid-view").hide();
	$("#search-filter-on-grid").show();
});


/*Add Hero Products triggered*/

$("#add-hero-done").click(function(){
	$("#system-generated-cardview-img-hero").show();
	$("#system-generated-cardview-img").hide();
});



/*Related Terms*/
$("#save-related-terms").click(function(){
	
	$("#empty-related-terms").hide();
	$("#added-related-terms").show();
});

/*Redirect URL*/
/*$("#toggle-url-redirect").click(function(){

	if(this.className == "toggle-off"){
		$('.not-redirect-url').toggle();
		$('#redirect-url-input').toggle();
		$('#product-tab').removeClass("disabled");
		$('#content-tab').removeClass("disabled");
		
	} else {
		$('.not-redirect-url').toggle();
		$('#redirect-url-input').toggle();
		$('#product-tab').addClass("disabled");
		$('#content-tab').addClass("disabled");
		
	}
});*/

$("#checkbox-url-redirect").change(function() {
    if(this.checked) {
		$('.not-redirect-url').toggle();
		$('#redirect-url-input').toggle();
		$('#product-tab').addClass("disabled");
		$('#content-tab').addClass("disabled");    
	} else {
		$('.not-redirect-url').toggle();
		$('#redirect-url-input').toggle();
		$('#product-tab').removeClass("disabled");
		$('#content-tab').removeClass("disabled");
	}
});


/*Products results*/
$(document).ready(function(){
    $('input[type="radio"]').click(function(){
        if($(this).attr("value")=="system-generated-product-results"){
            $("#default-generated-results").show();
            $("#customized-results").hide();
        }
        if($(this).attr("value")=="customized-product-results"){
            $("#default-generated-results").hide();
            $("#customized-results").show();
        }
    });
});


/*Synonyms*/
$("#save-synonyms").click(function(){
	$("#success-message-synonyms").show();
	$("#new-synonym-added").show();
	$("#success-message-synonyms").delay(1000).fadeOut();
});


