// @flow

import type { ElectronApp, $SupportedAppEvent } from 'electron';
export type Props = Object;
export type PropsDiff = Object;

export type HostContext = (
  InPortalContext
| ElectronContext
);

export type InPortalContext = {|
  context: 'PORTAL'
|};

export type ElectronContext = {|
  context: 'ELECTRON'
|};

export type Container = ElectronApp;

// <app onReady={...} />
export type AppInstance = {|
  onReadyCallback       : Function,
|};

export type GenericInstance = {|
  type                  : string,
|};

export type ReactElementInstance = React$Element<any>;

export type PortalInstance = {|
  tag: 'PORTAL',
|};

export type Instance = mixed;

export type TextInstance = {|
  text: string
|};
