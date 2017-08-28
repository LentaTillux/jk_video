import fullpage from 'fullpage.js';

export default function InitFullpage () {
  const $fullpage = $('.js-fullpage');
  const $nextSectionBtn = $('.js-next-section');

  if ($fullpage.length) {
    $fullpage.fullpage({
      sectionSelector: 'fp-section',
      menu: '.js-fp-nav',
      // paddingTop: '125px',
      scrollOverflow: true,
      scrollingSpeed: 1000,
      verticalCentered: true
    });

    $nextSectionBtn.on('click', function () {
      $.fn.fullpage.moveSectionDown();
    });

    if ($(window).width() <= 767) {
      $.fn.fullpage.destroy('all');
    }
    if ($(window).height() <= 600) {
      $.fn.fullpage.setAutoScrolling(false);
    }
  }
}