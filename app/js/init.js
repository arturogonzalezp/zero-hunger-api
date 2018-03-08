String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};
(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('#upload-button').click(function(event){
      $(this).attr("disabled","true");
      Materialize.toast("Uploaded idea");
    });
    $("#")

  }); // end of document ready
})(jQuery); // end of jQuery name space

function updateId(){
  var title = $("#tutorial-title").val();
  $("#tutorial-id").val(title.toLowerCase().replaceAll(" ", "-"));
}