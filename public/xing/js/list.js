function GetNewsList(type, typeName, page, divId){
    var userAgent = navigator.userAgent.toLowerCase();
    var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
    var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
    typeName = document.charset == 'utf-8' ? encodeURIComponent(typeName) : typeName;
    $.ajax({
        type: 'get',
        url: '/ajax.php?op=getnewslist&type='+ type + '&typename=' + typeName + '&cid=' + _LIST.cid + '&subcid=' + _LIST.subcid + '&page=' + page + '&r=' + Math.random(),
        beforeSend: function(){
            $('#' + divId).html('<div class="plus"><img src="/images/index_82.gif" /><h4><span class="grey">正在加载...</span></h4></div>');
        },
        success: function(s) {
            $('#' + divId).html(s);
            $("html,body").animate({scrollTop:625});
            initTips();
        },
        error: function(s) {
        }
    });
}
$(function(){
    $('#divAuthor').ss(5000);
    $('.vision .bot ul li:nth-child(even)').css({'padding-right' : '0px'});
    $('#divFocus ul li').hover(
        function(){
            $(this).find('.ttt').addClass('tt');
        },
        function(){
            $(this).find('.ttt').removeClass('tt');
        }
    );
    //市场行情
    function GetQuoteData(){
        $.ajax({
            type: 'get',
            url: '/ajax.php?op=market&r=' + Math.random(),
            success: function(s) {
                $('#divMarket').html(s);
            },
            error: function(s) {
            }
        });
    }
    GetQuoteData();
    window.setInterval(GetQuoteData, 60 * 1000);
});