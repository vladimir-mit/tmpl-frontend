$(function(){
    //tabs
    $("#tabs").on("click", ".site-tabs_btn:not(.site-tabs_btn--active)", function() {
        $(this).addClass("site-tabs_btn--active").siblings().removeClass("site-tabs_btn--active").parents(".site-tabs-wrap").find(".site-tabs-content").eq($(this).index()).addClass('site-tabs-content--ative').siblings(".site-tabs-content").removeClass('site-tabs-content--ative');
    });

    
});