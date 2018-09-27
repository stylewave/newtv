function get_value(val,defaultval){
	if(val != undefined ){
		return val;	
	}else{
		return defaultval;	
	}
	
}

function my_jump(msg,title,url,time,target){
	var style;
	if(url != undefined  && url!=""){
		style = 1;
	}else{
		style = 4;
	}
	
	var index = $.layer({
		type: 0,   //0-4的选择,（1代表page层）
		title: title,
		closeBtn : [1,true],		//是否显示右上关闭按钮
		shadeClose:false,
		time: get_value(time,3),	//时间
		dialog: {
			type: style,
			msg: msg
			},
		end:function(){
			if(url){
				if(target=='top'){				
					top.location.href=url;	
				}else if(target=='parent'){
					parent.location.href=url;
				}else{
					location.href=url;
				}
			}else{
				history.back()
			}
		}
	});   
}


function my_alert(msg,title,callback,options){
	options = get_value(options,{});
	var index = $.layer({
		type: 0,   //0-4的选择,（1代表page层）
		title: title,
		closeBtn : get_value(options.closeBtn,[1,true]),		//是否显示右上关闭按钮
		shift: get_value(options.shift,''),				//弹出方向
		shadeClose:false,
		time: get_value(options.time,0),					//时间
		dialog: {
			type: get_value(options.style,4),
			msg: msg
			},
		end:function(){
			if(callback){
				eval(callback);	
			};
			
		}
		
	});   
}

function my_tips(msg,callback,options){
	options = get_value(options,{});
	var index = $.layer({
		type: 0,   //0：信息框（默认），1：页面层，2：iframe层，3：加载层，4：tips层。 
		title: false,
		closeBtn : get_value(options.closeBtn,false),		//是否显示右上关闭按钮
		shift: get_value(options.shift,''),			//左上(left-top),上(top), 右上(right-top),右下(right-bottom),下(bottom),左下(left-bottom),左('left')。如shift:'top' 表示从上动画弹出
		time: get_value(options.time,2),				//关闭时间
		shadeClose:get_value(options.shadeClose,true),
		shade: get_value(options.shade,[0]) ,
		dialog: {
			type: get_value(options.style,1),
			msg: msg
			},
		end:function(){
			if(callback){
				eval(callback);	
			};
			
		}
		
	});   	
}

function my_error_tips(msg,callback){
	my_tips(msg,callback,{"style":2});
}

//建议不使用
function my_error(msg,title,callback,close){
	var closetbtn=[1,true];
	if(close=='1'){
		closetbtn=false;
	}
	var index = $.layer({
		type: 0,   //0：信息框（默认），1：页面层，2：iframe层，3：加载层，4：tips层。 
		title: title,
		closeBtn : closetbtn,
		dialog: {
			type: 2,
			msg: msg
			},
		end:function(){
			if(callback){
				eval(callback);	
			};
			//$.layer.close(index);
		}
		
	});   
}

function my_iframe(src,title,width,height){
	var index = $.layer({
		type: 2,   //0：信息框（默认），1：页面层，2：iframe层，3：加载层，4：tips层。 
		title: title,
		closeBtn : [1,true],
		area: [width+'px', height+'px'],
		iframe: {src: src}
		
	});   
}

function my_box(width,height,options){
	options = get_value(options,{});
	var index = $.layer({
		type: 1,   //0：信息框（默认），1：页面层，2：iframe层，3：加载层，4：tips层。 
		area: [width+'px', height+'px'],
		title: get_value(options.title,false) ,
		border:get_value(options.border,[0]) ,
		shade: get_value(options.shade,[0]) ,
		closeBtn : get_value(options.closeBtn,[1,true]),
		offset:get_value(options.offset,["",""]),
		page: options.page
	});   
}

function my_confirm(msg,yescallback,nocallback,options){	
	options = get_value(options,{});
	var index = $.layer({
		type: 0,   //0-4的选择,（1代表page层）
		title: get_value(options.title,'提示'),
		closeBtn : get_value(options.closeBtn,[1,true]),		//是否显示右上关闭按钮
		shadeClose:false,
		yes:function(index){
			if(yescallback){
				eval(yescallback);	
			};	
			layer.close(index);
		},
		no:function(index){
			if(nocallback){
				eval(nocallback);	
			};
			layer.close(index);
		},
		dialog: {
			type: 3,
			msg: msg,
			btns: 2,
			btn: get_value(options.btn,['确定','取消'])
		}
	});   
}
