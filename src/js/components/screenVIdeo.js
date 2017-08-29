export default function initScreenVideo() {
  const $videoBlock = $('.screen-video');

  $videoBlock.each(function () {
    const $this = $(this);
    const $playBtn = $this.find('.js-play-video');
    const $pauseBtn = $this.find('.js-pause-video');
    const $video = $this.find('video');

    // if ($video.length) $video[0].play();

    $playBtn.on('click', function (ev) {
      ev.preventDefault();
      $video[0].play();
    });
    $pauseBtn.on('click', function (ev) {
      ev.preventDefault();
      $video[0].pause();
    });
  });
}