$(function(){
    //tabs
    // $("#tabs").on("click", ".site-tabs_btn:not(.site-tabs_btn--active)", function() {
    //     $(this).addClass("site-tabs_btn--active").siblings().removeClass("site-tabs_btn--active").parents(".site-tabs-wrap").find(".site-tabs-content").eq($(this).index()).addClass('site-tabs-content--ative').siblings(".site-tabs-content").removeClass('site-tabs-content--ative');
    // });

    //upload file btn
    // $("form").on("change", ".btn-upload input[type=file]", function(){
    //     $(this).parent(".btn-upload").attr("data-text", $(this).val().replace(/.*(\/|\\)/, '') );
    // });

    //scrollbar
    // $('.site-scrollbar').overlayScrollbars({
    //     autoUpdate: true,
    //     className: "os-theme-thick-dark",
    //     scrollbars : {
    //         visibility: "hidden"
    //     }
    // });

    //popups - //dimsemenov.com/plugins/magnific-popup/documentation.html
	//open popup div (inline type)
    // $(document).on('click', '.popup-inline', function(){
    //     var openWindowId = $(this).attr('href') || $(this).data('popup-id');
    //     $.magnificPopup.open({
    //         closeBtnInside: false,
    //         fixedContentPos: true,
    //         showCloseBtn: true,
    //         items: {
    //             src: $(openWindowId),
    //             type: 'inline'
    //         }
    //     }, 0);
    //     return false;
    // });
    //picture group
    // $('.magnific-popup-images').magnificPopup({
    //     closeBtnInside: false,
    //     fixedContentPos: true,
    //     mainClass: 'mfp-margins-site mfp-with-zoom',
    //     delegate: 'a', // child items selector, by clicking on it popup will open
    //     type: 'image',
    //     gallery: {
    //         enabled: true,
    //         tPrev: 'Previous', // title for left button
    //         tNext: 'Next', // title for right button
    //         tCounter: '', // <span class="mfp-counter">%curr% of %total%</span> // markup of counter
    //         preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    //     },
    //     image: {
    //         verticalFit: true
    //     },
    //     zoom: {
    //       enabled: true,
    //       duration: 300 // don't foget to change the duration also in CSS
    //     }
    // });

    
});