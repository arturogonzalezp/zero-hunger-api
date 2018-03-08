String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};
(function ($) {
  $(function () {

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('#upload-button').click(function (event) {
      $(this).attr("disabled", "true");
      Materialize.toast("Uploaded idea");
    });
    $("#upload-button").click(function (event) {

      var returnObject = {};
      var files = $("#file-source")[0].files;

      var r = new FileReader();
      
      r.onload = function () { 
        returnObject = {
          id: $("#tutorial-id").val(),
          title: $("#tutorial-title").val(),
          content: r.result
        };
  
        console.log(returnObject);
      };
      r.readAsBinaryString(files[0]);

    });

  }); // end of document ready
})(jQuery); // end of jQuery name space

function updateId() {
  var title = $("#tutorial-title").val();
  $("#tutorial-id").val(title.toLowerCase().replaceAll(" ", "-"));
}