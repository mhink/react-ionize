// @flow

import EventEmitter from 'events';

class ElectronApp extends EventEmitter {
  _isReady: boolean;

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

class _BrowserWindow {
  show() {}
  hide() {}
}

let i_win = 0;
export let windows = [
  new _BrowserWindow()
];

export const BrowserWindow = () => {
  const rval = windows[i_win];

  i_win += 1;
  if (!windows[i_win]) {
    windows.push(new _BrowserWindow())
  }

  return rval;
}

export const ElectronTestUtils = {
  getWindow(i: number) {
    if (!windows[i]) {
      windows[i] = new _BrowserWindow();
    }
    return windows[i];
  },

  reset: () => {
    i_win = 0;
    windows = [
      new _BrowserWindow()
    ];

    app = new ElectronApp();
  }
};
