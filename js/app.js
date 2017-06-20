

function tpl(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}



function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init(){
  gapi.client.setApiKey("AIzaSyDy_TnEcb4B2eDXI6u2BdbTgNOILq8NPdw");
  gapi.client.load("youtube", "v3", function() {
    //ready to search

    $("form").on("submit", function(e){
      e.preventDefault();
      // prepare the request
      var request = gapi.client.youtube.search.list({
        part: "snippet",
        type: "video",
        q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
        maxResults: 5,
        order: "relevance",
        safeSearch: "none",
        topicId: "/m/01k8wb",
      });
      //execute that request
      request.execute(function(response) {
            var results = response.result;
            $("#results").html("");
            $.each(results.items, function(index, item) {
              $.get("tpl/item.html", function(data) {
                  $("#results").append(tpl(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
              });
            });
            resetVideoHeight();
         });
      });

      $("#lectures").on("click", function(e){
        e.preventDefault();
        // prepare the request
        var request = gapi.client.youtube.search.list({
          part: "snippet",
          type: "video",
          q: encodeURIComponent($("#search").val() + "lecture").replace(/%20/g, "+"),
          maxResults: 5,
          order: "relevance",
          safeSearch: "none",
          topicId: "/m/01k8wb",
          videoDuration: "long",
        });
        //execute that request
        request.execute(function(response) {
              var results = response.result;
              $("#results").html("");
              $.each(results.items, function(index, item) {
                $.get("tpl/item.html", function(data) {
                    $("#results").append(tpl(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
                });
              });
              resetVideoHeight();
           });
        });

      $(window).on("resize", resetVideoHeight);

  });
}
