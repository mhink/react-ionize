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

class _Menu {
  static setApplicationMenu;
};

let i_menu = 0;
export let menus = [
  new _Menu()
];

export const Menu = () => {
  const rval = menus[i_menu];

  i_menu += 1;
  if (!menus[i_menu]) {
    menus.push(new _Menu())
  }

  return rval;
}

Menu.setApplicationMenu = () => {}

export const ElectronTestUtils = {
  getWindow(i: number) {
    if (!windows[i]) {
      windows[i] = new _BrowserWindow();
    }
    return windows[i];
  },

  getMenu(i: number) {
    if (!menus[i]) {
      menus[i] = new _Menu();
    }
    return menus[i];
  },

  reset: () => {
    i_win = 0;
    i_menu = 0;
    windows = [
      new _BrowserWindow()
    ];

    app = new ElectronApp();
  }
};
