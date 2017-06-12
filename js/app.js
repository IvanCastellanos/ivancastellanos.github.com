$(function(){
  $("form").on("submit", function(e){
    e.preventDefault();
    // prepare the request
    var request = gapi.client.youtube.search.list({
      part: "snippet",
      type: "video",
      q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
      maxResults: 5,
      order: "viewCount",
    });
    //execute that request
    request.execute(function(response){
      console.log(response);
    });
  });
});

function init(){
  gapi.client.setApiKey("AIzaSyDy_TnEcb4B2eDXI6u2BdbTgNOILq8NPdw");
  gapi.client.load("youtube", "v3", function() {
    //ready to search
  });
}
