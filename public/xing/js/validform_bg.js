 (function($) {
		$.validform = {
		    ajax:0,
		    focus:function(ob){						//隐藏对象
			var	$name = ob.attr("name");
			if($name.indexOf("[]") > 0 ){
				$name = ob.attr("id");
			}
			var	$span = $("#"+$name+"_span");
			$span.hide();
		    },
		    checkform:function(ob){
			var	$name = ob.attr("name");
			if($name.indexOf("[]") > 0 ){
				$name = ob.attr("id");
			}
			var	$span = $("#"+$name+"_span");
			var $v;
			
			switch(ob.attr("type")){
			    case "radio":
				$name = ob.attr("name");
				$v = $("input[name="+$name+"]:checked").val();
				break;
			    default:
				$v =  ob.val();
				break;
			}
			
			
			var $nullmsg = $span.attr("nullmsg");
			var $checktype = $span.attr("checktype");
			var $errormsg = $span.attr("errormsg");
			var $ajax = $span.attr("ajax");			
			if($span!=undefined){

				if($v==undefined || $v==''){						//空值限制提示
				if($nullmsg!=undefined){
				    //alert($nullmsg);
					$span.text($nullmsg);
				    $span.show();
				    return false;
				}else{						//没限制空值时,显示原来提示信息
				    $span.hide();
				    //return true;
				}
			    }
			    /*if($v!=undefined && ob.attr("type")=='radio'){
					$span.hide();
			    }   */
			   
			    if($checktype!=undefined  && $v){		
				if($checktype=='repwd'){			//如果是重复密码, 特殊检测,from是指要重复的id对象
						
				    var $id = $span.attr("from");
				    var $frompwd = $("#"+$id).val();
				    //alert($id+' '+$frompwd);
				    if($frompwd==$v){
					$span.hide(); 
				    }else{
					$span.text($errormsg);
					$span.show();
					return false;
				    }
				}else{								//其它类型,引用check_string函数
				   
				   
				    if(!check_string($v,$checktype)){
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
						default:
						break;						
					}
				   $.getJSON(ajaxurl,function(data){								
							  if(data.status=='1'){
								  ajax = '1'
								  $span.hide(); 
							  }else if(data.status='0'){
								  ajax = '0';
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
//alert($(this));
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