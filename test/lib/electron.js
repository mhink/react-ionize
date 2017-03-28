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

export class BrowserWindow extends EventEmitter {
  constructor({
    show
  } = {}) {
    super();
    this._visible = false;
  }

  close() {
    this.emit('close');
    this._closed = true;
    this.emit('closed');
  }

  show() {
    this._visible = true;
    this.emit('show');
  }

  hide() {
    this._visible = false;
  }
}

export const ElectronTestUtils = {
  reset: () => {
    app = new ElectronApp();
  }
};
