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

			// sidebarClip

			var sidebarClip = $('.sidebar-clip.clip-headline');

			function clipTransformStart(bOuter, bInner, wOuter, wInner) {
				sidebarClip.each(function (k, v) {
					var _this = $(this);
					var thisOuter, thisInner;

					thisOuter = _this.find('.outer-clip');
					thisInner = _this.find('.inner-clip');

					thisOuter.filter(':not(.white)').css({
						transform: 'translate(0, ' + bOuter + '%)'
					}).find(thisInner).css({
						transform: 'translate(0, ' + bInner + '%)'
					});

					thisOuter.filter('.white').css({
						transform: 'translate(0, ' + wOuter + '%)'
					}).find(thisInner).css({
						transform: 'translate(0, ' + wInner + '%)'
					});
				});
			}

			sidebarClip.each(function (k, v) {
				var _this = $(this);
				var thisH = _this.outerHeight(true);
				var thisOuter = _this.children('.outer-clip');

				_this.css({
					height: thisH
				}).attr('data-id', k).addClass('is-load');

				thisOuter.clone().addClass('white').prependTo(_this);

				clipTransformStart(0, 0, 100, -100);
			});


			// tweenMax

			var controller = new ScrollMagic.Controller();

			$('.sidebar-white').each(function() {

				var tweenMaxWhiteHeadline = new TimelineMax()
					.to(
						sidebarClip.children('.outer-clip').filter(':not(.white)'), 1, {
							yPercent: -100
						})
					.to(
						sidebarClip.children('.outer-clip').filter(':not(.white)').children('.inner-clip'), 1, {
							yPercent: 100
						})
					.to(
						sidebarClip.children('.outer-clip').filter('.white'), 1, {
							yPercent: 0
						})
					.to(
						sidebarClip.children('.outer-clip').filter('.white').children('.inner-clip'), 1, {
							yPercent: 0
						}, 0);

				var tweenMaxWhite = new TimelineMax()
					.add(tweenMaxWhiteHeadline, 0);

				var sceneWhite = new ScrollMagic.Scene({
					triggerElement: this.children[0],
					triggerHook: 1,
					duration: "100%"
				})
					.setTween(tweenMaxWhite)
					.addIndicators()
					.addTo(controller)

			});

		}, 850);
	}

});