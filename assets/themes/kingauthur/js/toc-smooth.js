$(".anchor-link").click(function(){
    $("html,body").animate({scrollTop: $($(this).attr("link")).offset().top}, 618);
});
