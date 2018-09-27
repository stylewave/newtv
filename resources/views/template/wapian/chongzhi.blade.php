@extends('public.ucenter')
@section('content')	
	<div class="row">
			<div class="col-md-8">
				<div class="panel panel-default">
					<div class="panel-heading"><span class="glyphicon glyphicon-envelope"></span>卡密充值</div>
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
							
								
								<div class="form-group">
									<label class="col-md-3 control-label" for="message">充值卡号</label>
									<div class="col-md-9" style="line-height:35px">
										<input id="field-3" name="kami" type="text" class="form-control" placeholder="请输入您的充值卡号" value="">
									</div>
								</div>
											
								<!-- Form actions -->
								<div class="form-group">
									<div class="col-md-12 widget-right">
										<button type="button" class="btn btn-info btn-single" id="submit">提交</button>&nbsp;&nbsp; <a href="{{$kamiUrl['url']}}" target="_blank"><button type="button" class="btn btn-info btn-single">卡密购买</button></a>
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

                    url:"/action/chongzhi",

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

                            window.location = 'ucenter.html';

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