<!DOCTYPE HTML>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta http-equiv="cache-control" content="no-siteapp">
    <title>{{config('webset.webname')}}-{{config('webset.websubname')}}-@yield('title')</title>
    <meta name="keywords" content="{{config('webset.webkeywords')?config('webset.webkeywords'):'全网vip免费看'}}">
    <meta name="description" content="{{config('webset.webdesc')?config('webset.webdesc'):'全网vip免费看'}}">
    <link rel="stylesheet" href="/static/wapian/css/bootstrap.min.css"/>
    <link href="/static/wapian/css/swiper.min.css" rel="stylesheet" type="text/css">
    <link href="/static/wapian/css/iconfont.css" rel="stylesheet" type="text/css"/>
    <link href="/static/wapian/css/blackcolor.css" rel="stylesheet" type="text/css"/>
    <link href="/static/wapian/css/style.min.css" rel="stylesheet" type="text/css"/>
    <script type='text/javascript' src="/static/wapian/js/swiper.min.js"></script>
    <script type='text/javascript' src="/static/wapian/js/system.js"></script>
    <script src="/static/wapian/js/jquery.min.js"></script>
    <script type="text/javascript" src="/static/wapian/js/su.js"></script>
	<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <!--[if lt IE 9]>
    <script src="/static/wapian/js/html5.js"></script><![endif]-->
    @section('other')
     @show
    <style>
        #ys {
            background: deepskyblue;
            color: black;
        }
        .jkbtn{
            background: deepskyblue;
            color: black;
        }
		#background {
		position: fixed;
		top: 0;
		left: 0;

		z-index: -100;
		}
		.xwcms {
			-webkit-transition: -webkit-transform 0.5s ease-out;
			-moz-transition: -moz-transform 0.5s ease-out;
			-o-transition: -o-transform 0.5s ease-out;
			-ms-transition: -ms-transform 0.5s ease-out;
		}
		.xwcms:hover {
			-webkit-transform: rotateY(360deg);
			-moz-transform: rotateY(360deg);
			-o-transform: rotateY(360deg);
			-ms-transform: rotateY(360deg);
			transform: rotateY(360deg);
		}
    </style>
</head>
<body class="@yield('body')">
<div class="hy-head-menu">
    <div class="container">
				 <div>
                {!! config('adconfig.index_top') !!}
            </div>
        <div class="row">
            <div class="item">
                <div class="logo">
                    <a class="hidden-sm hidden-xs" href="/"><img src="/static/wapian/images/logo.png" height="50px" width="150px" alt="好看的电影,VIP电影免费看"/></a>
                </div>
                <div class="search hidden-sm">
                    <div id="ff-search" role="search">
                        <input class="form-control" placeholder="输入影片关键词..." type="text" id="ff-wd" name="wd" required="">
                        <input type="submit" class="hide"><a href="javascript:" class="btns" title="搜索" id="sousuo"><i class="icon iconfont icon-search"></i></a>
                    </div>
                </div>
                <ul class="menulist hidden-xs">
                    @if($navlist)
                     @foreach($navlist as $v)
                    <li id="nav-index"><a href="{{$v['navaddr']}}">{{$v['navname']}}</a></li>
                     @endforeach
                    @else
                     @endif
                    <li id="nav-down">{!! config('appconfig.isdh')?'<a href="/app.html" target="_blank">'.config('appconfig.appdh').'</a>':'' !!}</li>
                </ul>
            </div>
        </div>
    </div>
</div>
@section('content')
@show
<div class="hy-gototop hidden-sm hidden-xs">
    <ul class="item clearfix">
		<li><a class="" href="javascript:#" title="二维码" onclick="ewm()" style="z-index:9999999;color:#fff;">手机</a></li>
		<li><a class="" href="javascript:#" title="开关灯" onclick="kg()" id="kg" style="z-index:9999999;color:#fff;">关灯</a></li>
        <li><a data-toggle="tooltip" data-placement="top" class="" href="javascript:scroll(0,0)" title="返回顶部"><i class="icon iconfont icon-uparrow"></i></a></li>
    </ul>
</div>
<div style="position: fixed;width: 100%;height: 100%;top: 0px;left: 0px;display: none;background-color:#000;z-index:99;" id="mb"></div>
<div style="position:fixed;width:300px;height:350px;top:50%;left:0%;margin-left:-150px;margin-top:-175px;display: none;z-index: 9999999;" id="gbewm" onclick="ewmgb()">
	<div style="text-align:center;line-height: 50px;background-color: #2db2ea;color: #fff;font-size: 20px;font-weight: bold;border-radius: 5px 5px 0px 0px;">扫码二维码，手机观看！</div>
	<img src="https://i.loli.net/2018/01/19/5a617da73ac6a.png" id="ewmtp" style="width: 300px;height: 300px;border-radius: 0px 0px 5px 5px;"/>
</div>
<div class="tabbar visible-xs">
    <a href="/" class="item ">
        <i class="icon iconfont icon-home"></i>
        <p class="text">首页</p>
    </a>
    <a href="/movielist/all/1.html" class="item ">
        <i class="icon iconfont icon-film"></i>
        <p class="text">电影</p>
    </a><a href="/tvlist/all/1.html" class="item ">
        <i class="icon iconfont icon-show"></i>
        <p class="text">电视剧</p>
    </a><a href="/dmlist/all/1.html" class="item ">
        <i class="icon iconfont icon-mallanimation"></i>
        <p class="text">动漫</p>
    </a><a href="/zylist/all/1.html" class="item ">
        <i class="icon iconfont icon-flag"></i>
        <p class="text">综艺</p>
    </a>
</div>

    <div class="container">
    <div class="row">
        <div class="hy-footer clearfix">
            <p style="padding: 0 4px;text-align:center" class="container-fluid">
                本站提供的最新电影和电视剧资源均系收集于各大视频网站,本站不提供影片资源存储,也不参与录制、上传<br/>
                若本站收录的节目无意侵犯了贵司版权，请给网页底部邮箱地址来信,我们会及时处理和回复,谢谢。<br/>
                管理员邮箱：{{config('webset.webmail')}} <br/>
            <div style="">
              <p> &copy; 2018<a href="#" target="_blank">{{config('webset.webicp')}}</a>&nbsp; {{config('webset.copyright')}}&nbsp; &nbsp; {!! config('webset.webtongji') !!}</p></p>            
               </div>

        </div>
    </div>
</div>
<canvas id="background"></canvas>
<script async type="text/javascript" src="/static/wapian/js/background.js"></script>
</body>
<script>
    $(function () {
        $('#sousuo').click(function () {
            var key = $('#ff-wd').val();
            if (key != '' && key != null) {
                window.location = '/search/' + key + '.html'
            }
        });

        $('input').keyup(function () {
            if (event.keyCode == 13) {
                $("#sousuo").trigger("click");
            }
        })
    })
</script>
<script>
	function kg(){
		var zt = $("#kg").text();
		if(zt=="关灯"){
			$("#mb").css("display","block");
			$("#kg").text("开灯");
		}else{
			$("#mb").css("display","none");
			$("#kg").text("关灯");
		}
	}
	function ewm(){
		var url = "http://qr.liantu.com/api.php?text="+window.location.href;
		$("#ewmtp").attr('src',url);
		$("#gbewm").css("display","block");
		$("#gbewm").animate({left:'50%'});
	}
	function ewmgb(){
		$("#gbewm").animate({left:'100%'});
		$("#gbewm").css("display","none");
	}
    function jilu(obj) {
        var url = $(obj).attr('href');
        var img = $(obj).attr('src');
        var title = $(obj).attr('title');
        $.ajax({
            type: "get",
            url: "/history",
            dataType: "json",
            data: {"url": url, "img": img, "title": title},
            success: function () {

            }
        })
    }
</script>
<div style="display:none">
<script language="javascript" type="text/javascript" src="//js.users.51.la/19397799.js"></script>
<noscript><a href="//www.51.la/?19397799" target="_blank"><img alt="我要啦免费统计" src="//img.users.51.la/19397799.asp" style="border:none" /></a></noscript>
</div>
</html>
