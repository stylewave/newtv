// JavaScript Document
function preventDefault(e){
		if(e)
		e.preventDefault ? e.preventDefault() : e.returnValue = false ;
	}
function timeouturl(win,url){
	win.location.href=url;
	//alert('aaaa');
}

function my_alert(msg,title,callback,model){
	asyncbox.alert(msg,title,function(action){
		
　　　if(action == 'ok'){
		eval(callback);
　　　}
　　　if(action == 'close'){
　　　　if(model=='1')
		return false;
　　　}
　});

	
}
function my_error(msg,title,callback,model){
	asyncbox.error(msg,title,function(action){
　　　if(action == 'ok'){
		eval(callback);
　　　}
　　　if(action == 'close'){
　　　　if(model=='1')
		return false;
　　　}
　});

}
function my_success(msg,title,callback,model){
	asyncbox.success(msg,title,function(action){
　　　if(action == 'ok'){
		eval(callback);
　　　}
　　　if(action == 'close'){
　　　　if(model=='1')
		return false;
　　　}
　});
}

function my_iframe(src,title,width,height){
	asyncbox.open({
  　　	url : src,
      	title : title,
  　　	width : width,
  　　	height : height,
      	modal : true,
		buttons : asyncbox.btn.CANCEL
  	  //btnsbar : $.btn.CANCEL
  　});

  preventDefault(window.event);
}

function my_box(msg,title,width,height){
	asyncbox.html({
  　　  content  : msg,
      	title : title,
  　　　 width : width,
  　　　 height : height,
 		 buttons : [{
	　　　　　value : '确认提交',
	　　　　　result : 'submit_btn'
	　　　},{
	　　　　　value : '取 消',
	　　　　　result : 'cancel_btn'
		 }],
		  callback : function(action,opener,returnValue){ // callback 返回的三个参数缩写，什么名字都可以，按顺序就行
			  if(action == "submit_btn"){
				 return my_box_sfun();
				  
			  }
			  if(action == "cancel_btn"){
				 return my_box_cfun();
				 //return false;
			  }
		  }


  　});
   preventDefault(window.event);
}

function my_close(callback){
		//一般在iframe里面用
		if(callback){
			eval(callback);
		}
		var dialog = frameElement.api;
		dialog.close();
}

function my_confirm(msg,title,callback){	
	asyncbox.confirm(msg,title,function(action){
　 　if(action == 'ok'){	
		if(callback)
		eval(callback);
		else
		return true;
　　　　
　　　}
　　　if(action == 'cancel'){
		return true;
		//return false;
　　　　//　alert('cancel');
　　　}
　　　if(action == 'close'){
		return true;
		//return false;
　　　　　//alert('close');
　　　}
	
　});
	
}

function my_prompt(msg,title,callback,defaultvalue,type){
	if(defaultvalue == '' || defaultvalue == null){
		defaultvalue='';
	}
	if(type == '' || type == null){
		type='text';
	}
		
	asyncbox.prompt(title,msg,defaultvalue,type,function(action,val){
　　　//prompt 返回三个 action 值，分别是 'ok' 、'cancel' 和 'close'。
　　　if(action == 'ok'){
　　　//　　alert('您输入了：' + val);
		if(callback)
		eval(callback);
		else
		return true;
　　　}
　　　if(action == 'cancel'){
　　　　　return true;
　　　}
　　　if(action == 'close'){
　　	　　return true;
　　　}
　});


}

function my_jump(message,title,url,time,target,type){
	if(window.top == window.self){						//是否子框
			var iframe = '0'
	}else{
			var iframe = '1'
	}
	
	
	if(time > 0 && url){
		var model='1';			
	}else if(url){
		var model='2';	
	}else{
		var model='0';
	}
	if(target == 'top'){
		var win = window.top;
	}else{
		var win = window;
	}
	
	var $ob;
	switch(type){
		case "alert":
		$ob = asyncbox.alert;	
		break;
		case "success":
		$ob = asyncbox.success;	
		break;
		case "error":
		$ob = asyncbox.error;	
		break;
		case "warning":
		$ob = asyncbox.warning;	
		break;
		default:
		$ob = asyncbox.alert;
		break;
	}
	if(type == '' || type == null){
		defaultvalue='';
	}
	
	switch(model){
		case "1":						//有时间及地址
                 $ob(message,title,function(action){
				if(action == 'ok' || action == 'close'){
					win.location.href=url;
				}
				});
				//$("#asyncbox_alert_ok").focus();
				setTimeout(function(){win.location.href=url;},time*1000);
			break;
		case "2":				//只有地址
		
                 $ob(message,title,function(action){
				if(action == 'ok' || action == 'close'){
					win.location.href=url;
				}
				});
			break;
		case "0":
                 $ob(message,title,function(action){
				if(action == 'ok' || action == 'close'){
					//win.location.reload();
					if(iframe=='1'){
						var dialog = frameElement.api;
						dialog.close();
					}else{
						win.history.back();
					}
					
				}
				});
			break;
		default:
			break;
	}
}

function my_page(model,url,target,time){
	var time = time*1000;	
	setTimeout(function(){	
		switch(url){
			case "back":					//要求返回,直接返回
				window.history.back();
			break;	
			case "close":					//要求关闭,直接关闭
				my_close();
			break;
			case "":
				
				if(model=='0'){				//父框操作,不用关闭窗口
					//window.history.back();
					my_close();
				}else{
					top.location.reload();	//默认,关闭并刷新父框
					my_close();
				}
			break;
			default:
				if(target=='top'){				//父框操作,不用关闭窗口
					top.location.href=url;	
				}else{
					location.href=url;
					//my_close();
				}
			break;
			
		}
	
		
		
		
	},time);
}
