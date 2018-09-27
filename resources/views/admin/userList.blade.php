@extends('public.admin')

@section('user','active opened active')

@section('userList','active')

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

            <h3 class="panel-title" style="margin-right:57rem">会员列表</h3>


            <div class="input-group col-md-3" style="margin-top:0px;positon:relative">
                <input id="search" type="text" class="form-control"placeholder="请输入会员名"/>
                <span class="input-group-btn">
                    <button class="btn btn-info btn-search">查找</button>
                </span>
            </div>
            <div class="panel-options">

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
                $(function () {
                    $(".btn-search").click(function () {
                        var name = $("#search").val();
                        var url = "/admin/userList/"+name;
                        window.open(url,"_self")
                    })
                })
                jQuery(document).ready(function($)

                {

                    $("#example-2").dataTable({

                        dom: "t" + "<'row'<'col-xs-6'i><'col-xs-6'p>>",

                        aoColumns: [

                            {"bSortable": false},

                            null,

                            null,

                            null,

                            null

                        ],

                    });



                    // Replace checkboxes when they appear

                    var $state = $("#example-2 thead input[type='checkbox']");



                    $("#example-2").on('draw.dt', function()

                    {

                        cbr_replace();



                        $state.trigger('change');

                    });



                    // Script to select all checkboxes

                    $state.on('change', function(ev)

                    {

                        var $chcks = $("#example-2 tbody input[type='checkbox']");



                        if($state.is(':checked'))

                        {

                            $chcks.prop('checked', true).trigger('change');

                        }

                        else

                        {

                            $chcks.prop('checked', false).trigger('change');

                        }

                    });

                });

            </script>



            <table class="table table-bordered table-striped" id="example-2">

                <thead>

                <tr>
                    <th style="display:none!important;"></th>
                    <th>会员名称</th>
                    <th>会员组</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody class="middle-align">

                @foreach($list as $key=>$v)

                    <tr>
                        <td style="display:none!important;">-{{$key}}</td>
                        <td>{{$v['username']}}</td>
                        <td>
                        	@if($v['group']==1)
                        		普通会员
                        	@endif
                        	
                        	@if($v['group']==2)
                        		包月VIP
                        	@endif
                        		
                        	@if($v['group']==3)
                        		包年VIP
                        	@endif
                        	
                        	@if($v['group']==4)
                        		永久VIP	
                        	@endif
                        </td>
                        <td>
							@if($v['status']==1)
                        		开启
                        	@else
                        		禁用	
                        	@endif
                        </td>
                        <td>

                            <a href="/{{$webset['webdir']}}/userEdit/{{$v['username']}}" class="btn btn-secondary btn-sm btn-icon icon-left">

                                编辑

                            </a>



                            <a href="javascript:void(0)" onclick="shanchu(this)" goodid="{{$v['username']}}" class="btn btn-danger btn-sm btn-icon icon-left">

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

                    url:'/action/userDel',

                    type:'post',

                    headers: {

                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

                    },

                    data:{userid:$(obj).attr('goodid')},

                    dataType:'json',

                    success:function (data) {

                        layer.msg(data.msg);

                    }

                })

            });

        }

    </script>



@endsection()