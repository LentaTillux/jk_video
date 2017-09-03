import fullpage from 'fullpage.js';
import slick from 'slick-carousel';
import initScreenVideo from './screenVIdeo';
import { $window, $body, $header, css, Resp } from '../modules/dev/helpers';

export default function InitFullpage() {
  const $fullpage = $('.js-fullpage');
  const $nextSectionBtn = $('.js-next-section');
  const $animSVG = $('.js-anim-svg');
  const $animSVGSecond = $('.js-anim-svg-2');

  // fullpage settings
  if ($fullpage.length) {
    $fullpage.fullpage({
      sectionSelector: 'fp-section',
      slideSelector: 'fp-slide',
      menu: '.js-fp-nav',
      // fixedElements: '.header',
      // slidesNavigation: true,
      // paddingTop: '125px',
      // scrollOverflow: true,
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

    const $playerInitBtn = $('.js-init-player');
    const $playerExitBtn = $('.js-exit-player');

    // init player
    $playerInitBtn.on('click', function () {
      const $slideAnchor = $(this).data('slide-anchor') - 1;
      $.fn.fullpage.moveTo('portfolio', 1);
      $header.addClass('in-video');
      $playerControls.addClass(css.enabled, setTimeout(() => {
        $('.slick-dots').addClass('is-transition');
      }, 900));

      $videoSlider.slick('slickGoTo', $slideAnchor);
    });

    // exit player
    $playerExitBtn.on('click', function () {
      const $video = $videoSlider.find('video')[0];
      const $textBlock = $videoSlider.find('.slick-current .fullscreen__text');
      $.fn.fullpage.moveTo('portfolio', 0);
      $header.removeClass('in-video');
      $playerControls.removeClass(css.enabled);
      $('.slick-dots').removeClass('is-transition');
      $video.currentTime = 0;
      disableHideControls();
      $textBlock.mCustomScrollbar('scrollTo', 'top');
    });

    // scroll next sect
    $nextSectionBtn.on('click', function () {
      $.fn.fullpage.moveSectionDown();
    });

    // if ($(window).width() <= 767) {
    //   $.fn.fullpage.destroy('all');
    // }
    // if ($(window).height() <= 600) {
    //   $.fn.fullpage.setAutoScrolling(false);
    // }
  }

  // video slider
  const $videoSlider = $('.js-fullscreen-slider');
  const $playerControls = $('.fullscreen-controls');
  const $playBtn = $('.js-play');
  const $pauseBtn = $('.js-pause');

  $videoSlider.slick({
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
    appendArrows: '.fullscreen-controls__buttons',
    appendDots: '.fullscreen-controls__inner',
    prevArrow: '<button type="button" class="fullscreen-controls__btn fullscreen-controls__btn_prev"><svg class="icon icon-play-pause"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play-pause"></use></svg><svg class="round-svg" viewBox="0 0 88 88" data-circle="75"><circle r="42" cx="50%" cy="50%"></circle></svg></button>',
    nextArrow: '<button type="button" class="fullscreen-controls__btn fullscreen-controls__btn_next"><svg class="icon icon-play-pause"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play-pause"></use></svg><svg class="round-svg" viewBox="0 0 88 88" data-circle="25"><circle r="42" cx="50%" cy="50%"></circle></svg></button>'
  });

  $videoSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    const $currentVideo = $videoSlider.find('.slick-current video')[0];
    const $video = $videoSlider.find('video')[0];
    const $textBlock = $videoSlider.find('.slick-current .fullscreen__text');
    $currentVideo.pause();
    disableHideControls();
    $videoSlider.find('.fullscreen__text').removeClass(css.disabled);
    $header.removeClass(css.disabled);
    $video.currentTime = 0;
    $textBlock.mCustomScrollbar('scrollTo', 'top');
  });

  $playBtn.on('click', function () {
    const $currentVideo = $videoSlider.find('.slick-current video')[0];
    const $textBlock = $videoSlider.find('.slick-current .fullscreen__text');

    $currentVideo.play();
    $textBlock.addClass(css.disabled);
    $header.addClass(css.disabled);
    $textBlock.mCustomScrollbar('scrollTo', 'top');

    if (!$currentVideo.paused) {
      $playerControls.addClass(css.transparent);
      hideControls();
    }
  });

  $pauseBtn.on('click', function () {
    const $currentVideo = $videoSlider.find('.slick-current video')[0];
    const $textBlock = $videoSlider.find('.slick-current .fullscreen__text');

    $currentVideo.pause();
    $textBlock.removeClass(css.disabled);
    $header.removeClass(css.disabled);
    $textBlock.mCustomScrollbar('scrollTo', 'top');

    if ($currentVideo.paused) {
      $playerControls.removeClass(css.transparent);
      disableHideControls();
    }
  });

  // $videoSlider.on('click', function () {
  //   disableHideControls();
  //   $playerControls.removeClass(css.transparent, setTimeout(() => {
  //     $playerControls.addClass(css.transparent);
  //   }, 1000));
  // });

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
  }

}