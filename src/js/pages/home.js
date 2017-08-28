/**
 * Home page scripts.
 *
 * @module Home
 */

export default class Home {
  /**
   * Cache data, make preparations and initialize page scripts.
   */
  constructor() {
    this.pageName = 'Home';

    // Initialize page scripts
    this.init();
  }

  /**
   * Load chunkExample module.
   *
   * @return {Promise}
   */
  loadChunk() {
    return new Promise(resolve => {
      require.ensure([], require => {
        const loadedChunk = require('../components/chunkExample').default;

        resolve(loadedChunk);
      }, 'homePageChunk');
    });
  }

  /**
   * Do something with loaded chunk.
   *
   * @param {Function} Chunk - loaded chunk
   */
  processChunk(Chunk) {
    new Chunk(this.pageName).consoleLogPageName();
  }

  /**
   * Initialize Home page scripts.
   */
  init() {
    const _this = this;

    _this
      .loadChunk()
      .then(chunk => _this.processChunk(chunk));
  }
}
