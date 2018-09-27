@extends('public.admin')

@section('user','active opened active')

@section('kamiUrl','active')

@section('content')

    <div class="row">

        <div class="col-sm-12">



            <div class="panel panel-default">

                <div class="panel-heading">

                    <h3 class="panel-title">卡密购买链接</h3>

                    <div class="panel-options">



                    </div>

                </div>

                <div class="panel-body">



                    <form role="form" class="form-horizontal" id="myform" enctype="multipart/form-data">



                        <div class="form-group">

                            <label class="col-sm-2 control-label" for="field-1">链接地址</label>



                            <div class="col-sm-10">

                                <input type="text" class="form-control" id="field-1" value="{{$kamiUrl['url']}}" name="url" placeholder="请输入链接地址" required>

                            </div>

                        </div>


                        <div class="form-group-separator"></div>

                        <div class="form-group">

                            <label class="col-sm-2 control-label" ></label>

                            <button type="button" class="btn btn-info btn-single" id="submit">提交</button>

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

                if(navname==''){

                    layer.msg('请填写完整信息')

                    return false;

                }

                var fm = new FormData($('#myform')[0]);

                $.ajax({

                    type:"post",

                    url:"/action/kamiUrl",

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

                            window.location = window.location.href;

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