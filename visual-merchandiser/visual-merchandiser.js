$(document).ready(function() {


   $(".card-seven").click(function() {

   	// hides card seven
   	$( ".card-seven" ).removeClass("card-show");

   	// Card seven - fade out card seven
   	$( ".card-seven" ).fadeOut("slow", function() {
   		$(this).addClass("card-hide");
   	});
   	


   	// shows card one
   	$( ".card-one" ).addClass("card-show");

   	// delays until card seven is completely faded out, then fades in card one
   	$( ".card-one" ).delay(1500).fadeIn("slow", function() {
   		$(this).removeClass("card-hide");
   	});

      // delays until card seven is completely faded out, then fades in card one
      $( ".card-one img" ).delay(1500).fadeIn("slow", function() {
         $(this).addClass("highlight");
      });


   });


   $(".card-five").click(function() {

      // hides card seven
      $( ".card-five" ).removeClass("card-show");

      // Card seven - fade out card seven
      $( ".card-five" ).fadeOut("slow", function() {
         $(this).addClass("card-hide");
      });
      


      // shows card one
      $( ".card-two" ).addClass("card-show");

      // delays until card seven is completely faded out, then fades in card one
      $( ".card-two" ).delay(1500).fadeIn("slow", function() {
         $(this).removeClass("card-hide");
      });

      // delays until card seven is completely faded out, then fades in card one
      $( ".card-two img" ).delay(1500).fadeIn("slow", function() {
         $(this).addClass("highlight");
      });


   });

      $(".card-four").click(function() {

      // hides card seven
      $( ".card-four" ).removeClass("card-show");

      // Card seven - fade out card seven
      $( ".card-four" ).fadeOut("slow", function() {
         $(this).addClass("card-hide");
      });
      


      // shows card one
      $( ".card-three" ).addClass("card-show");

      // delays until card seven is completely faded out, then fades in card one
      $( ".card-three" ).delay(1500).fadeIn("slow", function() {
         $(this).removeClass("card-hide");
      });

      // delays until card seven is completely faded out, then fades in card one
      $( ".card-three img" ).delay(1500).fadeIn("slow", function() {
         $(this).addClass("highlight");
      });


   });

     $(".btn-group grid-toggle").click(function() {

      // hides cards
      $( ".cardview" ).removeClass("grid-show");

      // Cards - fade out grid view
      $( ".cardview" ).fadeOut("slow", function() {
         $(this).addClass("grid-hide");
      });
      


      // shows card one
      $( ".gridview" ).addClass("grid-show");

      // delays until card seven is completely faded out, then fades in card one
      $( ".gridview" ).delay(1500).fadeIn("slow", function() {
         $(this).removeClass("grid-hide");
      });


   });


});


