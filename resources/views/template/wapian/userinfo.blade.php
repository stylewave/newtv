@extends('public.ucenter')
@section('content')	
	<div class="row">
			<div class="col-md-8">
				<div class="panel panel-default">
					<div class="panel-heading"><span class="glyphicon glyphicon-envelope"></span>个人资料修改</div>
					<div class="panel-body">
						<form role="form" class="form-horizontal" id="myform" enctype="multipart/form-data">

							<fieldset>
								<!-- Name input-->
								<div class="form-group">
									<label class="col-md-3 control-label" for="name">用户名</label>
									<div class="col-md-9" style="line-height:35px">
									<input id="field-1" name="username" type="text" class="form-control" value="{{$userinfo['username']}}" disabled>
									</div>
								</div>
							
								<!-- Email input-->
								<div class="form-group">
									<label class="col-md-3 control-label" for="email">密码</label>
									<div class="col-md-9" style="line-height:35px">
										<input id="field-2" name="password" type="password" class="form-control" value="">
									</div>
								</div>

								
								
								<div class="form-group">
									<label class="col-md-3 control-label" for="message">email</label>
									<div class="col-md-9" style="line-height:35px">
										<input id="field-3" name="email" type="text" class="form-control" placeholder="请输入您的邮箱" value="{{$userinfo['email']}}">
									</div>
								</div>
											
								<!-- Form actions -->
								<div class="form-group">
									<div class="col-md-12 widget-right">
										<button type="button" class="btn btn-info btn-single" id="submit">提交</button>
									</div>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
				
				
			</div><!--/.col-->
			
		</div><!--/.row-->
	<script>

        $(function () {

            $('#submit').click(function () {

                var navname = $('#field-1').val();


                var navsort = $('#field-3').val();

                if(navname==''||navsort==''){

                    layer.msg('请填写完整信息')

                    return false;

                }

                var fm = new FormData($('#myform')[0]);

                $.ajax({

                    type:"post",

                    url:"/action/userinfo",

                    dataType:"json",

                    headers: {

                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

                    },

                    data: fm,

                    processData: false,

                    contentType: false,

                    success: function (resp){

                        if(resp.status==200){

                            layer.msg(resp.msg);

                            window.location = 'userinfo.html';

                        }

                        else {

                            layer.msg(resp.msg)

                        }

                    }

                })

            })

        })

    </script>
		
@endsection