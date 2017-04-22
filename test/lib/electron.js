// @flow

console.log("Loading dummy electron.js");
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
  options: any;

  constructor(options: any) {
    this.options = options;
  }

  show() {}
  hide() {}
  on() {}
  setParentWindow(parentWindow: _BrowserWindow) {}
  removeAllListeners(eventType: string) {}
  setPosition(x: number, y: number) {}
  setMovable(isMovable: boolean) {}
  setSize(width: number, height: number) {}
  setResizable(isResizable: boolean) {}
}

let i_win = 0;
export let windows = [];
let onNewWindowHandler: (window: _BrowserWindow) => mixed;

export const BrowserWindow = (options: any) => {
  const newWindow = new _BrowserWindow(options);

  windows.push(newWindow);

  if (onNewWindowHandler) {
    onNewWindowHandler(newWindow);
  }

  return newWindow;
};

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
    return windows[i];
  },

  onNewWindow(handler: (window: _BrowserWindow) => mixed) {
    onNewWindowHandler = handler;
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
    windows = [];
    menus = [
      new _Menu(0)
    ];
    menuItems = [
      new _MenuItem(0)
    ];

    app = new ElectronApp();
  }
};
