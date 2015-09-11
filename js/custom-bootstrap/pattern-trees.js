$(function () {


   // add toggles to the nodes
   var $collapseToggle = $('<span class="collapse-toggle">');

   $('.tree li').append( $collapseToggle );
   $('.tree li > ul').addClass('children');

   $('.tree li:has(.children)').addClass('parent_li').find(' > .collapse-toggle').attr('title', 'Collapse this branch');

   $('.tree .collapse-toggle').on('click', function (e) {
      e.stopPropagation();

      var $node = $(this).parent('li');
      var $children = $node.find(' > ul > li');

      if ( $children.is(":visible") ) {
         $children.hide('fast');
         $node.addClass('collapsed');
      } else {
         $children.show('fast');
         $node.removeClass('collapsed');
      }

   });



   $('.collapse-all').click( function(e){
      e.preventDefault();

      if($(this).hasClass("collapse-all")){
           $(".tree").find(' ul > li > ul > li > span >i').addClass('icon-close').removeClass('icon-open');
           var child = $(".tree").find(' ul > li > ul > li >ul >li');
           child.hide('fast');
           $(this).removeClass('collapse-all');
           $(this).addClass('expand-all');
           //document.getElementById("expand-collpase-all").innerHTML = "Expand All";
       }else{
           child = $(".tree").find(' ul > li > ul > li >ul >li');
           $(".tree").find(' ul > li > ul > li > span > i').addClass('icon-open').removeClass('icon-close');
           child.show('fast');
           $(this).removeClass('expand-all');
           $(this).addClass('collapse-all');
           //document.getElementById("expand-collpase-all").innerHTML = "Collapse All";
       }


   });

});
