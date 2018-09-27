@extends('public.admin')

@section('user','active opened active')

@section('kamiAdd','active')

@section('content')

    <div class="row">

        <div class="col-sm-12">



            <div class="panel panel-default">

                <div class="panel-heading">

                    <h3 class="panel-title">生成卡密</h3>

                    <div class="panel-options">



                    </div>

                </div>

                <div class="panel-body">



                    <form role="form" class="form-horizontal" id="myform" enctype="multipart/form-data">



                        <div class="form-group">

                            <label class="col-sm-2 control-label" for="field-1">数量</label>



                            <div class="col-sm-10">

                                <input type="text" class="form-control" id="field-1" value="" name="num" placeholder="请输入卡密数量" required>

                            </div>

                        </div>



                        <div class="form-group-separator"></div>


                        <div class="form-group">

                            <label class="col-sm-2 control-label" for="field-5">天数</label>



                            <div class="col-sm-10">

                                <select class="form-control" name="type" id="type" style="width: 100%">
                                        <option value="2">包月</option>
                                        <option value="3">包年</option>
                                        <option value="4">永久</option>
								</select>

                            </div>

                        </div>

                        <div class="form-group-separator"></div>

                        <div class="form-group">

                            <label class="col-sm-2 control-label" ></label>

                            <button type="button" class="btn btn-info btn-single" id="submit">生成</button>

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

                    url:"/action/kamiAdd",

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

                            window.location = '/{{$webset['webdir']}}/kamiList'

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