import {css, $window, Resp, $header, $scrolledElements} from '../modules/dev/helpers';

export default function initMobMenu() {
  const $menuBtn = $('.js-hamburger');
  const $menu = $('.nav');
  const $menuLink = $menu.find('.nav__list-link');

  if (Resp.isMobileTablet) initMobMenu();

  function initMobMenu() {

    $menuBtn.on('click', function (ev) {
      ev.preventDefault();
      $(this).toggleClass(css.active);
      $menu.toggleClass(css.active);
    });

    $menuLink.on('click', function (ev) {
      $menu.removeClass(css.active);
      $menuBtn.removeClass(css.active);

      // const el = $(this).attr('href');
      // console.log(el);
      // $scrolledElements.animate({ scrollTop: $(el).offset().top }, 2000);
      // return false;
    });
  }
}