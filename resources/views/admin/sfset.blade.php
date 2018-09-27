@extends('public.admin')

@section('set','active opened active')

@section('sfset','active')

@section('content')

    <div class="row">

        <div class="col-sm-12">



            <div class="panel panel-default">

                <div class="panel-heading">

                    <h3 class="panel-title">收费设置</h3>

                    <div class="panel-options">



                    </div>

                </div>

                <div class="panel-body">



                    <form role="form" class="form-horizontal" id="myform" enctype="multipart/form-data">

                        <div class="form-group" style="display:none;">

                            <label class="col-sm-2 control-label" for="field-1">唯美动漫</label>
                            <div class="col-sm-10">

                                <select class="form-control" name="dm" style="width: 100%">
                                        <option value="0" @if($sfset['dm']==0) selected @endif>免费</option>
                                        <option value="1" @if($sfset['dm']==1) selected @endif>收费</option>
								</select>

                            </div>

                        </div>
                        
                        <div class="form-group" style="display:none;">

                            <label class="col-sm-2 control-label" for="field-1">热门综艺</label>
                            <div class="col-sm-10">

                                <select class="form-control" name="zy" style="width: 100%">
                                        <option value="0" @if($sfset['zy']==0) selected @endif>免费</option>
                                        <option value="1" @if($sfset['zy']==1) selected @endif>收费</option>
								</select>

                            </div>

                        </div>
                        
                        <div class="form-group" style="display:none;">

                            <label class="col-sm-2 control-label" for="field-1">电视剧集</label>
                            <div class="col-sm-10">

                                <select class="form-control" name="tv" style="width: 100%">
                                        <option value="0" @if($sfset['tv']==0) selected @endif>免费</option>
                                        <option value="1" @if($sfset['tv']==1) selected @endif>收费</option>
								</select>

                            </div>

                        </div>
                        
                        <div class="form-group" style="display:none;">

                            <label class="col-sm-2 control-label" for="field-1">高清电影</label>
                            <div class="col-sm-10">

                                <select class="form-control" name="movie" style="width: 100%">
                                        <option value="0" @if($sfset['movie']==0) selected @endif>免费</option>
                                        <option value="1" @if($sfset['movie']==1) selected @endif>收费</option>
								</select>

                            </div>

                        </div>
                        
                        <div class="form-group">

                            <label class="col-sm-2 control-label" for="field-1">影院热映</label>
                            <div class="col-sm-10">

                                <select class="form-control" name="cx" style="width: 100%">
                                        <option value="0" @if($sfset['cx']==0) selected @endif>免费</option>
                                        <option value="1" @if($sfset['cx']==1) selected @endif>收费</option>
								</select>

                            </div>

                        </div>

                        <div class="form-group-separator"></div>

                        <div class="form-group">

                            <label class="col-sm-2 control-label" for="field-5"></label>

                            <button type="button" class="btn btn-info btn-single" id="submit">修改</button>

                        </div>



                    </form>



                </div>

            </div>



        </div>

    </div>

    <script>

        $(function () {

            $('#submit').click(function () {

                var fm = new FormData($('#myform')[0]);

                $.ajax({

                    type:"post",

                    url:"/action/sfset",

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

                            window.location = window.location.href

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