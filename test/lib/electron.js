// @flow

import EventEmitter from 'events';

class ElectronApp extends EventEmitter {
  constructor() {
    super();
    this._isReady = false;
  }

  isReady(): boolean {
    return this._isReady;
  }

  test_makeReady() {
    this._isReady = true;
    this.emit('ready');
  }
}

export let app = new ElectronApp();

export const ElectronTestUtils = {
  reset: () => {
    app = new ElectronApp();
  }
};
