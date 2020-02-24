function viewport() {
	var e = window, a = 'inner';
	if (!('innerWidth' in window )) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}


$(function() {

	// accordion

	var accordion = $('.accordion-item');

	accordion.each(function () {
		var _this = $(this);
		if (_this.hasClass('is-open')) {
			_this.find('.accordion-cnt').slideDown();
		}
	});

	$('.accordion-title').on('click', function (e) {
		e.preventDefault();
		var _this = $(this);
		accordion.not(_this.parent()).removeClass('is-open').find('.accordion-cnt').slideUp();
		if (!_this.parent().hasClass('is-open')) {
			_this.parent().addClass('is-open').find('.accordion-cnt').slideDown();
		}else {
			_this.parent().removeClass('is-open').find('.accordion-cnt').slideUp();
		}
	});


	// slick slider

	if (viewport().width > 600 && $('*').is('.courses-slider')) {
		var coursesSlider = $('.courses-slider');
		var coursesSlide = $('.courses-slide');
		var coursesArrows = $('.courses-slider-arrows');
		var coursesPrevArrow = coursesArrows.find('.slick-prev');
		var coursesNextArrow = coursesArrows.find('.slick-next');
		var coursesTabNav = $('.courses-tab');

		coursesSlider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			speed: 0,
			useTransform: false,
			arrows: false,
			dots: false,
			fade: false,
			variableWidth: true
		});

		coursesTabNav.each(function (k, v) {
			var _this = $(this);
			_this.attr('data-id', k);
		});

		coursesSlider.each(function (k, v) {
			var _this = $(this);
			_this.attr('data-id', k);
		});

		coursesSlider.filter('[data-id="0"]').addClass('is-show');

		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			coursesSlider.removeClass('is-show');
			coursesSlider.filter('[data-id="' + $(e.target).attr('data-id') + '"]').addClass('is-show');
		});

		coursesPrevArrow.on('click', function () {
			coursesSlider.filter('.is-show').slick('slickPrev')/*.addClass('is-left')*/;
			/*setTimeout(function () {
				coursesSlider.removeClass('is-left');
			}, 700);*/
		});

		coursesNextArrow.on('click', function () {
			coursesSlider.filter('.is-show').slick('slickNext')/*.addClass('is-right')*/;
			/*setTimeout(function () {
				coursesSlider.removeClass('is-right');
			}, 700);*/
		});

		var widthSlideCourses = 433;

		function animSlideCourses(k, v, nextSlide) {
			setTimeout(function() {
				$(v).css({
					left: - (widthSlideCourses * nextSlide)
				});
			}, 100 * k);
		}

		coursesSlider.filter('.is-show').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			if (nextSlide > currentSlide) {
				coursesSlider.filter('.is-show').find(coursesSlide).each(function (k, v) {
					animSlideCourses(k, v, nextSlide);
				});
			}else {
				$(coursesSlider.filter('.is-show').find(coursesSlide).get().reverse()).each(function (k, v) {
					animSlideCourses(k, v, nextSlide);
				});
			}
		});
	}

	if (viewport().width > 600 && $('*').is('.news-slider')) {
		var newsSlider = $('.news-slider');
		var newsSlide = $('.news-slide');
		var newsArrows = $('.news-slider-arrows');
		var newsPrevArrow = newsArrows.find('.slick-prev');
		var newsNextArrow = newsArrows.find('.slick-next');
		var newsTabNav = $('.news-tab');

		newsSlider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			speed: 0,
			useTransform: false,
			arrows: false,
			dots: false,
			fade: false,
			variableWidth: true
		});

		newsTabNav.each(function (k, v) {
			var _this = $(this);
			_this.attr('data-id', k);
		});

		newsSlider.each(function (k, v) {
			var _this = $(this);
			_this.attr('data-id', k);
		});

		newsSlider.filter('[data-id="0"]').addClass('is-show');

		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			newsSlider.removeClass('is-show');
			newsSlider.filter('[data-id="' + $(e.target).attr('data-id') + '"]').addClass('is-show');
		});

		newsPrevArrow.on('click', function () {
			newsSlider.filter('.is-show').slick('slickPrev')/*.addClass('is-left')*/;
			/*setTimeout(function () {
				newsSlider.removeClass('is-left');
			}, 700);*/
		});

		newsNextArrow.on('click', function () {
			newsSlider.filter('.is-show').slick('slickNext')/*.addClass('is-right')*/;
			/*setTimeout(function () {
				newsSlider.removeClass('is-right');
			}, 700);*/
		});

		var widthSlideNews = 433;

		function animSlideNews(k, v, nextSlide) {
			setTimeout(function() {
				$(v).css({
					left: - (widthSlideNews * nextSlide)
				});
			}, 100 * k);
		}

		newsSlider.filter('.is-show').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			if (nextSlide > currentSlide) {
				newsSlider.filter('.is-show').find(newsSlide).each(function (k, v) {
					animSlideNews(k, v, nextSlide);
				});
			}else {
				$(newsSlider.filter('.is-show').find(newsSlide).get().reverse()).each(function (k, v) {
					animSlideNews(k, v, nextSlide);
				});
			}
		});
	}

	if ($('*').is('.teachers-nav') && $('*').is('.teachers-for')) {
		var teacherNav = $('.teachers-nav');
		var teacherFor = $('.teachers-for');
		var teacherForSlide = $('.teachers-for__slide');
		var teacherNavSlide = $('.teachers-nav__slide');
		var teacherNavSlideLength = teacherNavSlide.length;

		if(viewport().width > 1023) {
			if (teacherNavSlideLength <= 3) {
				teacherNav.addClass('not-scroll');
			}
		}

		teacherNav.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			arrows: false,
			dots: false,
			fade: false,
			variableWidth: true,
			asNavFor: '.teachers-for',
			useTransform: teacherNavSlideLength > 3 ? true : false,
			speed: teacherNavSlideLength > 3 ? 450 : 0,
			responsive: [{
				breakpoint: 1024,
				settings: {
					useTransform: true,
					speed: 450
				}
			}]
		});

		teacherFor.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			speed: 650,
			useTransform: false,
			arrows: false,
			dots: false,
			fade: true,
			draggable: false,
			swipe: false,
			touchMove: false,
			asNavFor: '.teachers-nav',
			responsive: [{
				breakpoint: 1024,
				settings: {
					useTransform: true,
					speed: 450
				}
			}]
		});

		teacherNavSlide.on('click', function () {
			var _this = $(this);
			var thisId = parseInt(_this.attr('data-slick-index'));

			teacherNav.slick('slickGoTo', thisId);
		});
	}

	if ($('*').is('.modal-gallery-nav') && $('*').is('.modal-gallery-for')) {
		var galleryNav = $('.modal-gallery-nav');
		var galleryFor = $('.modal-gallery-for');
		var galleryNavSlide = $('.modal-gallery-nav__slide');

		galleryNav.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			speed: 450,
			arrows: false,
			dots: false,
			fade: false,
			variableWidth: true,
			asNavFor: '.modal-gallery-for'
		});

		galleryFor.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			speed: 450,
			arrows: true,
			dots: false,
			fade: false,
			draggable: false,
			swipe: false,
			touchMove: false,
			asNavFor: '.modal-gallery-nav',
			responsive: [{
				breakpoint: 1024,
				settings: {
					arrows: false
				}
			}]
		});

		galleryNavSlide.on('click', function () {
			var _this = $(this);
			var thisId = parseInt(_this.attr('data-slick-index'));

			galleryNav.slick('slickGoTo', thisId);
		});

		$('.modal').on('shown.bs.modal', function () {
			setTimeout(function () {
				galleryFor.slick('refresh');
				galleryNav.slick('refresh');
			}, 450);
		});
	}

	if ($('*').is('.reviews-slider')) {
		$('.reviews-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			speed: 650,
			useTransform: false,
			arrows: true,
			dots: false,
			fade: true,
			prevArrow: '<button class="slick-prev slick-arrow" aria-label="Prev" type="button" style="">Prev</button>',
			nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style="">Next</button>',
			appendArrows: '.reviews-slider-arrows',
			responsive: [{
				breakpoint: 600,
				settings: {
					useTransform: true,
					variableWidth: true,
					fade: false,
					speed: 450
				}
			}]
		});
	}


	// scroll top

	var scrollBtn = $('.scroll-top');

	$(window).on('scroll', function() {
		if ($(window).scrollTop() > 300) {
			scrollBtn.addClass('is-visible');
		} else {
			scrollBtn.removeClass('is-visible');
		}
	});

	scrollBtn.on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, '450');
	});


	// sidebar

	function sidebarBurger() {
		var htmlBox = $('html');
		htmlBox.toggleClass('no-scroll is-open-sidebar');
		setTimeout(function () {
			$('.sidebar-scroll').stop().animate({
				scrollTop: 0
			}, 450);
		}, 450);
	}

	$('.sidebar-burger').on('click', function () {
		sidebarBurger();
	});


	// scroll target

	$(document).on('click', 'a[href^="#target-"], [data-href^="#target-"]', function(e) {
		e.preventDefault();

		var thisEl = $(this);
		var thisAttrHref;

		if (thisEl.attr('data-href')) {
			thisAttrHref = thisEl.attr('data-href');
		}else {
			thisAttrHref = thisEl.attr('href');
		}

		$('html, body').animate({
			scrollTop: $(thisAttrHref).offset().top
		}, 450);

		console.log(thisAttrHref);

		if (viewport().width < 1024) {
			sidebarBurger();
		}
	});

});


// loader

var loader = $('.loader');
var loaderLine = $('.loader-line').find('.inner-line');
var loaderStep = 0;

function loaderProgress() {
	var intervalID;

	intervalID = setInterval(function () {
		loaderStep += 2;
		if (loaderStep <= 100) {
			loaderLine.css({
				width: loaderStep + '%'
			});
		}
	}, 100);

	$(window).on('load', function () {
		clearInterval(intervalID);
		loaderLine.css({
			width: '100%'
		});
		$('html, body').stop().animate({
			scrollTop: 0
		}, 250);
		setTimeout(function () {
			loader.addClass('onload');
			setTimeout(function () {
				$('body').removeClass('load');
			}, 550);
		}, 450);
	});
}

loaderProgress();