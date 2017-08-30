import jqueryMousewheel from 'jquery-mousewheel';
import mCustomScrollbar from 'malihu-custom-scrollbar-plugin';

export default function customScroll() {
  const $scrollContainer = $('.js-custom-scroll');

  $scrollContainer.mCustomScrollbar({
    mouseWheel: true,
    scrollEasing: 'linear',
    scrollInertia: 600
  });
}