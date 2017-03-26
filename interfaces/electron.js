declare module 'electron' {
  declare type $SupportedAppEvent = (
    'ready'
  );
  declare type ElectronApp = {|
    on: ($SupportedAppEvent, Function) => ElectronApp,
    removeListener: (string, Function) => ElectronApp,
  |};

  declare var exports: {
    app: ElectronApp
  };
};
