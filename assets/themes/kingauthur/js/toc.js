//在文章中查找title并填充到div AnchorContent中
$(".post").find("h2,h3").each(function(i,item){
    var tag = $(item).get(0).localName;
    $(item).attr("id","wow"+i);
    $("#AnchorContent").append('<li><a class="new'+tag+' anchor-link"  onclick="return false;"  href="#"  link="#wow'+i+'">'+$(this).text()+'</a></li>');
    $(".newh2").css("margin-left",0);
    $(".newh3").css("margin-left",20);
});

$("#AnchorContentToggle").click(function(){
    var text = $(this).html();
    if(text=="目录[-]"){
        $(this).html("目录[+]");
        $(this).attr({"title":"展开"});
    }else{
        $(this).html("目录[-]");
        $(this).attr({"title":"收起"});
    }
    $("#AnchorContent").toggle();
});
