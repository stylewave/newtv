function ajax_encode (str) {
    str=encodeURIComponent(str);
    if (navigator.product == 'Gecko') str=str.replace("/%0A/g", "%0D%0A");
    return str;
}
function call_editor(area, type, lang) {
    var $langType, $resizeType, $allowImageUpload, $allowFileManager, $items, $pasteType, $filterMode, $newlineTag;


    if (lang) {                                //加载的input名
        $langType = lang;
    } else {
        $langType = "zh_CN";

    }

    if (type == 'full') {
        $resizeType = true;
        $allowImageUpload = true;
        $allowFileManager = true;
		
        $pasteType = 2;								//图片文字粘贴
        $filterMode = false;
    } else if (type == 'nomal') {
        $resizeType = true;
        $allowImageUpload = true;
        $allowFileManager = false;
        $pasteType = 2;								//图片文字粘贴
        $filterMode = false;
        $items = [
            'source', '|', 'undo', 'redo', '|', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
            'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
            'insertunorderedlist', '|', 'image', 'multiimage', 'link', 'unlink'];
    } else {
        $resizeType = false;
        $allowImageUpload = false;
        $allowFileManager = false;
        $pasteType = 1;								//只能文字
        $filterMode = true;
        $items = [
            'fontname', '|', 'undo', 'redo', '|', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
            'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
            'insertunorderedlist', '|', 'image', 'link', 'unlink'];
    }

    var editor = KindEditor.create(area, {
        langType:$langType,
        resizeType:$resizeType,
        allowImageUpload:$allowImageUpload,
        allowFileManager:$allowFileManager,
		allowImageRemote:$allowFileManager,
        pasteType:$pasteType,
        filterMode:$filterMode,
        newlineTag:'br',
        items:$items,
		afterBlur: function(){this.sync();}
    });
	
}




function call_uploader(button, output, type, options) {
	
    $(output).attr("readonly", "readonly");
    //原图片
    //alert($(output).val());

    KindEditor.ready(function (K) {

        //var options = K.undef(options, {});
        var dir,url;
        var params = options.params;
		var path = options.path;
		
		switch(path){
			case "user":
				var path = '/user';
			break;
			case "sp":
				var path = '/sp';
			break;
			default:
				var path = '/admin';
			break;	
		}
		options.realpath =path ;		
        //alert(params);
        var editor = K.editor({
            allowFileManager:K.undef(options.manage, false), //管理
			allowImageRemote:K.undef(options.manage, false), 
            uploadJson:path+'/ajax.htm?act=ajaxupload&rand=' + Math.random(), //缩略图类型
            fileManagerJson:path+'/filemanager.htm'

        });
        dir = type;
        switch (type) {
			case "logo":
				dir = 'image';
                params = params + "&size=300&thumb=200,200";
			case "goods":
            case "image":		
                $(button).click(function () {
                    editor.loadPlugin('image', function () {

                        editor.plugin.imageDialog({
                            showRemote:K.undef(options.manage, false), //false 本地上传, true远程并上传
                            showLocal:true, //false 本地上传,
							
                            fileType:K.undef(dir, 'image'),
                            oldFile:ajax_encode($(output).val()),
                            params:params,
							clickFn:function (url, title, width, height, border, align) {
                                 $(output).val(url);
                                if (options.show) {
                                    $(options.show).append(show_photo_div(button,output,url,options.realpath));
                                }
                                editor.hideDialog();
                            }
                            /*clickFn:function (url, title, width, height, border, align) {
                                $(output).val(url);
                                if (options.show) {
                                    $(options.show).html('<a href="' + url + '" target="_blank"><img src="' + url + '" width="50" height="50" onload="javascript:drawimage(this,50,50)" /></a>');
                                }
                                editor.hideDialog();
                            }*/
                        });
                    });
                });
                break;
            case "apkimage":
                $(button).click(function () {
                    var name = 'filename=coship_' + $("#sn").val();
                    editor.loadPlugin('image', function () {
                        editor.plugin.imageDialog({
                            showRemote:false, //false 本地上传, true远程并上传
                            showLocal:true, //false 本地上传,
                            fileType:K.undef(dir, 'image'),
                            oldFile:ajax_encode($(output).val()),
                            params:K.undef(name, ''),
                            clickFn:function (url, title, width, height, border, align) {
                                $(output).val(url);
                                if (options.show) {
                                    $(options.show).append(show_photo_div(button,output,url,options.realpath));
                                }
                                editor.hideDialog(); 
                            }
                        });
                    });
                });
                break;
            case "media":
			case "app":
            case "file":
                $(button).click(function () {
                    editor.loadPlugin('insertfile', function () {
                        editor.plugin.fileDialog({
                            fileType:K.undef(dir, 'file'),
                            oldFile:ajax_encode($(output).val()),
                            params:params,
                            clickFn:function (url, title, width, height, border, align) {
                                $(output).val(url);
                                if (options.show) {
                                   $(options.show).append(show_file_div(button,output,url,options.path));
                                }
                                editor.hideDialog();
                            }
                        });
                    });
                });
                break;
            case "apk":
                $(button).click(function () {
                    var name = 'filename=coship_' + $("#sn").val();
                    editor.loadPlugin('insertfile', function () {
                        editor.plugin.fileDialog({
                            fileType:K.undef(dir, 'file'),
                            oldFile:ajax_encode($(output).val()),
                            params:K.undef(name, ''),
                            clickFn:function (url, title, width, height, border, align) {
                                $(output).val(url);
                                if (options.show) {
                                   $(options.show).append(show_file_div(button,output,url,options.path));
                                }
                                editor.hideDialog();
                            }
                        });
                    });
                });
                break;
				case "nofix":
				 $(button).click(function () {
                    editor.loadPlugin('image', function () {
                        editor.plugin.imageDialog({
                            showRemote:K.undef(options.manage, false), //false 本地上传, true远程并上传
                            showLocal:true, //false 本地上传,
                            fileType:K.undef(dir, 'image'),
                            oldFile:ajax_encode($(output).val()),
                            params:params,
							clickFn:function (url, title, width, height, border, align) {
                                 $(output).val(url);
                                if (options.show) {
                                    $(options.show).append(show_photo_div(button,output,url,options.realpath,false));
                                }
                                editor.hideDialog();
                            }                          
                        });
                    });
                });
				break;
				default:				
				break;

        }


    });

}

function show_file_div(button,output,url,path){
	if(typeof(path)=="undefined")
	path="admin";
	var info='<div><a href="' + url + '" target="_blank">下载文件</a><br \><a href="javascript:void(0)" class="red" onclick="close_photo_div($(this),\''+button+'\',\'' + url + '\',\'' + output + '\',\'' + path + '\')">删除文件</a></div>';
	$(button).hide();
	return info;
}

function show_photo_div(button,output,url,path,thumb){
	if(typeof(path)=="undefined")
	    path="admin";
    if(typeof(thumb)=="undefined")
        thumb=true;
    if(thumb){
        var info='<div><a href="' + url + '" target="_blank"><img src="' + get_thumb(url) + '"  height="80" onload="javascript:drawimage(this,80,80)" /></a><br \><a href="javascript:void(0)" class="red" onclick="close_photo_div($(this),\''+button+'\',\'' + url + '\',\'' + output + '\',\'' + path + '\')">删除</a></div>';
    }else{
        var info='<div><a href="' + url + '" target="_blank"><img src="' + url + '"  height="80" onload="javascript:drawimage(this,80,80)" /></a><br \><a href="javascript:void(0)" class="red" onclick="close_photo_div($(this),\''+button+'\',\'' + url + '\',\'' + output + '\',\'' + path + '\')">删除</a></div>';
    }
    $(button).hide();
	return info;
}

function close_photo_div(ob,button,file,input,path){
	ob.parent().remove();
	$.post(path+"/ajax.htm", { act: "ajaxdel", value1: file } );
	$(input).val('');
	///alert(input);
	$(button).show();
	//alert(file);
}


function add_photo_text(key,photo,text){
 // var key = 'myupfile';
  var count =  accAdd($("#"+key+"_count").val(),1);
  var showid = key+count+"_show";
  var urlid = key+count+"_url";
  var textid = key+count+"_text";
  var btid = key+count;
  $("#myupfile_count").val(count);
  
  var html_str = ' <div class="AD-upload-img">';
			html_str += '                    <div class="btn-image-wrap pr l">';
			html_str += '                       <span id="'+showid+'"> <a href="javascript:void(0);" class="btn-image '+key+'" id="'+btid+'"><span></span></a></span>';
			html_str += '                       <input type="hidden"  name="'+key+'[]" id="'+urlid+'" value="'+photo+'" />';
			html_str += '                   </div>';
			html_str += '                     <div class="AD-upload-img-textarea pr">';
			html_str += '                        <span class="pa">描述:</span>';
			html_str += '                       <textarea class="btn-textarea" cols="45" rows="3" name="'+key+'_text[]" id="'+textid+'">'+text+'</textarea>';
			html_str += '                    </div>';
			html_str += '               </div>';
			$("#item_list2").append(html_str)  
}

function add_photo_text_admin(key,photo,text){
    // var key = 'myupfile';
    var count =  accAdd($("#"+key+"_count").val(),1);
    //alert(count);
    var showid = key+count+"_show";
    var urlid = key+count+"_url";
    var textid = key+count+"_text";
    var btid = key+count;
    $("#myupfile_count").val(count);

    var html_str = ' <tr>';
    html_str += '                       <td width="10%" align="left">';
    html_str += '                           <span id="'+showid+'"> <a href="javascript:void(0);" class="btn-image '+key+'" id="'+btid+'"><img src="/public/images/admin/upload.jpg"></a></span>';
    html_str += '                           <input type="hidden"  name="'+key+'[]" id="'+urlid+'" value="'+photo+'" />';
    html_str += '                       </td>';
    html_str += '                       <td width="5%" valign="middle" align="center" >';
    html_str += '                           <span class="pa">描述:</span>';
    html_str += '                       </td>';
    html_str += '                       <td width="85%" align="left" >';
    html_str += '                           <textarea class="btn-textarea" cols="80" rows="3" name="'+key+'_text[]" id="'+textid+'">'+text+'</textarea>';
    html_str += '                       </td>';
    html_str += '  </tr>';

    $("#item_list2").append(html_str)
}

function file_uploader(button, output, type,path,session){
	switch(path){
		case "user":
			var path = '/user';
		break;
		case "sp":
			var path = '/sp';
		break;
		default:
			var path = '/admin';
		break;	
	}
	
	switch(type){
		case "apk":
			var filetyp = '*.apk';
		break;
		case "app":
			var filetyp = '*.apk';
		break;
		case "media":
			var filetyp = '*.3gp;*.mp3;*.mp4;*.lrc';
		break;
		default:
			var filetyp = '*.doc;*.docx;*.xls;*.xlsx;*.ppt;*.pptx;*.txt;*.zip;*.rar';
		break;	
	}
	
	
	$(button).uploadify({
			'formData'     : {
				'PHPSESSID' : session
			},
			'swf'      : '/public/js/jquery/uploadify/uploadify.swf',
			'uploader' : path+'/ajax.htm?act=ajaxupload&dir='+type+'&rand=' + Math.random(),
			'buttonText': '文件上传',
			'fileSizeLimit': '20MB',
			'auto': true,
			'debug': false,
			'multi': false,
			'fileObjName':'imgFile',
			'fileTypeExts': filetyp,
			'onSelect' : function(file) {//当每个文件添加至队列后触发
			　　//dump_obj(file);
			},
			'onUploadStart': function(file) {
				if(type=='apk'){
					$(button).uploadify("settings", "formData", { 'old': $(output).val(),'filename':'coship_'+$("#sn").val() }); 	
				}else{
					$(button).uploadify("settings", "formData", { 'old': $(output).val() }); 
				}
				
				
			},
			'onUploadSuccess' : function(file,returndata,response) {//上传完成时触发（每个文件触发一次）,此方法被重写过,请自行查询uploadfy.js文件
				//dump_obj(response);
				if(response){				
					//var val = $('#file_upload_url').val();
					//val = val ? val+'|'+returndata : returndata;
					$(output).val(returndata);
					$(button+'_show').append(show_file_div(button, output, returndata,path));
				}else{
					alert('上传失败啦');
				}
			
			}
		});

}