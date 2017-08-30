export default function initScreenVideo() {
  const $videoBlock = $('.screen-video');

  $videoBlock.each(function () {
    const $this = $(this);
    const $playBtn = $this.find('.js-play-video');
    const $pauseBtn = $this.find('.js-pause-video');
    const $video = $this.find('video')[0];

    $video.play();

    $playBtn.on('click', function (ev) {
      ev.preventDefault();
      $video.play();
    });
    $pauseBtn.on('click', function (ev) {
      ev.preventDefault();
      $video.pause();
    });
  });
}