import fullpage from 'fullpage.js';
import initScreenVideo from './screenVIdeo';
import { $window, $body, $header, css, Resp } from '../modules/dev/helpers';

export default function InitFullpage () {
  const $fullpage = $('.js-fullpage');
  const $nextSectionBtn = $('.js-next-section');
  const $animSVG = $('.js-anim-svg');
  const $playerInitBtn = $('.js-init-player');
  const $playerExitBtn = $('.js-exit-player');
  const $playerControls = $('.fullscreen-controls');
  // fp-slides
  if ($fullpage.length) {
    $fullpage.fullpage({
      sectionSelector: 'fp-section',
      slideSelector: 'fp-slide',
      menu: '.js-fp-nav',
      // fixedElements: '.header',
      slidesNavigation: true,
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
      const $slideAnchor = $(this).data('slide-anchor');
      $.fn.fullpage.moveTo('portfolio', $slideAnchor);
      $header.addClass('in-video');
      $playerControls.addClass(css.enabled);
    });

    $playerExitBtn.on('click', function (ev) {
      ev.preventDefault();
      $.fn.fullpage.moveTo('portfolio', 0);
      $header.removeClass('in-video');
      $playerControls.removeClass(css.enabled);
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
}