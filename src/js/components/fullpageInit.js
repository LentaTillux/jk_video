import fullpage from 'fullpage.js';
import slick from 'slick-carousel';
import initScreenVideo from './screenVIdeo';
import { $window, $body, $header, css, Resp } from '../modules/dev/helpers';

export default function InitFullpage () {
  const $fullpage = $('.js-fullpage');
  const $videoSlider = $('.js-fullscreen-slider');
  const $nextSectionBtn = $('.js-next-section');
  // const $animSVG = $('.js-anim-svg');
  const $playerInitBtn = $('.js-init-player');
  const $playerExitBtn = $('.js-exit-player');
  const $playerControls = $('.fullscreen-controls');
  const $playBtn = $('.js-play');
  const $pauseBtn = $('.js-pause');

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
      onLeave: function (index, nextIndex, direction) {
        if (nextIndex === 1) {
          initScreenVideo();
        }
        // $animSVG.toggleClass('animated');
      }
    });

    // buttons
    $playerInitBtn.on('click', function (ev) {
      ev.preventDefault();
      const $slideAnchor = $(this).data('slide-anchor') - 1;
      $.fn.fullpage.moveTo('portfolio', 1);
      $header.addClass('in-video');
      $playerControls.addClass(css.enabled);

      $videoSlider.slick('slickGoTo',$slideAnchor);
    });

    $playerExitBtn.on('click', function (ev) {
      ev.preventDefault();
      $.fn.fullpage.moveTo('portfolio', 0);
      $header.removeClass('in-video');
      $playerControls.removeClass(css.enabled);
    });

    $playBtn.on('click', function (ev) {
      ev.preventDefault();
      $videoSlider.find('.slick-current video')[0].play();
      $videoSlider.find('.fullscreen__text').addClass(css.disabled);
      $header.find('.header__contacts').addClass(css.disabled);
    });

    $pauseBtn.on('click', function (ev) {
      ev.preventDefault();
      $videoSlider.find('.slick-current video')[0].pause();
      $videoSlider.find('.fullscreen__text').removeClass(css.disabled);
      $header.find('.header__contacts').removeClass(css.disabled);
    });

    $nextSectionBtn.on('click', function (ev) {
      ev.preventDefault();
      $.fn.fullpage.moveSectionDown();
    });

    // if ($(window).width() <= 767) {
    //   $.fn.fullpage.destroy('all');
    // }
    // if ($(window).height() <= 600) {
    //   $.fn.fullpage.setAutoScrolling(false);
    // }
  }

  $videoSlider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    accessibility: false,
    dots: true,
    infinite: true,
    arrows: true,
    speed: 600,
    cssEase: 'ease',
    useTransform: true,
    adaptiveHeight: true,
    appendArrows: '.fullscreen-controls__buttons',
    prevArrow: '<button type="button" class="fullscreen-controls__btn fullscreen-controls__btn_prev"><svg class="icon icon-play-pause"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play-pause"></use></svg></button>',
    nextArrow: '<button type="button" class="fullscreen-controls__btn fullscreen-controls__btn_next"><svg class="icon icon-play-pause"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play-pause"></use></svg></button>'
  });
  $videoSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
    $videoSlider.find('.slick-current video')[0].pause();
    $videoSlider.find('.fullscreen__text').removeClass(css.disabled);
    $header.find('.header__contacts').removeClass(css.disabled);
  });
}