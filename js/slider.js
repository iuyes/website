/*游戏大厅图片切换*/
;(function($) {
	$.fn.slider = function(o) {
		var d = {
			slider : '#slider', //整个对象
			num : '#slider_num li', //点击的对象
			pic : '#slider_pic', //需要切换的对象
			direction : 'top', //滚动方向top,left,默认显示可以是包含空值的任何东西
			index : 0, //默认显示第一项,从零开始
			time : 3000, //自动切换的时间,值为0不自动滚动
			movetime : 500, //图片动画时间*
			prev : '#prevbtn', //上一页按钮*
			next : '#nextbtn', //下一页按钮*
			afterSwitchEvent : function(index, $this, $pic) {
			},
			beforeSwitchEvent : function(index, $this, $pic) {
			}
		};
		var o = $.extend(d, o);
		/*图片切换*/
		var move = function() {
			d.beforeSwitchEvent(d.index, $(d.pic).children("li").eq(d.index), $(d.pic));
			$(d.num).eq(d.index).addClass('cur').siblings().removeClass('cur');
			var num = $(d.num).eq(d.index).index();
			$(d.pic).css({
				'position' : 'relative'
			});
			if (d.direction == 'top') {
				var basic = $(d.pic).children('li').height();
				var distance = num * basic;
				$(d.pic).stop(true, true).animate({
					'top' : -distance
				}, {
					duration : d.movetime
				}, function() {
					d.afterSwitchEvent(d.index, $(d.pic).children("li").eq(d.index));
				});
			} else if (d.direction == 'left') {
				var basic = $(d.slider).width();
				var distance = num * basic;
				var width = $(d.num).length * basic;
				$(d.pic).css({
					'width' : width
				});
				$(d.pic).children('li').css({
					'float' : 'left',
					width : basic
				});
				$(d.pic).stop(true, true).animate({
					'left' : -distance
				}, d.movetime, function() {
					d.afterSwitchEvent(d.index, $(d.pic).children("li").eq(d.index), $(d.pic));
				});
			} else {
				$(d.pic).children('li').eq(d.index).stop(true, true).show().siblings('li').stop(true, true).hide();
			}
			;
		};
		/*自动切换*/
		var automove = function() {
			d.index++;
			if (d.index >= $(d.num).length) {
				d.index = 0;
			};
			move();
			autotime = setTimeout(automove, d.time + d.movetime);
		};
		if (d.time == 0) {
			d.time = 1000000000;
		};
		var autotime = setTimeout(automove, d.time + d.movetime);
		/*鼠标切换*/
		$(d.num).mouseenter(function() {
			if (!$(this).hasClass('cur')) {
				d.index = $(this).index();
				move();
			};
		});
		/*鼠标悬浮停止切换*/
		$(d.slider).mouseenter(function() {
			clearTimeout(autotime);
		}).mouseleave(function() {
			autotime = setTimeout(automove, d.time + d.movetime);
		});
		/*点击按钮切换*/
		$(d.next).click(function() {
			d.index++;
			if (d.index >= $(d.num).length) {
				d.index = 0;
			};
			move();
			return false;
		});
		$(d.prev).click(function() {
			d.index--;
			if (d.index < 0) {
				d.index = $(d.num).length - 1;
			};
			move();
			return false;
		});
	};
})(jQuery); 