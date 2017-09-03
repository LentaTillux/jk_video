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
import {$window} from "../modules/dev/helpers";

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

/** preloader */
const $preloader = $('.preloader');
setTimeout(function() {
  $preloader.fadeOut('slow', function() {
    $(this).remove();
  });
}, 1500);