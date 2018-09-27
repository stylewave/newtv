/*****jquery 通用函数******/

function myajaxform(myform,myurl,mycfun,mysfun,myefun,mydatatype,mytype){
    if(!myform){
	alert("表单对象不能为空!");
	return false;
    }
    $(myform).submit(function(){
	if(!myurl){
	    alert("请输入url和回调函数!");
	    return false;
	}
	if(!mycfun){															//提交前函数
	    mycfun="";
	}
	if(!myefun){
	    //myefun="alert('get error!')";
		myefun="console.log('error')";
	}
	if(!mydatatype){
	    mydatatype='json';
	}
	if(!mytype){
	    mytype='POST';
	}
	var options = {                                                  		//ajaxform表单提交设置
	    //target:   '#divid2',                                        	//结果显示目标
	    url:        myurl,     											//action目标
	    type:  		mytype,
	    dataType:	mydatatype,											//默认值
	    beforeSubmit: function(){										//提交前
		return eval(mycfun);
	    },
	    success: function(msg){											//表单提交后
		eval(mysfun);
	    },
	    error : function(){
		eval(myefun);
	    }
	};
	$(this).ajaxSubmit(options);
	return false;
    });
};

function newajax(myurl,mysfun,myefun,mydatatype,mytype){
    if(!myurl){
	alert("请输入相关参数!");
	return false;
    }
        
    if(myefun == '' || myefun == null){
		//myefun="alert('get error!')";
		myefun="console.log('error')";
    }

    if(!mydatatype){
	mydatatype='json';		//html json
    }
    if(!mytype){
	mytype='GET';
    }
    var options = {                                                  	//ajaxform表单提交设置
	//target:   '#divid2',                                      //结果显示目标
	url:        myurl,     										//action目标
	type:  		mytype,
	dataType:	mydatatype,									    //默认值
	success: mysfun,
	error : myefun
    };
    $(this).ajaxSubmit(options);
    return false;
};


function myajax(myurl,mysfun,myefun,mydatatype,mytype){
    if(!myurl){
	alert("请输入相关参数!");
	return false;
    }
        
    if(myefun == '' || myefun == null){
		//myefun="alert('get error!')";
		myefun="console.log('error')";
    }

    if(!mydatatype){
	mydatatype='json'; 	//html json
    }
    if(!mytype){
	mytype='GET';
    }
    var options = {                                                  	//ajaxform表单提交设置
	//target:   '#divid2',                                      //结果显示目标
	url:        myurl,     										//action目标
	type:  		mytype,
	dataType:	mydatatype,									    //默认值
	success: function(msg){										//表单提交后
	    eval(mysfun);
	},
	error : function(){
	    eval(myefun);
	}
    };
    $(this).ajaxSubmit(options);
    return false;
};

//使用url传参数时.先加密处理
function ajax_encode (str) {
    str=encodeURIComponent(str);
    if (navigator.product == 'Gecko') str=str.replace("/%0A/g", "%0D%0A");
    //In IE, a new line is encoded as rn, while in Mozilla it's n
    return str;
}

//全选
function select_all(name,type){
    $("input[name='"+name+"']").each(function(i){
	$(this).attr("checked", type);
    });
}
//选上checkbox情况
function count_select(name){
    var id_list='';
    $("input[name='"+name+"']").each(function(i){
	var type=$(this).prop("checked");					//1.6版本后必须用些判断
	var value=$(this).val();	
	if(type==true){
	    id_list = id_list ? id_list+','+value : id_list+value;
		
	};
    });
	
    if(id_list)
	return id_list;
    else
	return false;
}




function random_num(start, end){
    return Math.floor(Math.random() * (end - start) + start);
}




function accDiv(arg1,arg2){
    var t1=0,t2=0,r1,r2;
    try{
	t1=arg1.toString().split(".")[1].length
    }catch(e){}
    try{
	t2=arg2.toString().split(".")[1].length
    }catch(e){}
    with(Math){
	r1=Number(arg1.toString().replace(".",""))
	r2=Number(arg2.toString().replace(".",""))
	return (r1/r2)*pow(10,t2-t1);
	}
} 

function accMul(arg1,arg2)
{
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{
	m+=s1.split(".")[1].length
    }catch(e){}
    try{
	m+=s2.split(".")[1].length
    }catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
} 

function accAdd(arg1,arg2){
    var r1,r2,m;
    try{
	r1=arg1.toString().split(".")[1].length
    }catch(e){
	r1=0
    }
    try{
	r2=arg2.toString().split(".")[1].length
    }catch(e){
	r2=0
    }
    m=Math.pow(10,Math.max(r1,r2))
    return (arg1*m+arg2*m)/m
} 

//打印指定区，记住要加标签
function doPrint() 
{ 
    bdhtml=window.document.body.innerHTML; 
    sprnstr="<!--startprint-->"; 
    eprnstr="<!--endprint-->"; 
    prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17); 
    prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr)); 
    window.document.body.innerHTML=prnhtml; 
    window.print(); 
}



	
				
function load_collect(data,target){
    $(target+' option').remove();
    $.each(data, function(i, n) {
	$(target).append("<option value='"+i+"'>"+n.text+"</option>");

    });
}

function load_select(data,value,target){
    $(target+' option').remove();
    $.each(data, function(i, n) {
	if(n.gid == value){
			
	    $(target).append("<option value='"+n.key+"'>"+n.keyname+"</option>");
	}
		

    });
}
						
						
function check_string(value,type){
    switch(type){
	case "ename":
	    var re=/^[0-9a-z-_]+$/i;
	    return re.test(value);
	    break;
	case "name":
	    var longs=value.length;
	    if(longs>=2 && longs<20){
			return true;
		}else{
			return false;
		}
		
	    break;
	case "mail":
	    var re=/^(?:[a-z\d]+[_\-\+\.]?)*[a-z\d]+@(?:([a-z\d]+\-?)*[a-z\d]+\.)+([a-z]{2,})+$/i;
	    return re.test(value);
	    break;
	case "qq":
	    var re=/^[0-9]{5,14}$/i;
	    return re.test(value);
	    break;	
	case "phone":		
		re=/^[0-9\-]{8,18}$/;		
	    return re.test(value);
	    break;	
	case "mobile":		
		re=/^1[3|4|5|8|9][0-9]{9}$/;		
	    return re.test(value);
	    break;	
	case "letter":
	    var re=/^[a-z\s]+$/i;
	    return re.test(value);
	    break;
	case "number":
	    var re=/^[0-9]+$/;
	    return re.test(value);
	    break;
	case "zip_code":
	    var re=/^[0-9]{6}$/;
	    return re.test(value);
	    break;	
	case "money":
	    var re=/^[0-9\.]+$/;
	    return re.test(value);
	    break;
	case "code":
	    var re=/^\w{4}$/;
	    return re.test(value);
	    break;
	case "chinese":
	    var re=/^[\u4e00-\u9fa5\w\-\(\)]{4,20}$/;
	    return re.test(value);
		break;
	case "title":
	    var re=/^.{4,20}$/;
	    return re.test(value);
		break;				
	case "max100":
		if(value>=100){
			return true; 	
		}else{
			return false;	
		}
	break;
	case "length100":
		var longs=value.length;
		if(longs>=100){
			return false; 	
		}else{
			return true;
		}
	break;
	case "length20":
		var longs=value.length;
		if(longs>20){
			return false; 	
		}else{
			return true;
		}
	break;
	case "length30":
		var longs=value.length;
		if(longs>30){
			return false; 	
		}else{
			return true;
		}
	break;	
	default:
	break;
    }
	
}


function upload_file(target,output,sessionid,options){
	
    var uploadcancel= target+"_cancel";
    var uploadsubmit= target+"_submit";
    var toinput= target+"_photo";
    var toshowlist= target+"_list";
    var toshowpart= target+"_part";
    var todel= target+"_del";
    var url='/admin/ajax.htm';
    var filetype;

    if(options.multi == true){
    }else{
	options.multi = false;
    }
    if(options.dir == '' || options.dir == null){
	options.dir = 'file';
    }

    switch(options.dir){
	case "mp3":
	    filetype='*.mp3';
	    break;
	case "media":
	    filetype='*.3gp;*.mpg';
	    break;
	case "apk":
	    filetype='*.apk';
	    break;
	default:
	    filetype='*.rar;*.zip;*.7z;*.doc;*.docx;*.ppt;*.pptx;*.xls;*.xlsx;*.txt';
	    break;
    }

    $(target).uploadify({
	'uploader'      : '/public/flash/uploadify.swf',
	'script'        : url,				//执行页面
	'cancelImg'     : '/public/images/admin/cancel.png',
	'fileExt'		: filetype,
	'sizeLimit'		: '10482880',
	'fileDesc'		: filetype,
	'folder'        : '/public/upload',
	
	//'queueID'       : 'fileQueue',					//这行与div同时消失时,显示条在上传按键下方
	'auto'          : false,
	'multi'         : options.multi,
	'buttonText'	: '选择文件',
	'scriptData'	: {
	    'PHPSESSID':sessionid,
	    'act':'upfile',
	    'dir':options.dir
	   

	},
	/*'onSelect': function(e, queueId, fileObj)
        {
            alert("唯一标识:" + queueId + "\r\n" +
                  "文件名：" + fileObj.name + "\r\n" +
                  "文件大小：" + fileObj.size + "\r\n" +
                  "创建时间：" + fileObj.creationDate + "\r\n" +
                  "最后修改时间：" + fileObj.modificationDate + "\r\n" +
                  "文件类型：" + fileObj.type
            );

        },*/
	//执行页面后的参数
	'onError' : function (a, b, c, d) {
	    if (d.status == 404)
		alert('上传出错,地址不存在!');
	    else if (d.type === "HTTP")
		alert('error '+d.type+": "+d.info);
	    else if (d.type ==="File Size")
		alert('文件必须小于 10 M');
	    else
		alert('error '+d.type+": "+d.info);
	},
	'onComplete'	:function(event, queueID, fileObj,response) {
	   
	   var $return = $.parseJSON(response); 
	   if($return.error=='0'){
		$(output).val($return.url);
	    }else{
		alert($return.errortitle);
	    }
	    
	},
	'onAllComplete'	: function(event, data) {
	    if(data.errors=='0' && data.filesUploaded>0){
		my_alert('成功上傳 '+data.filesUploaded+' 个文件 ','操作提示');
		//alert(data.errors);
		
	    }else{
		//my_alert('共上传文件数');
		my_alert("共上传文件数"+ data.filesUploaded +" 失败文件数:" +data.errors,'信息提示');
	    }
	}
	
    });
	
    $(uploadcancel).click(function(){
	$(target).uploadifyClearQueue()
    });
    $(uploadsubmit).click(function(){
	//$(toinput).val('');
	$(target).uploadifySettings('scriptData', {
	    'old': $(output).val(),
	    'filename': $("#filename").val()
	    });

	//alert(Math.random());
	//$(toinput).val('');
	$(target).uploadifyUpload();
    });
	
	
}

function show_file(photos,target,part,text,remark,root){
    var list,photo_list;
    photo_list='';
    if(root == '' || root == null){
	root = 'public/upload/file/';
    }
    //alert(photos);
    //alert(target);
	
    var pre = target.substr(1);
    if(photos){
		
	list= photos.split(",");
	if(text)
	    textlist= text.split(",");
	for(var i=0;i<list.length;i++){
	    var $id = Math.floor(Math.random()* 10000+1);
	    if(text && textlist[i]){
		var $value = textlist[i];
	    }else{
		var $value = '说明';
	    }
	    //alert(list[i]);
	    //photo_list = photo_list+' <a href="public/upload/image/'+list[i]+'" target="new"><img src="public/upload/image/thumb/'+list[i]+'" width="120" /></a>';
	    var filepath = list[i].split("/");
	    var filename = filepath[filepath.length-1];
	    photo_list =photo_list+'<div id="'+$id+'_show">'
	    +'<div>'+'<a href="'+root+list[i]+'" target="_blank">'+filename+'</a>'
	    +'  <a class="photo_remove" onclick="$(function(){remove_file(\''+$id+'\',\''+list[i]+'\')})" id="'+$id+'" title="'+list[i]+'" href="javascript:void(0);"><img src="/public/images/admin/close2.png" width="17" height="18" /></a></div>'
	    +'<div class="photo_text"><input value="'+list[i]+'" name="'+pre+'_photo[]" type="hidden" size="18" value="'+list[i]+'" />';
	    if(remark){
		photo_list = photo_list+'<input value="'+$value+'" name="'+pre+'_photo_text[]" type="text" size="18" onclick=\'if(this.value="'+$value+'"){this.value=""}\' />';
	    }
	    photo_list = photo_list+'</div></div>';		
	
	}
		
	//alert(list.length);
	$(target).append(photo_list);
		
	$(part).show();
    }else{
	$(part).hide();
    }
	
	
}

function load_province(type,pro,city){
		var pro_ob,city_ob;
		switch(type){
			case "area":	
			pro_ob = "#province";
			city_ob = "#city";	
			break;
			case "cate":
			pro_ob = "#cate1";
			city_ob = "#cate2";	
			break;
		}
		$.getJSON("/info/cf_var_"+type+".js",function(data){
			var id,title,citys,id2,title2,show;
			
			$(data).each(function(i,items){ 
				id=items.id;
				title=items.title;
				citys=items.child;
                $(pro_ob).append("<option value='"+id+"'>"+title+"</option>");
				
				if(pro>0 && pro==id && citys!=null){
					show=true;
					$(citys).each(function(i2,items2){ 
						id2=items2.id;
						title2=items2.title;	
						$(city_ob).removeAttr("disabled");
						$(city_ob).append("<option value='"+id2+"'>"+title2+"</option>");
					})
					$(city_ob+" option[value="+city+"]").attr("selected",true);
				}
			})
				
			if(show==true){
				$(city_ob).show();
			}else{
				$(city_ob).hide();
			}
				if(pro>0)
                    $(pro_ob+" option[value="+pro+"]").attr("selected",true);
                else
                    $(pro_ob+" option[index=0]").attr("selected",true);
					
					
		 })
	}
	
	function change_province(type,pro){
		switch(type){
			case "area"	:
				var pro_ob = "#province";
				var city_ob = "#city";
				var text = "请选择城市";
			break;
			case "cate":
				var pro_ob = "#cate1";
				var city_ob = "#cate2";
				var text = "请选择子分类";
			break;
			
		}

		
		
		$.getJSON("/info/cf_var_"+type+".js",function(data){
			
			
			var id2,title2,citys,show;
			$(data).each(function(i,items){ 
				id=items.id;
				citys=items.child;
				if(pro==id && citys!=null){
					show=true;
					$(city_ob).removeAttr("disabled");
					$(city_ob+" option").remove();
                	$(city_ob).append("<option value=''>"+text+"</option>");
					$(citys).each(function(i2,items2){ 
						id2=items2.id;
						title2=items2.title;	
						$(city_ob).append("<option value='"+id2+"'>"+title2+"</option>");
					})
					$(city_ob+" option[index=0]").attr("selected",true);
					
				}
			})
			
			if(show==true){
				$(city_ob).show();
			}else{
				$(city_ob).hide();
			}
		})
	}


function get_thumb(url,type){
	var type,thumb;
	if(type=='' || type==null){
		type='thumb';	
	}
	if(url){
		ss = url.split("/");
		thumb = ss[0];
		for(var i=1;i<ss.length-1;i++){
			thumb = thumb+'/'+ss[i];	
		}
		thumb = thumb+'/'+type+ss[ss.length-1];	
		
	}
   return thumb;
	
	
}

//打印js 对象值
function dump_obj(obj){
	var msg=""; //设置一个空的变量
	for(var i in obj) //变量I 在obj对象中循环，这行不能加引号
	msg +=i+" => "+obj[i]+"\n" //将i读到的值叫给msg变量
	alert(msg);
}


function logininfort(msg){
	if(msg){
		$("#"+msg.ob).html(msg.tips);
	}else{
		//my_error(msg.tips,'操作提示');
	}
}
function logininfo(ob){
	myajax("default/ajax.htm?act=logininfo&ob="+ob,"logininfort(msg)","","JSON");	
}


//确认大框
function confirm_action(msg,url){
	BootstrapDialog.confirm({
		title : '确认提示',
		message:msg,
		type: BootstrapDialog.TYPE_WARNING,
		btnCancelLabel:'取 消',
		btnOKLabel:'确 定', 
		callback: function(result) {
			if (result) {
				window.location.href = url;
			} else {
				msg = false;
				//return false;
				//$return = false;
			}
		}
	});
	console.log(msg);
	
}

//确认小提示框
function confirm_tips(ob,title,callback){
	$(ob).popover({
		  html: true,
		  placement: 'top',
		  title: title,
		  content: "<button type='button' class='btn btn-success confirm_tips_ok' value='确 定'><i class='fa fa-check'></i> 确定</button><button onclick='$(\""+ob+"\").popover(\"hide\");' type='button' class='btn btn-default confirm_tips_cancel' value='取消' style='margin-left:15px'><i class='fa fa-close'></i> 取消</button>"
	});
	
	$(ob).on('shown.bs.popover', function () {
		  //alert('alert');
			$(".confirm_tips_ok").on("click",function(){
				eval(callback);
				$(ob).popover('hide');
			}); 
	});
	
}


//ajax 成功后提示专用
/* alert-info warning danger success */
/*    fa-info warning ban    check*/
function show_tips(text,type,time,callback){
	var type=(typeof(type)=="undefined") ? 'info' : type;
	var time=(typeof(time)=="undefined") ? 3000 : time*1000;
	var icon;
	switch(type){
		case "info":
			icon='info';
		break;
		case "warning":
			icon='warning';
		break;
		case "danger":
			icon='ban';
		break;
		case "success":
			icon='check';
		break;
		case "black":
			icon='ban';
		break;	
		
	}
	
	//是否在子框里面
	 if ($(".modal-body").length > 0) {
          var mydiv = '<div id="modal_tips_plugin" class="navbar navbar-fixed-bottom alert alert-'+type+' alert-dismissable alert-fixed alert-modal-fixed alertStyle fade in"><button type="button" class="closeStyle close" data-dismiss="alert" aria-hidden="true">×</button><span id="modal_tips_plugin_text"><i class="icon fa fa-'+icon+'"></i>'+ text+'</span></div>';
          if ($("#modal_tips_plugin").length > 0) {
			  $("#modal_tips_plugin").attr("class",'alert alert-'+type+' alert-dismissable alert-fixed alert-modal-fixed alertStyle fade in');
            $("#modal_tips_plugin").html('<button type="button" class="closeStyle close" data-dismiss="alert" aria-hidden="true">×</button><span id="modal_tips_plugin_text"><i class="icon fa fa-'+icon+'"></i> '+ text+'</span>');
          } else {
            $(".modal-body").append(mydiv);
          }
          $("#modal_tips_plugin").fadeIn('fast'); //下拉
          setTimeout(function() { //设置指定时间后的动作
            	$("#modal_tips_plugin").fadeOut('slow'); //上拉
				if(callback != '' || callback != null){
					eval(callback);
    			}
          }, time); //时间
        } else {
          var mydiv = '<div id="body_tips_plugin" class="navbar navbar-fixed-bottom alert alert-'+type+' alert-dismissable alert-fixed  alertStyle"><button type="button" class="closeStyle close" data-dismiss="alert" aria-hidden="true">×</button><span id="body_tips_plugin_text"><i class="icon fa fa-'+icon+'"></i>'+ text+'</span></div>';
          /* alert-info warning danger success */
		  
          /*    fa-info warning ban    check*/
        if ($("#body_tips_plugin").length > 0) {
			  $("#body_tips_plugin").attr("class",'navbar navbar-fixed-bottom alert alert-'+type+' alert-dismissable alert-fixed alertStyle');
            $("#body_tips_plugin").html('<button type="button" class="closeStyle close" data-dismiss="alert" aria-hidden="true">×</button><span id="body_tips_plugin_text"><i class="icon fa fa-'+icon+'"></i> '+ text+'</span>');
          } else {
            $("body").append(mydiv);
          }


          $("#body_tips_plugin").fadeIn('fast'); //下拉
          setTimeout(function() { //设置指定时间后的动作
            $("#body_tips_plugin").fadeOut('slow'); //上拉
			  	if(callback != '' || callback != null){
				eval(callback);
    			}
			
          }, time); //时间
        }
	
	
}




//QQ表情替换
function replace_em(str){
//  str = str.replace(/\</g,'&lt;');
 // str = str.replace(/\>/g,'&gt;');
  str = str.replace(/\n/g,'<br/>');
  str = str.replace(/\[em_([0-9]*)\]/g,'<img src="public/js/jquery/qqface/$1.gif" border="0" class="img-rounded" />');
  return str;
}


function request_data(setdata, callback, async) {

    var async_type = (typeof (async) == "undefined") ? true : async; //是否异步
    //console.log(callback +' ' +async + ''+async_type);
    $.ajax({
        type: "post",
        async: async_type,
        timeout: 10000,
        // cache:false, 
        url: 'http://192.168.16.16:9999/api/index.htm',
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "loaddata" + Math.round(Math.random() * 1000),
        data: setdata,
        success: callback,
        error: function () {
           // alert('请求超时,请重新操作');
        }
    });
}

function request_mdata(setdata, callback) {
    $.ajax({
        type: "post",
        async: true,
        timeout: 10000,
        // cache:false, 
        url: 'http://192.168.16.16:9999/api/mindex.htm',
        dataType: "json",
        data: setdata,
        success: callback,
        error: function () {
           // alert('请求超时,请重新操作');
        }
    });
}