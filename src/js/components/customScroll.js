import 'perfect-scrollbar/dist/js/perfect-scrollbar.jquery.min';

export default function customScroll() {
  const $scrollContainer = $('.js-custom-scroll');

  $scrollContainer.perfectScrollbar();
}