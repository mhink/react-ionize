declare module 'electron' {
  declare type MessageBoxOptions = {|
    title?    : string,
    message?  : string,
    detail?   : string,
  |};

  declare type ElectronDialog = {|
    // showOpenDialog: () => void,
    // showSaveDialog: () => void,
    // showErrorBox:   () => void,

    showMessageBox: (
      ?BrowserWindow,
      ?MessageBoxOptions,
    ) => void
  |};

  declare var dialog: ElectronDialog;

  declare type ElectronApp = {|
    isReady: () => boolean,
    on: (string, Function) => ElectronApp,
    once: (string, Function) => ElectronApp,
    removeListener: (string, Function) => ElectronApp,
  |};

  declare var app: ElectronApp;

  declare class BrowserWindow {
    on: (string, Function) => BrowserWindow;
    once: (string, Function) => BrowserWindow;
    removeListener: (string, Function) => BrowserWindow;
    setParentWindow: (?BrowserWindow) => void;
    getParentWindow: () => BrowserWindow;
    show: () => void;
    hide: () => void;
    close: () => void;
    loadURL: (string, ?Object) => void;
    id: number;

    webContents: any; // TODO
  }
};
