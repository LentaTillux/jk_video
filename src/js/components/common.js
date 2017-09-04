/**
 * Website's common scripts.
 *
 * @module Common
 */

import './noTouch';
import objectFitVideos from 'object-fit-videos';
import objectFitImages from 'object-fit-images';
import Popup from 'vintage-popup';
import CTabs from './c-tabs';
import Dot from './dot';
import InitFullpage from './fullpageInit';
import initScreenVideo from './screenVIdeo';
import customScroll from './customScroll';
import initMobMenu from './mobMenu';
import { changeText } from '../modules/dev/helpers';

export class Common {
  /**
   * Initialize Main page scripts.
   */
  static init() {
    objectFitVideos();
    objectFitImages();
    new Dot;
    InitFullpage();
    initScreenVideo();
    customScroll();
    initMobMenu();
  }
}

/** Export initialized common scripts by default */
export default Common.init();

/** tabs init */
const $tabs = $('.c-tabs');
$tabs.each((index, el) => {
  const tab = new CTabs($(el));
  tab.init();
});

/** pop-ups */
const $popup = $('[data-popup-target]');
Popup.expose($);
$popup.popup();

/** btn with toggling text */
const $togglingBtn = $('.js-toggling-btn');
$togglingBtn.on('click', function () {
  const $this = $(this);
  $this.prev('.section__list-wrap').slideToggle();
  changeText($togglingBtn);
});