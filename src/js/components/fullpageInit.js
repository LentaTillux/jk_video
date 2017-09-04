import fullpage from 'fullpage.js';
import slick from 'slick-carousel';
import initScreenVideo from './screenVIdeo';
import { $window, $body, $header, css, Resp } from '../modules/dev/helpers';

export default function InitFullpage() {
  const $fullpage = $('.js-fullpage');
  const $nextSectionBtn = $('.js-next-section');
  const $animSVG = $('.js-anim-svg');
  const $animSVGSecond = $('.js-anim-svg-2');

  $window.on('resize load', function () {
    if (Resp.isMobile) {
      $.fn.fullpage.setAutoScrolling(false);
      $.fn.fullpage.setFitToSection(false);
    }
  });

  // fullpage settings
  if ($fullpage.length) {
    $fullpage.fullpage({
      sectionSelector: 'fp-section',
      slideSelector: 'fp-slide',
      menu: '.js-fp-nav',
      scrollingSpeed: 1000,
      verticalCentered: true,
      keyboardScrolling: false,
      loopHorizontal: false,
      controlArrows: false,
      afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
        if (slideIndex === 1) {
          $.fn.fullpage.setMouseWheelScrolling(false);
          $.fn.fullpage.setAllowScrolling(false);
        } else {
          $.fn.fullpage.setMouseWheelScrolling(true);
          $.fn.fullpage.setAllowScrolling(true);
        }
      },
      onLeave: function (index, nextIndex, direction) {
        if (nextIndex === 1) {
          $header.removeClass('is-inside');
        } else {
          $header.addClass('is-inside');
        }

        if (nextIndex === 4) {
          $animSVGSecond.addClass(css.visible);
        }
        if (nextIndex !== 4) {
          $animSVGSecond.removeClass(css.visible);
        }

        if (nextIndex === 5) {
          $animSVG.addClass(css.visible);
        }
        if (nextIndex !== 5) {
          $animSVG.removeClass(css.visible);
        }
        if (nextIndex === 6) {
          $nextSectionBtn.addClass(css.transparent);
        } else {
          $nextSectionBtn.removeClass(css.transparent);
        }
      }
    });

    // scroll next sect
    $nextSectionBtn.on('click', function () {
      $.fn.fullpage.moveSectionDown();
    });
  }

  // video slider
  const $videoSlider = $('.js-fullscreen-slider');
  const $playerControls = $('.fullscreen-controls');
  const $playBtn = $('.js-play');
  const $pauseBtn = $('.js-pause');
  const $playerInitBtn = $('.js-init-player');
  const $playerExitBtn = $('.js-exit-player');
  const $tabsBtn = $('.c-tabs__tabs-el');
  const $fullscreenInner = $('[data-fullscreen-inner]');
  const $orientationOverlay = $('.orient-overlay');
  const $orientationOverlayExit = $orientationOverlay.find('.orient-overlay__btn');

  // bind tabs buttons with hidden sliders
  bindTabsAndSliders();

  function bindTabsAndSliders() {
    $fullscreenInner.not(':first').hide();
    $fullscreenInner.first().addClass(css.active);
    $fullscreenInner.first().find($videoSlider).addClass(css.active);
    $tabsBtn.on('click', function () {
      const $thisIndex = $(this).index();
      const $currentVideoSlider = $fullscreenInner.eq($thisIndex).find($videoSlider);
      $fullscreenInner.removeClass(css.active);
      $fullscreenInner.hide().eq($thisIndex).show().addClass(css.active);
      $currentVideoSlider.parent('.fullscreen__inner').siblings().find($videoSlider).removeClass(css.active);
      $currentVideoSlider.slick('setPosition').addClass(css.active);
    });
  }

  // // init player
  $playerInitBtn.on('click', function () {
    const $slideAnchor = $(this).data('slide-anchor') - 1;
    $.fn.fullpage.moveTo('portfolio', 1);
    $header.addClass('in-video');

    if (Resp.isMobileTablet) {
      if (window.matchMedia('(orientation: portrait)').matches) {
        $orientationOverlay.show();
      }
    }

    $fullscreenInner.each(function () {
      const $this = $(this);
      if ($this.hasClass(css.active)) {
        let $thisSlider = $this.find($videoSlider);
        $this.find($playerControls).addClass(css.enabled);
        $thisSlider.slick('slickGoTo', $slideAnchor);
        setTimeout(function () {
          $thisSlider.find('.slick-dots').addClass('is-transition');
        }, 900);
      }
    });
  });

  // exit player
  $playerExitBtn.each(function () {
    $(this).on('click', function () {
      const $thisSlider = $(this).closest('.fullscreen-controls').next($videoSlider);
      const $thisControls = $(this).closest('.fullscreen-controls');
      const $video = $thisSlider.find('video')[0];
      const $textBlock = $thisSlider.find('.slick-current .fullscreen__text');

      disableHideControls();
      $.fn.fullpage.moveTo('portfolio', 0);
      $header.removeClass('in-video is-disabled');
      $thisSlider.find('.slick-dots').removeClass('is-transition');
      $video.currentTime = 0;
      $thisControls.removeClass('is-enabled is-transparent');
      $textBlock.mCustomScrollbar('scrollTo', 'top');
    });
  });

  $videoSlider.each(function (index, item) {
    const sliderId = `fullscreen-slider-${index + 1}`;
    const $dots = $(this).prev('.fullscreen-controls').find('.fullscreen-controls__inner');
    const $arrows = $(this).prev('.fullscreen-controls').find('.fullscreen-controls__buttons');
    this.id = sliderId;
    $(this).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      accessibility: false,
      dots: true,
      infinite: true,
      arrows: true,
      fade: true,
      speed: 600,
      cssEase: 'ease',
      useTransform: true,
      adaptiveHeight: true,
      slide: `#${sliderId} .fullscreen__item`,
      appendDots: $dots,
      appendArrows: $arrows,
      prevArrow: '<button type="button" class="fullscreen-controls__btn fullscreen-controls__btn_prev"><svg class="icon icon-play-pause"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play-pause"></use></svg><svg class="round-svg" viewBox="0 0 88 88" data-circle="75"><circle r="42" cx="50%" cy="50%"></circle></svg></button>',
      nextArrow: '<button type="button" class="fullscreen-controls__btn fullscreen-controls__btn_next"><svg class="icon icon-play-pause"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play-pause"></use></svg><svg class="round-svg" viewBox="0 0 88 88" data-circle="25"><circle r="42" cx="50%" cy="50%"></circle></svg></button>'
    });
  });

  $videoSlider.each(function () {
    const $this = $(this);
    if ($this.hasClass(css.active)) {
      $this.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        const $currentVideo = $this.find('.slick-current video')[0];
        const $video = $this.find('video')[0];
        const $textBlock = $this.find('.slick-current .fullscreen__text');
        $currentVideo.pause();
        disableHideControls();
        $this.find('.fullscreen__text').removeClass(css.disabled);
        $header.removeClass(css.disabled);
        $video.currentTime = 0;
        $textBlock.mCustomScrollbar('scrollTo', 'top');
      });
    }
  });

  $playBtn.each(function () {
    $(this).on('click', function () {
      const $currentVideo = $(this).closest('.fullscreen-controls').next().find('.slick-current video')[0];
      const $textBlock = $(this).closest('.fullscreen-controls').next().find('.slick-current .fullscreen__text');

      $currentVideo.play();
      $textBlock.addClass(css.disabled);
      $header.addClass(css.disabled);
      $textBlock.mCustomScrollbar('scrollTo', 'top');

      if (!$currentVideo.paused) {
        $playerControls.addClass(css.transparent);
        hideControls();
      }
    });
  });

  $pauseBtn.each(function () {
    $(this).on('click', function () {
      const $currentVideo = $(this).closest('.fullscreen-controls').next().find('.slick-current video')[0];
      const $textBlock = $(this).closest('.fullscreen-controls').next().find('.slick-current .fullscreen__text');

      $currentVideo.pause();
      $textBlock.removeClass(css.disabled);
      $header.removeClass(css.disabled);
      $textBlock.mCustomScrollbar('scrollTo', 'top');

      if ($currentVideo.paused) {
        $playerControls.removeClass(css.transparent);
        disableHideControls();
      }
    });
  });

  function hideControls() {
    $playerControls.on('mouseenter', function () {
      const $this = $(this);
      $this.removeClass(css.transparent);
    });

    $playerControls.on('mouseleave', function () {
      const $this = $(this);
      $this.addClass(css.transparent);
    });
  }

  function disableHideControls() {
    $playerControls.off('mouseenter mouseleave');
    $playerControls.removeClass(css.transparent);
  }

  $orientationOverlayExit.on('click', function () {
    $.fn.fullpage.moveTo('portfolio', 0);
    $(this).closest($orientationOverlay).fadeOut();
    $header.removeClass('in-video is-disabled');
  });

  window.addEventListener('orientationchange', function () {

    if (window.matchMedia('(orientation: landscape)').matches) {
      $orientationOverlay.hide();
    }
    if (window.matchMedia('(orientation: portrait)').matches) {
      $orientationOverlay.show();
    }
  });

}
