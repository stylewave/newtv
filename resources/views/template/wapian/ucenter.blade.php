@extends('public.ucenter')
@section('content')	
	<div class="row">
			<div class="col-md-8">
				<div class="panel panel-default">
					<div class="panel-heading"><span class="glyphicon glyphicon-envelope"></span>个人信息</div>
					<div class="panel-body">
						<form class="form-horizontal" action="" method="post">
							<fieldset>
								<!-- Name input-->
								<div class="form-group">
									<label class="col-md-3 control-label" for="name">用户名</label>
									<div class="col-md-9" style="line-height:35px">
									{{$userinfo['username']}}
									</div>
								</div>
							
								<!-- Email input-->
								<div class="form-group">
									<label class="col-md-3 control-label" for="email">状态</label>
									<div class="col-md-9" style="line-height:35px">
										@if($userinfo['status']==1)
											正常
										@else
											禁用
										@endif
										
									</div>
								</div>
								
								<!-- Message body -->
								<div class="form-group">
									<label class="col-md-3 control-label" for="message">会员组</label>
									<div class="col-md-9" style="line-height:35px">
										@if($userinfo['group']==1)
			                        		普通会员<a href="chongzhi.html">(升级会员)</a>
			                        	@endif
			                        	
			                        	@if($userinfo['group']==2)
			                        		包月VIP
			                        	@endif
			                        		
			                        	@if($userinfo['group']==3)
			                        		包年VIP
			                        	@endif
			                        	
			                        	@if($userinfo['group']==4)
			                        		永久VIP	
			                        	@endif		
			                        	
			                        	@if($userinfo['group']==2 || $userinfo['group']==3)
			                        		（VIP到期时间：{{$userinfo['viptime']}}）	
			                        	@endif			
									</div>
								</div>
								
								<div class="form-group">
									<label class="col-md-3 control-label" for="message">email</label>
									<div class="col-md-9" style="line-height:35px">
											{{$userinfo['email']}}					</div>
								</div>
								
								<!-- Form actions -->
		
							</fieldset>
						</form>
					</div>
				</div>
				
				
			</div><!--/.col-->
			
			
		</div><!--/.row-->
@endsection