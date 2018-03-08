String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};
(function ($) {
  $(function () {

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $("#upload-button").click(function (event) {
      $(this).attr("disabled", "true");
      var returnObject = {};
      var files = $("#file-source")[0].files;


      var accept = {
        application: ["application/zip"]
      };

      var r = new FileReader();

      r.onload = function () {
        returnObject = {
          id: $("#tutorial-id").val(),
          title: $("#tutorial-title").val(),
          imageUrl: $("#image-url").val(),
          content: new String(r.result)
        };
        postToServer(returnObject,function(result){
          Materialize.toast("Uploaded idea", 4000);
          $(this).attr("disabled", "true");
        });
      };
      r.readAsBinaryString(files[0]);

    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
function updateId() {
  var title = $("#tutorial-title").val();
  $("#tutorial-id").val(title.toLowerCase().replaceAll(" ", "-"));
}
function postToServer(object, callback) {
  $.post("http://localhost/post/tutorial",object)
    .done(function (result) {
      callback(result);
    })
    .fail(function () {
      Materialize.toast("ERROR", 4000);
    });
}