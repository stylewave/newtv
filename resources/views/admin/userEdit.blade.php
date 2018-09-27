@extends('public.admin')

@section('user','active opened active')

@section('userList','active')

@section('content')

    <div class="row">

        <div class="col-sm-12">



            <div class="panel panel-default">

                <div class="panel-heading">

                    <h3 class="panel-title">编辑会员</h3>

                    <div class="panel-options">



                    </div>

                </div>

                <div class="panel-body">



                    <form role="form" class="form-horizontal" id="myform" enctype="multipart/form-data">



                        <div class="form-group">

                            <label class="col-sm-2 control-label" for="field-1">会员名称</label>



                            <div class="col-sm-10">

                                <input type="hidden" value="{{$id}}" name="userid">

                                <input type="text" class="form-control" id="field-1" value="{{$user['username']}}" name="username" placeholder="请输入会员名称" required>

                            </div>

                        </div>



                        <div class="form-group-separator"></div>



                        <div class="form-group">

                            <label class="col-sm-2 control-label" for="field-2">密码</label>



                            <div class="col-sm-10">

                                <input type="text" class="form-control" id="field-2" value="" name="password" placeholder="请输入会员密码" required>

                            </div>

                        </div>



                        <div class="form-group-separator"></div>



                        <div class="form-group">

                            <label class="col-sm-2 control-label" for="field-3">email</label>



                            <div class="col-sm-10">

                                <input type="text" class="form-control" id="field-3" name="email" value="{{$user['email']}}" placeholder="请输入email地址" required>

                            </div>

                        </div>
                        
                        <div class="form-group">

                            <label class="col-sm-2 control-label" for="field-4">会员组</label>



                            <div class="col-sm-10">

                                <select class="form-control" name="group" id="group" style="width: 100%">
                                        <option value="1" @if($user['group']==1) selected @endif>普通会员</option>
                                        <option value="2" @if($user['group']==2) selected @endif>包月VIP</option>
                                        <option value="3" @if($user['group']==3) selected @endif>包年VIP</option>
                                        <option value="4" @if($user['group']==4) selected @endif>永久VIP</option>
								</select>

                            </div>

                        </div>

                        <div class="form-group">

                            <label class="col-sm-2 control-label" for="field-5">状态</label>



                            <div class="col-sm-10">

                                <select class="form-control" name="status" id="status" style="width: 100%">
                                        <option value="1" @if($user['status']==1) selected @endif>启用</option>
                                        <option value="0" @if($user['status']==0) selected @endif>禁用</option>
								</select>

                            </div>

                        </div>

                        <div class="form-group-separator"></div>

                        <div class="form-group">

                            <label class="col-sm-2 control-label" for="field-5"></label>

                            <button type="button" class="btn btn-info btn-single" id="submit">更新</button>

                        </div>



                    </form>



                </div>

            </div>



        </div>

    </div>

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

                    url:"/action/userEdit",

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

                            window.location = '/{{$webset['webdir']}}/userList'

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