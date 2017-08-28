export class circleSvg {
  constructor() {
    this.init();
  }

  init() {
    createCircleSvg();
    function createCircleSvg() {

      const circle = document.querySelector('.js-circle');

      const radius = circle.getAttribute('r');
      const diameter = Math.round(Math.PI * radius * 2);
      const getOffset = (val = 0) => Math.round((100 - val) / 100 * diameter);

      const run = () => {
        const val = 22;
        circle.style.strokeDashoffset = getOffset(val)
      };

      // button.addEventListener('click', run);
      // document.addEventListener('DOMContentLoaded', () => setTimeout(run, 10));
    }
  }
}