var websocket={};
var client_fd=0;
WEB_SOCKET_SWF_LOCATION = "/public/plugins/flash-websocket/WebSocketMain1843.swf";
$(function(){
	function chat_online_list(data){
		 var data_list;
		 $.each(data, function (index, row) {
			 data_list = data_list ? data_list+'<li class="list-group-item-a user'+row.fd+'">'+row.nickname+'<button class="btn blockuser">踢群</button><button class="btn btn-warning touser">对话</button></li>': '<li class="list-group-item-a user'+row.fd+'">'+row.nickname+'<button class="btn blockuser">踢群</button><button class="btn btn-warning touser">对话</button></li>';
		 });
		 $("#online_list").html(data_list);
		 console.log("show list");
	}

	function chat_join_user(row){
		
		 $("#online_list").append('<li class="list-group-item-a user'+row.fd+'">'+row.nickname+'<button class="btn blockuser">踢群</button><button class="btn btn-warning touser">对话</button></li>');
	}
	function chat_join_msg(row){
		if(row.fd==client_fd){
			row.nickname = '我';
		}
		 $("#content_list").append('<div style="color:#9C0000">'+row.nickname+' 进来了!</div>');
	}
	
	function chat_out_user(row){
		if($(".user"+row.fd).length>0)
		 $(".user"+row.fd).remove();
		 console.log("remove"+row.fd);
	}
	function chat_out_msg(row){
		if(row.fd==client_fd){
			row.nickname = '我';
		}
		$("#content_list").append('<div style="color:#CCC">'+row.nickname+' 离开了!</div>');
	}
	function chat_send(row){
		var myDate = new Date();
		var time = myDate.getHours().toString()+myDate.getMinutes().toString()+myDate.getSeconds().toString()+myDate.getMilliseconds().toString();
		var str = row.msg;
		var reply_msg,reply_btn;
		if(!!row.reply){												//已回复了
			reply_msg = '<div class="replaytext"><p class="replycontent">回复:'+row.reply+'</p></div>';
			reply_btn = '';
		}else{
			
			reply_msg = '';
			if(row.chat_show=='1'){
				reply_btn = '<i data="'+row.msgid+'" class="btn  btn-success repalyUser ">回复</i>'+'</div>';	
			}else{
				reply_btn = '<i data="'+row.msgid+'" class="btn  btn-info passUser ">通过</i><i data="'+row.msgid+'" class="btn  btn-success repalyUser ">回复</i>'+'</div>';	
			}

		}
		/*if(row.fd==client_fd){
			row.nickname = '我';
		}*/
		$("#content_list").append('<div class="replaysText ref'+time+'" ><i class="glyphicon glyphicon-user user-ico"></i><span>'+row.nickname+'</span>'+'<em class="replaceText">'+replace_em(str)+'</em>'+reply_msg+reply_btn);
	}
	
	function chat_history_list(data){
		 var data_list;
		 //console.log(data);
		 $.each(data, function (index, row) {
			 chat_send(row);
			 //data_list = data_list ? data_list+'<li class="list-group-item-a user'+row.fd+'">'+row.nickname+'</li>': '<li class="list-group-item-a user'+row.fd+'">'+row.nickname+'</li>';
		 });
		// $("#online_list").html(data_list);
		 
	}
	
	//var wsServer = 'ws://120.27.113.184:9502';
	var wsServer = 'ws://192.168.16.18:9502';

        websocket = new WebSocket(wsServer);
    
    //使用http xhr长轮循
    /*else
    {
       var websocket = new Comet(wsServer);
    }  
	*/
	//var websocket = new WebSocket(wsServer);
	
	websocket.onopen = function (evt) {
		
		console.log("Connected to WebSocket server."+evt);
		websocket.send(JSON.stringify({
			act: "join",
			token:cf_user_json.token,
		}));
	};

	websocket.onclose = function (evt) {
		console.log("Disconnected");
		$("#content_list").html('<li>你已退出</li>');
		//alert('close');
	};

	websocket.onmessage = function (evt) {
		var jsondata = $.parseJSON(evt.data);
		//var data = JSON.parse(evt.data);
		//console.log('Retrieved data from server: ' + jsondata);
		//writeObj(evt);
		
		
		switch(jsondata.act){
			case "online_list":
				//console.log('list ' + jsondata.data);
				client_fd = jsondata.data.fd;
				chat_online_list(jsondata.list);
				//chat_join_user(jsondata.data);							
				chat_join_msg(jsondata.data);
				console.log("set fd ="+client_fd);
			break;
			case "history_list":
				chat_history_list(jsondata.list);
				//console.log(jsondata.list);
			break;
			case "broadcast":
				if(jsondata.type=='join'){
					chat_join_user(jsondata.data);							
					chat_join_msg(jsondata.data);

				}else if(jsondata.type=='out'){
					chat_out_user(jsondata.data);							
					chat_out_msg(jsondata.data);
					
				}else if(jsondata.type=='sendall'){
					chat_send(jsondata.data);					
				}else if(jsondata.type=='send'){
					chat_send(jsondata.data);					
				}else if(jsondata.type=='toadmin'){
					chat_send(jsondata.data);					
				}
			break;
			case "admin":
				//console.log('admin action');
				//broadcast(jsondata.data);
				//chat_send(jsondata.data);	
			break;
			case "error":
			
				console.log('errorinfo'+jsondata.data);
				alert(jsondata.data.tips,'warning');
			break;
			default:
				console.log('fail');
			break;
		}
		
		$('#content_list').scrollTop( $('#content_list')[0].scrollHeight );
	};

	websocket.onerror = function (evt, e) {
		console.log('Error occured: ' + evt.data);
	}; 
	
	$("#chat_form").submit(function(){
		//websocket.send( $("#content").val());
		var sendtype=null;
		if($("#sendto").val()>0){
			var sendtype='send';
		}else{
			var sendtype='sendall';
		}
		
		websocket.send(JSON.stringify({
			act: sendtype,
			msg:$("#content").val(),
			token:cf_user_json.token,
		}));
		$("#content").val('');
		//htmlobj=$.ajax({url:"ajax.php",async:false});
		//$("#content_list").append('<li>'+htmlobj.responseText+'</li>');
		//console.log(htmlobj.responseText);
		return false;
		//show_msg($("#content").val());
		
	})
})