

function hideDiv(targetID,spd){
	if($('#'+targetID).length>0){
		var speed = spd == undefined ? 300 :spd;
		$('#'+targetID).stop().hide(speed);
	}
}
$(window).scroll(function(){
		if($(window).scrollTop()>200)
		{
			$("#sidebottom").fadeIn();
		}
		if($(window).scrollTop()<200)
		{
			$("#sidebottom").fadeOut();
		}
		scollStop();
	});
function scollStop() {
	var sh = $(window).scrollTop();
	var bh = $('html').height()-$(window).height();
	var bleftbart = $(window).height()-700;
	if(sh < 170){
		$('#leftbar').css('top','185px');
	}
	else if(sh >=200 && sh < (bh-210)) {
		$('#sidebottom').css('bottom','0');
		$('#leftbar').css('top','100px');
	}
	else
	{
		$('#sidebottom').css('bottom','210px');
		$('#leftbar').css('top',bleftbart+'px');
	}
}
$.fn.extend({ //三个圆点的通用方法，类似小圆点的控制区块样式scontrol，被控制区块样式lislide，需统一
		ss: function (speed)
		{
			var obj = $(this);
			var currentIndex = obj.data("ci");
			obj.data("speed", speed);
			if (currentIndex == null)
			{
				currentIndex = -1;
			}
			var itemCount = obj.children(".lislide").length;
			if (itemCount <= 1)
			{
				obj.find('.lislide').show();
				obj.find('.scontrol').hide();
				return;
			}

			var scs = obj.find(".scontrol");
			scsnum = scs.length;
			for(scsnum;scsnum < itemCount;scsnum++){
				obj.find(".scontrol").parent().append(scs.clone());
			}
			var nextIndex = (currentIndex + 1) % itemCount;
			var currentBtn = obj.find(".scontrol").eq(currentIndex);
			var nextBtn = obj.find(".scontrol").eq(nextIndex);


			obj.find(".scontrol").mouseover(function ()
				{
					if (obj.data("tid") != null)
					{
						clearTimeout(obj.data("tid"));
						obj.removeData("tid");
					}
					obj.find(".hover").removeClass("hover");
					var cindex;
					for (var i = 0; i < scs.length; i++)
					{
						if (scs[i] == this)
						{
							cindex = i;
						}
					}
					obj.children(".lislide:visible").hide();
					obj.find(".scontrol").eq(cindex).addClass("hover");
					obj.children(".lislide").eq(cindex).show();
					var tid = setTimeout(function () { obj.ss(speed); }, speed);
					obj.data("ci", cindex);
					obj.data("tid", tid);
				})
			.click(function ()
				{
					if (obj.data("tid") != null)
					{
						clearTimeout(obj.data("tid"));
						obj.removeData("tid");
					}
					obj.find(".hover").removeClass("hover");
					var cindex;
					for (var i = 0; i < scs.length; i++)
					{
						if (scs[i] == this)
						{
							cindex = i;
						}
					}
					obj.children(".lislide:visible").hide();
					obj.find(".scontrol").eq(cindex).addClass("hover");
					obj.children(".lislide").eq(cindex).show();
					var tid = setTimeout(function () { obj.ss(speed); }, speed);
					obj.data("ci", cindex);
					obj.data("tid", tid);
				});

			obj.children(".lislide").eq(currentIndex).fadeOut(
				'slow',
				function ()
				{
					currentBtn.removeClass("hover");
					nextBtn.addClass("hover");
					obj.children(".lislide").eq(nextIndex).fadeIn('slow');

				});


			var tid = setTimeout(function () { obj.ss(speed); }, speed + 600);
			obj.data("ci", nextIndex);
			obj.data("tid", tid);
		}
	});