@extends('public.admin')

@section('user','active opened active')

@section('kamiList','active')

@section('css')

    <link rel="stylesheet" href="/static/admin/assets/js/datatables/dataTables.bootstrap.css">

@endsection()

@section('js')

    <script src="/static/admin/assets/js/datatables/js/jquery.dataTables.min.js"></script>

    <script src="/static/admin/assets/js/datatables/dataTables.bootstrap.js"></script>

    <script src="/static/admin/assets/js/datatables/yadcf/jquery.dataTables.yadcf.js"></script>

    <script src="/static/admin/assets/js/datatables/tabletools/dataTables.tableTools.min.js"></script>

@endsection()

@section('content')

    <!-- Basic Setup -->

    <div class="panel panel-default">

        <div class="panel-heading">

            <h3 class="panel-title">卡密列表</h3>



            <div class="panel-options">
				<a href="javascript:void(0)" onclick="getNotUse()">一键提取未使用卡密</a>
				<a href="javascript:void(0)" onclick="kamiDelAllUse()">一键删除已使用卡密</a>

                <a href="#" data-toggle="panel">

                    <span class="collapse-icon">&ndash;</span>

                    <span class="expand-icon">+</span>

                </a>

                <a href="#" data-toggle="remove">

                    &times;

                </a>

            </div>

        </div>

        <div class="panel-body">



            <script type="text/javascript">

                jQuery(document).ready(function($)

                {

                    $("#example-2").dataTable({

                        dom: "t" + "<'row'<'col-xs-6'i><'col-xs-6'p>>",
						
    					"aaSorting": [[1,'desc']],
                        
                        aoColumns: [

                            {"bSortable": false},

                            null,
                            null,
                            
                            null,
                            
                            null,
                            null,

                            null

                        ],

                    });


                    

                });

            </script>



            <table class="table table-bordered table-striped" id="example-2">

                <thead>

                <tr>

                    <th>卡密</th>
                    <th>生成时间</th>
                    <th>天数</th>

                    <th>使用情况</th>
                    <th>使用者</th>
                    <th>使用时间</th>

                    <th>操作</th>

                </tr>

                </thead>



                <tbody class="middle-align">

                @foreach($list as $key=>$v)

                    <tr>

                        <td>{{$v['kami']}}</td>
                        <td>{{$v['createtime']}}</td>
                        <td>
                        	@if($v['type']==2)
                        		包月
                        	@endif
                        	
                        	@if($v['type']==3)
                        		包年
                        	@endif
                        		
                        	@if($v['type']==4)
                        		永久
                        	@endif
                        	
                        </td>
                        <td>
							@if($v['status']==1)
                        		已使用
                        	@else
                        		未使用
                        	@endif
                        </td>
                        <td>
                        {{$v['username']}}
                        </td>
                        <td>
                        {{$v['usetime']}}
                        </td>
                        <td>

                            <a href="javascript:void(0)" onclick="shanchu(this)" goodid="{{$key}}" class="btn btn-danger btn-sm btn-icon icon-left">

                                删除

                            </a>

                        </td>

                    </tr>

                  @endforeach

                </tbody>

            </table>



        </div>

    </div>



    <script>

        function shanchu(obj) {

            layer.confirm('您确认要删除？', {

                btn: ['确认','取消'] //按钮

            }, function(){

                $(obj).parent().parent().remove();

                $.ajax({

                    url:'/action/kamiDel',

                    type:'post',

                    headers: {

                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

                    },

                    data:{id:$(obj).attr('goodid')},

                    dataType:'json',

                    success:function (data) {

                        layer.msg(data.msg);



                    }

                })

            });

        }
        
        function kamiDelAllUse() {

            layer.confirm('您确认要删除？', {

                btn: ['确认','取消'] //按钮

            }, function(){

                $.ajax({

                    url:'/action/kamiDelAllUse',

                    type:'post',

                    headers: {

                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

                    },

                    data:'',

                    dataType:'json',

                    success:function (resp) {

                        if(resp.status==200){

                            layer.msg(resp.msg);

                            window.location = '/{{$webset['webdir']}}/kamiList'

                        }

                        else {

                            layer.msg(resp.msg)

                        }

						

                    }

                })

            });

        }
        function getNotUse() {
            var host = location.host;
            var url = 'http://'+host+'/getNotUse';
            window.open(url);
            {{-- layer.confirm('您确认要提取吗？', {

                btn: ['确认','取消'] //按钮

            }, function(){

                $.ajax({

                    url:'/action/getNotUse',

                    type:'post',

                    headers: {

                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

                    },

                    data:'',

                    dataType:'json',

                    success:function (resp) {

                        if(resp.status==200){

                            layer.msg(resp.msg);

                            window.location = '/{{$webset['webdir']}}/kamiList'

                        }

                        else {

                            layer.msg(resp.msg)

                        }



                    }

                })

            ); --}}

        }

    </script>



@endsection()