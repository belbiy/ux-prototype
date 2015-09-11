

//----------Installation Text on Progress Bar & Console-------------------

  $('#step-1').delay(2000).hide(0);
  $('#step-2').delay(2000).show(0);
  $('#step-2').delay(2000).hide(0);
  $('#step-3').delay(4000).show(0);
  $('#step-3').delay(2000).hide(0);
  $('#step-4').delay(6000).show(0);




$('.console-log').click(function() {
    $('.console-log-content').toggle(0);
    $('.open-console').toggle(0);
    $('.close-console').toggle(0);

});


$("#start-downloading").click(function(){
    setTimeout("window.location='readinessCheckLanding-addComp.html'",2000);
});

