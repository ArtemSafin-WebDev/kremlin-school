function viewport() {
	var e = window, a = 'inner';
	if (!('innerWidth' in window )) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}


$(function() {

	if (viewport().width > 1023) {
		setTimeout(function () {

			var windowH = $(window).height();

			var scrollStartPos = 0;
			var scrollDirection = '';

			var finishArray = [];


			// sidebarClip

			var sidebarClip = $('.sidebar-clip');
			var sidebarClipArray = [];


			// sidebar copy targets

			function sidebarTarget() {
				sidebarClip.each(function () {
					var _this = $(this);
					var thisOuter = _this.find('.outer-clip');

					if (_this.hasClass('clip-brand') || _this.hasClass('clip-list')) {
						thisOuter.clone().removeClass('outer-clip').addClass('sidebar-target').appendTo(_this);
					}
				});
			}
			sidebarTarget();


			function clipTransformStart(bOuter, bInner, wOuter, wInner) {
				sidebarClip.each(function (k, v) {
					var _this = $(this);
					var thisOuter, thisInner;

					thisOuter = _this.find('.outer-clip');
					thisInner = _this.find('.inner-clip');

					thisOuter.filter(':not(.white)').css({
						transform: 'translateY(' + bOuter + '%) translateZ(0px)'
					}).find(thisInner).css({
						transform: 'translateY(' + bInner + '%) translateZ(0px)'
					});

					thisOuter.filter('.white').css({
						transform: 'translateY(' + wOuter + '%) translateZ(0px)'
					}).find(thisInner).css({
						transform: 'translateY(' + wInner + '%) translateZ(0px)'
					});
				});
			}

			function clipTransform(bOuter, bInner, wOuter, wInner, id) {
				var OuterClip = sidebarClip.filter('[data-id="' + id + '"]').find('.outer-clip');
				var InnerClip = sidebarClip.filter('[data-id="' + id + '"]').find('.inner-clip');

				OuterClip.filter(':not(.white)').css({
					transform: 'translateY(' + bOuter + '%) translateZ(0px)'
				}).find(InnerClip).css({
					transform: 'translateY(' + bInner + '%) translateZ(0px)'
				});

				OuterClip.filter('.white').css({
					transform: 'translateY(' + wOuter + '%) translateZ(0px)'
				}).find(InnerClip).css({
					transform: 'translateY(' + wInner + '%) translateZ(0px)'
				});
			}

			sidebarClip.each(function (k, v) {
				var _this = $(this);
				var thisH = _this.outerHeight();
				var thisOffset = _this.offset().top;
				var thisOuter = _this.find('.outer-clip');

				_this.css({
					height: thisH
				}).attr('data-id', k).addClass('is-load');

				thisOuter.clone().addClass('white').prependTo(_this);

				clipTransformStart(0, 0, 110, -110);

				sidebarClipArray.push({
					h: thisH,
					offsetTop: thisOffset,
					offsetBottom: windowH - thisOffset - thisH
				});
			});


			// sectionWhite

			var sectionWhite = $('.sidebar-white');
			var sectionWhiteArray = [];

			sectionWhite.each(function (k, v) {
				var _this = $(this);
				var thisPos = _this.offset().top;
				var thisH = _this.outerHeight(true);

				sectionWhiteArray.push({
					pos: thisPos,
					h: thisH,
					before_pos: windowH - thisH,
					before_pos_f: (thisPos - thisH) - (windowH - thisH),
					after_pos_f: thisPos - (windowH - thisH),
					after_pos: thisPos + thisH
				});

				for (var i = 0; i < sidebarClipArray.length; i++) {
					finishArray.push({
						id: i,
						h: sidebarClipArray[i].h,
						offsetTop: sidebarClipArray[i].offsetTop,
						offsetBottom: sidebarClipArray[i].offsetBottom,
						upPosStart: sectionWhiteArray[k].after_pos - sidebarClipArray[i].offsetTop,
						upPosFinish: (sectionWhiteArray[k].after_pos - sidebarClipArray[i].offsetTop) - sidebarClipArray[i].h,
						downPosStart: sectionWhiteArray[k].before_pos_f + sidebarClipArray[i].offsetBottom,
						downPosFinish: (sectionWhiteArray[k].before_pos_f + sidebarClipArray[i].offsetBottom) + sidebarClipArray[i].h,
						sectionStart: sectionWhiteArray[k].before_pos_f,
						sectionFinish: sectionWhiteArray[k].pos,
						sectionFinishF: sectionWhiteArray[k].after_pos_f,
						sectionH: sectionWhiteArray[k].h
					});
				}
			});


			// scrollWindow

			$(window).on('scroll touchmove', function() {
				var scrollW = window.pageYOffset || document.documentElement.scrollTop;

				if (scrollW > scrollStartPos) {
					scrollDirection = 'down';
				}else {
					scrollDirection = 'up';
				}

				console.log(scrollW);

				scrollStartPos = scrollW;

				$.each(finishArray, function (k, v) {
					var scrollPercentDownS,
						scrollPercentDownStart;
					var scrollPercentDownF,
						scrollPercentDownFinish;
					var scrollPercentUpS,
						scrollPercentUpStart;
					var scrollPercentUpF,
						scrollPercentUpFinish;

					if (scrollDirection === 'down') {
						if (scrollW >= v.downPosStart && scrollW <= v.downPosFinish) {

							scrollPercentDownS = (110 * (scrollW - v.downPosStart)) / v.h;
							scrollPercentDownStart = scrollPercentDownS.toFixed(2);
							clipTransform(
								-scrollPercentDownStart,
								scrollPercentDownStart,
								(110 - scrollPercentDownStart),
								-(110 - scrollPercentDownStart),
								v.id
							);

						}else if (scrollW > v.downPosFinish && scrollW < (v.sectionFinishF + v.offsetBottom)) {

							clipTransform(-110, 110, 0, 0, v.id);

						}else if (scrollW >= (v.sectionFinishF + v.offsetBottom) && scrollW <= ((v.sectionFinishF + v.offsetBottom) + v.h)) {

							scrollPercentDownF = (110 * (scrollW - (v.sectionFinishF + v.offsetBottom))) / v.h;
							scrollPercentDownFinish = scrollPercentDownF.toFixed(2);
							clipTransform(
								(110 - scrollPercentDownFinish),
								- (110 - scrollPercentDownFinish),
								- scrollPercentDownFinish,
								scrollPercentDownFinish,
								v.id
							);

						}else if (scrollW > ((v.sectionFinishF + v.offsetBottom) + v.h)) {

							clipTransform(0, 0, -110, 110, v.id);

						}
					}else if (scrollDirection === 'up') {
						if (scrollW >= v.upPosFinish && scrollW <= v.upPosStart) {

							scrollPercentUpS = (110 * (v.upPosStart - scrollW)) / v.h;
							scrollPercentUpStart = scrollPercentUpS.toFixed(2);
							clipTransform(
								scrollPercentUpStart,
								- scrollPercentUpStart,
								- (110 - scrollPercentUpStart),
								(110 - scrollPercentUpStart),
								v.id
							);

						}else if (scrollW < v.upPosFinish && scrollW > (v.sectionFinish - v.offsetTop)) {

							clipTransform(110, -110, 0, 0, v.id);

						}else if (scrollW >= ((v.sectionFinish - v.offsetTop) - v.h) && scrollW <= (v.sectionFinish - v.offsetTop)) {

							scrollPercentUpF = (110 * ((v.sectionFinish - v.offsetTop) - scrollW)) / v.h;
							scrollPercentUpFinish = scrollPercentUpF.toFixed(2);
							clipTransform(
								- (110 - scrollPercentUpFinish),
								(110 - scrollPercentUpFinish),
								scrollPercentUpFinish,
								- scrollPercentUpFinish,
								v.id
							)

						}else if (scrollW < ((v.sectionFinish - v.offsetTop) - v.h) && scrollW > v.sectionStart) {

							clipTransform(0, 0, 110, -110, v.id);

						}
					}
				});
			});

		}, 850);
	}

});