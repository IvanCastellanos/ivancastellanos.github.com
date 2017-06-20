$(document).ready(function(){
  $(".item-top").click(function(){
    $(this).next(".item-bottom").slideToggle("slow");
  });


  $(".item-top").mouseenter(function(){
      $(this).next(".quick-comment").addClass("quick-comment-rotate");
  });

  $(".item-top").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",function(){
    $(this).next(".quick-comment").removeClass('quick-comment-rotate');
  });
});
