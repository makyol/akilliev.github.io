'use strict';
var theme = {
	init: function () {
		$('.lazy').Lazy({
			scrollDirection: 'vertical',
			effect: 'fadeIn',
			visibleOnly: true,
			onError: function(element) {
				console.log('error loading ' + element.data('src'));
			}
		});
			 
		this.events();
		this.afterInit();
	},

	afterInit: function () {
		var _t = this;
		_t.methods.randomBubble();
		_t.methods.headerFixed();
		
		_t.methods.initSlider('.user-stories-widget .list');
		_t.methods.newsSlider('.news-widget .list .row');
		_t.methods.categorySlider('.category-carousel .row');
		_t.methods.showcaseImageSlider.init();

		$('.parsley-validation').parsley();
	},

	methods: {
		getRandomPosition: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		randomBubble: function() {
			var self = this;
			var min = 0;
			var max = -10;
			var min2 = 0;
			var max2 = 70;

			if (window.matchMedia("(max-width: 576px)").matches) {
				max =  -4;
				max2 = 60;
				min = 0;
				min2 = -5;
			}
			
			$('.bubble-1').css({
				left: self.getRandomPosition(min, max) + '%',
				top: self.getRandomPosition(min2, max2) + '%'
			});
			
			$('.bubble-2').css({
				right: self.getRandomPosition(min, max) + '%',
				bottom: self.getRandomPosition(min2, max2) + '%'
			});
		},

		initSlider: function (element) {
			if ($(element).length == 0) {
				return;
			}
			$(element).slick({
				autoplay: true,
				autoplaySpeed: 6000,
				arrows: false,
				dots: true,
				infinite: true,
				speed: 300,
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: true,
				cssEase: 'ease-in-out',
				prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"><i class="fas fa-angle-left"></i></button>',
				nextArrow: '<button type="button" class="slick-next" aria-label="Next"><i class="fas fa-angle-right"></i></button>'
			});
			$(element).on('afterChange', function(event, slick, currentSlide) {
				if((slick.$slides.length - slick.options.slidesToShow) <= currentSlide) {
					$(element).slick('slickGoTo', 0);
				}
			});
		},

		newsSlider: function (element) {
			if ($(element).length == 0) {
				return;
			}
			$(element).not('.slick-initialized').slick({
				autoplay: true,
				autoplaySpeed: 6000,
				arrows: true,
				dots: false,
				infinite: false,
				speed: 300,
				slidesToShow: 3,
				slidesToScroll: 3,
				prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"><i class="fas fa-angle-left"></i></button>',
				nextArrow: '<button type="button" class="slick-next" aria-label="Next"><i class="fas fa-angle-right"></i></button>',
				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							arrows:false,
							dots:true
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							arrows:false,
							dots:true
						}
					},
					{
						breakpoint: 575,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							arrows:false,
							dots:true
						}
					}
				]
			});
			$(element).on('afterChange', function(event, slick, currentSlide) {
				if((slick.$slides.length - slick.options.slidesToShow) <= currentSlide) {
					$(element).slick('slickGoTo', 0);
				}
			});
		},

		categorySlider: function (element) {
			if ($(element).length == 0) {
				return;
			}
			$(element).not('.slick-initialized').slick({
				autoplay: true,
				autoplaySpeed: 6000,
				arrows: false,
				dots: true,
				infinite: false,
				speed: 300,
				slidesToShow: 4,
				slidesToScroll: 4,
				rows: 2,
				prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"><i class="fas fa-angle-left"></i></button>',
				nextArrow: '<button type="button" class="slick-next" aria-label="Next"><i class="fas fa-angle-right"></i></button>',
				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							arrows:false,
							dots:true
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							arrows:false,
							dots:true
						}
					},
					{
						breakpoint: 575,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							arrows:false,
							dots:true
						}
					}
				]
			});
			$(element).on('afterChange', function(event, slick, currentSlide) {
				if((slick.$slides.length - slick.options.slidesToShow) <= currentSlide) {
					$(element).slick('slickGoTo', 0);
				}
			});
		},
		
		showcaseImageSlider: {
			init: function() {
				var self = this;
				self.slider('.prd-img-slider'); 
			},
			
			slider: function(element) {
				if(!$(element).hasClass('slick-initialized')) {
					$(element).slick({
						autoplay: false,
						autoplaySpeed: 2000,
						dots: true,
						arrows: false,
						infinite: false,
						speed: 300,
						swipe: false,
						prevArrow: '<button type="button" class="slick-prev" aria-label="Previous"><i class="fas fa-angle-left"></i></button>',
						nextArrow: '<button type="button" class="slick-next" aria-label="Next"><i class="fas fa-angle-right"></i></button>'
					});
				}
			}
		},
		
		headerFixed: function() {
			var headerHeight = $('#header').outerHeight();
			this.stickyOffset = headerHeight;
			if($(window).scrollTop() > this.stickyOffset) {
				$('body').addClass('sticked');
			} else {
				$('body').removeClass('sticked');
			}
		},

		navTarget: function(elm) {
			var id = elm.attr('data-id');
			var target = $(id);
			openbox.reset();
			
			this.navTargetStart(target)
		},

		navTargetStart: function(target) {
			$('html, body').animate({
				scrollTop: target.offset().top - $('#header').outerHeight() - 15
			}, 500);
		},

		scrollTop: function () {
			$("html, body").animate({
				scrollTop: 0
			}, 400);
		},

		scrollToggle: function (element) {
			if (element.scrollTop() > 200) {
				$("#scroll-top").stop().fadeIn();
			} else {
				$("#scroll-top").stop().fadeOut();
			}
        },
	},

	events: function () {
		var _t = this;
		$(document).on('click', '.main-navigation a[data-type="inline"]', function() {
			_t.methods.navTarget($(this));
		});

		$(window).on('resize', function() {
			_t.methods.randomBubble();
		});

		$(window).on('scroll', function() {
			_t.methods.headerFixed();
			_t.methods.scrollToggle($(this));
		});

		$(document).on('click', '#scroll-top', function () {
			_t.methods.scrollTop()
		});
	}
}

$(function () {
	theme.init();
	openbox.init();
});