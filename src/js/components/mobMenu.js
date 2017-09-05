import {css, $window, Resp, $header, $scrolledElements} from '../modules/dev/helpers';

export default function initMobMenu() {
  const $logo = $('.header__logo');
  const $menuBtn = $('.js-hamburger');
  const $menu = $('.nav');
  const $menuItem  = $menu.find('.nav__list-item');
  const $menuLink = $menu.find('.nav__list-link');

  if (Resp.isMobileToTablet) initMobMenu();

  function initMobMenu() {

    $menuBtn.on('click', function (ev) {
      ev.preventDefault();
      $(this).toggleClass(css.active);
      $menu.toggleClass(css.active);
    });

    $menuLink.on('click', function (ev) {
      $menu.removeClass(css.active);
      $menuBtn.removeClass(css.active);
    });

    $logo.on('click', function (ev) {
      $menu.removeClass(css.active);
      $menuBtn.removeClass(css.active);
    });
  }
}
