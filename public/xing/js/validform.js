 (function($) {
		$.validform = {
		    ajax:0,
		    focus:function(ob){						//隐藏对象
			var	$label = ob.prev().prev("label");
			var	$name = ob.attr("name");
			var	$span = $("#"+$name+"_span");
			
			ob.removeClass("input-error");
			ob.addClass("input-focus");
			$span.hide();
			$label.hide();
		    },
		    checkform:function(ob){
			var $label = ob.prev().prev("label");
			var	$name = ob.attr("name");
			var	$span = $("#"+$name+"_span");
			var $v;
			switch(ob.attr("type")){
			    case "radio":
				$v = $("input[name="+$name+"]:checked").val();
				break;
			    default:
				$v =  ob.val();
				
				break;
			}
			
			var $nullmsg = $label.attr("nullmsg");
			var $checktype = $label.attr("checktype");
			var $errormsg = $label.attr("errormsg");
			var $ajax = $label.attr("ajax");			
			if($label!=undefined){
			    //alert(type);
			    
			   
			    if($v==undefined || $v==''){						//空值限制提示
				if($nullmsg!=undefined){
				    $span.text($nullmsg);
				    ob.removeClass("input-focus");
				    ob.addClass("input-error");
				    $label.hide()
				    $span.show();
				    
				    return false;
				}else{						//没限制空值时,显示原来提示信息
				    // alert(ob.attr("type")+' '+ob.attr("id"));
				    
				    $span.hide();
				    $label.show();
				    //return true;
				}
			    }
			    if($v!=undefined && ob.attr("type")=='radio'){
				$span.hide();
			    }   
			   
			    if($checktype!=undefined  && $v){		
				if($checktype=='repwd'){			//如果是重复密码, 特殊检测,from是指要重复的id对象
						
				    var $id = $label.attr("from");
				    var $frompwd = $("#"+$id).val();
				    //alert($id+' '+$frompwd);
				    if($frompwd==$v){
					ob.removeClass("input-error");
					ob.addClass("input-focus");
					$span.hide(); 
				    }else{
					ob.removeClass("input-focus");
					ob.addClass("input-error");
					$label.hide();
					$span.text($errormsg);
					$span.show();
					return false;
				    }
				}else{								//其它类型,引用check_string函数
				    if(!check_string($v,$checktype)){
					ob.removeClass("input-focus");
					ob.addClass("input-error");
					$span.text($errormsg);
					$span.show();
					return false;
				    }
				}
			  
			    }
				
			    if($ajax!=undefined){//ajax checkuser
					switch($ajax){
						case "checkuser":
							var ajaxurl = "/default/ajax-act_checkuser.htm?param="+ajax_encode($v);						
						break;
						case "checkphone":
							var ajaxurl = "/default/ajax-act_checkphone.htm?param="+ajax_encode($v);						
						break;
						case "checkcode":
							var ajaxurl = "/default/ajax-act_checkcode.htm?param="+ajax_encode($v);						
						break;
						case "checksp":
							var ajaxurl = "/default/ajax-act_checksp.htm?param="+ajax_encode($v);						
						break;
						case "isexistuser":
							var ajaxurl = "/default/ajax-act_isexistuser.htm?param="+ajax_encode($v);						
						break;
						case "checksptitle":
							var ajaxurl = "/default/ajax-act_checksptitle.htm?param="+ajax_encode($v);						
						break;
						default:
						break;						
					}
				   $.getJSON(ajaxurl,function(data){								
							  if(data.status=='1'){
								  ajax = '1'
								  ob.removeClass("input-error");
								  ob.addClass("input-focus");
								  $span.hide(); 
							  }else if(data.status='0'){
								  ajax = '0';
								  ob.removeClass("input-focus");
								  ob.addClass("input-error");
								  $label.hide();
								  $span.text(data.tip);
								  $span.show(); 
								  return false;
							  }							  
						  }  
					); 
			    }
			}
			
		    },
		    setform:function(id){					//指定表单id 进行检测
			//$form = $("#"+id);
			$.validform.checksubmit(id);
			
			
			
			$("#"+id+" .valid").bind('blur',function(){
			    $.validform.checkform($(this));
			}).bind("focus",function(){
			    $.validform.focus($(this));
			});
			
			
			
		    },
		    checksubmit:function(id){					//提交时重新检测
			$("#"+id).submit(function(){
			    var errors=0;
			    var rs; 
			    $("#"+id+" .valid").each(function(){
				var rs=$.validform.checkform($(this));
				if( rs===false){
				    errors++;
				}
			    }) 
			    //alert(errors);
			    if(errors!=0){
				return false;
			    }
			    
			    
			});
		    }
		}   
	    })(jQuery);