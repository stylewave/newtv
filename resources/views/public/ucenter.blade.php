<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="csrf-token" content="{{ csrf_token() }}">
<title>会员中心</title>
<link href="/static/wapian/css/bootstrap.3.2.0.min.css" rel="stylesheet">
<link href="/static/wapian/css/ucenter.css" rel="stylesheet">
<link rel="stylesheet" href="/static/wapian/css/layer.css">
<script src="/static/wapian/js/jquery.min.js"></script>
<script src="/static/wapian/js/bootstrap.min.js"></script>
<script src="/static/wapian/js/layer.js"></script>
<!--[if lt IE 9]>
<script src="js/html5shiv.js"></script>
<script src="js/respond.min.js"></script>
<![endif]-->

</head>

<body>
	<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#sidebar-collapse">
					<span class="sr-only">导航</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="../"><span>HOME</span></a>
				<ul class="user-menu">
					<li class="dropdown pull-right">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span>{{$userinfo['username']}}<span class="caret"></span></a>
						<ul class="dropdown-menu" role="menu">
							<li><a href="userinfo.html"><span class="glyphicon glyphicon-cog"></span>资料修改</a></li>
							<li><a href="logout.html" onClick="return confirm('确定要退出吗？')"><span class="glyphicon glyphicon-log-out"></span>退出登录</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div><!-- /.container-fluid -->
	</nav>
﻿		
	<div id="sidebar-collapse" class="col-sm-3 col-lg-2 sidebar">
		<ul class="nav menu">
			<li ><a href="ucenter.html"><span class="glyphicon glyphicon-dashboard"></span>个人信息</a></li>
			<li><a href="userinfo.html"><span class="glyphicon glyphicon-pencil"></span>资料修改</a></li>
			<li><a href="chongzhi.html"><span class="glyphicon glyphicon-stats"></span>卡密充值</a></li>
			<li><a href="{{$kamiUrl['url']}}" target="_blank"><span class="glyphicon glyphicon-stats"></span>卡密购买</a></li>

			<li role="presentation" class="divider"></li>
			<li><a href="logout.html" onClick="return confirm('确定要退出吗？')"><span class="glyphicon glyphicon-user"></span>退出登录</a></li>
		</ul>
	</div><!--/.sidebar-->
		
	<div class="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">			
		<div class="row">
			<ol class="breadcrumb">
				<li><a href="../"><span class="glyphicon glyphicon-home"></span></a></li>
				<li class="active">个人信息</li>
			</ol>
		</div><!--/.row-->
		
		@section('content')
    	@show
		
	</div>	<!--/.main-->

</body>
</html>