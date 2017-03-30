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
  _id: number;
  _children: Array<_MenuItem>;

  static setApplicationMenu;
  constructor(i: number) {
    this._id = i;
    this._children = [];
  }

  append(menuItem: _MenuItem) {
    this._children.push(menuItem);
  }

  flush() {
    const obj = {
      items: []
    };

    for (const child of this._children) {
      obj.items.push(child.flush())
    }

    return obj;
  }
};

let i_menu = 0;
export let menus = [
  new _Menu(i_menu)
];

export const Menu = () => {
  const rval = menus[i_menu];

  i_menu += 1;
  if (!menus[i_menu]) {
    menus.push(new _Menu(i_menu))
  }

  return rval;
}

Menu.setApplicationMenu = () => {}


class _MenuItem {
  _id: number;
  opts: {
    submenu?: (_Menu)
  };
  constructor(i: number) {
    this._id = i;
  }

  _reconstruct(opts: Object) {
    this.opts = opts;
  }

  flush() {
    const obj = {}
    if (this.opts.role) {
      obj.role = this.opts.role;
    }
    if (this.opts.label) {
      obj.label = this.opts.label;
    }
    if(this.opts.submenu) {
      obj.submenu = this.opts.submenu.flush();
    }
    return obj;
  }
}

let i_menuItem = 0;
export let menuItems = [
  new _MenuItem(i_menuItem)
];

export const MenuItem = (opts: Object) => {
  const rval = menuItems[i_menuItem];
  rval._reconstruct(opts);

  i_menuItem += 1;
  if (!menuItems[i_menuItem]) {
    menuItems.push(new _MenuItem(i_menuItem))
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

  getMenu(i: number) {
    if (!menus[i]) {
      menus[i] = new _Menu(i);
    }
    return menus[i];
  },

  getMenuItem(i: number) {
    if (!menuItems[i]) {
      menuItems[i] = new _MenuItem(i);
    }
    return menuItems[i];
  },


  reset: () => {
    i_win = 0;
    i_menu = 0;
    i_menuItem = 0;
    windows = [
      new _BrowserWindow()
    ];
    menus = [
      new _Menu(0)
    ];
    menuItems = [
      new _MenuItem(0)
    ];

    app = new ElectronApp();
  }
};
