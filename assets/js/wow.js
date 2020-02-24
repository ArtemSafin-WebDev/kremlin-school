$(window).on('load', function() {

	setTimeout(function () {
		var wow = new WOW(
			{
				animateClass: 'animated',
				mobile: false
			}
		);
		wow.init();
	}, 850);

});