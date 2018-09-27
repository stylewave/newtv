<!DOCTYPE html>
<html>
<head>
<title>会员登录-{{config('webset.webname')}}- 在线免费高清电影！</title> 
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
<link rel="stylesheet" href="/static/wapian/css/login.css" type="text/css" media="all">
<meta name="keywords" content="电影,视频大全,在线高清电影,付费电影,免费电影,电视剧,电影,在线观看,VIP高清电影直播">
<meta name="description" content="品优影视，是专门做电视剧,电影等在线播放服务，本页面提供电影的相关内容。">
</head>
<body>
<h1>欢迎登录{{config('webset.webname')}}</h1>

	<div class="container w3layouts agileits">

		<div class="login w3layouts agileits">
			<h2>登 录</h2>
			<form method="post" action="checkLogin">
				{{ csrf_field() }}
				<input type="text" Name="username" placeholder="用户名" required="">
				<input type="password" Name="password" placeholder="密码" required="">

			<ul class="tick w3layouts agileits">
				<li>
					<input type="checkbox" id="brand1" value="">
					<label for="brand1"><span></span>记住我</label>
				</li>
			</ul>
			<div class="send-button w3layouts agileits">

					<input type="submit" name="submit" value="登 录">

			</div>
			</form>
			<div class="social-icons w3layouts agileits">
				<p>- 导航 -</p>
				<ul>
					<li class="qq"><a href="/">
					<span class="icons w3layouts agileits"></span>
					<span class="text w3layouts agileits">首页</span></a></li>
					<li class="weixin w3ls"><a href="/movielist/all/1.html">
					<span class="icons w3layouts"></span>
					<span class="text w3layouts agileits">电影</span></a></li>
					<li class="weibo aits"><a href="/tvlist/all/1.html">
					<span class="icons agileits"></span>
					<span class="text w3layouts agileits">电视剧</span></a></li>
					<div class="clear"> </div>
				</ul>
			</div>
			<div class="clear"></div>
		</div>
		<div class="register w3layouts agileits">
			<h2>注 册</h2>
		<form method="post" action="/action/register">
			{{ csrf_field() }}
				<input type="text" Name="username" placeholder="用户名" required="">
				<input type="text" Name="email" placeholder="邮箱" required="">
				<input type="password" Name="password" placeholder="密码" required="">
				<input type="password" Name="password2" placeholder="确认密码" required="">

			<div class="send-button w3layouts agileits">

					<input type="submit" value="免费注册" name="reg">

			</div>
			</form>
			<div class="clear"></div>
		</div>

		<div class="clear"></div>

	</div>

	<div class="footer w3layouts agileits">
		<p>本站提供的最新电影和电视剧资源均系收集于各大视频网站,本站不提供影片资源存储,也不参与录制、上传<br />
		若本站收录的节目无意侵犯了贵司版权，请给网页底部邮箱地址来信,我们会及时处理和回复,谢谢。<br />
		管理员邮箱：{{config('webset.webmail')}} <br />

		</p>
	</div>

</body>
</html>