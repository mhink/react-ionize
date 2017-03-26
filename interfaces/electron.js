declare module 'electron' {
  declare type ElectronApp = {|
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
    loadUrl: (string, ?Object) => void;
  }
};
