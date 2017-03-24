// @flow

import type { ElectronApp } from 'electron';
export type Props = Object;
export type HostContext = {||};
export type PropsDiff = Object;

export type Container = ElectronApp;
export type Instance = {|
  tag                   : 'INSTANCE',
  type                  : string,
  props                 : Object,
|};

export type TextInstance = {|
  tag                   : 'TEXT',
  text                  : string,
|};
