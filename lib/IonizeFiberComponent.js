// @flow

import type {
  ElectronApp,
} from 'electron';

import type {
  Props,
  HostContext,
} from './types.flow.js';

export function createIonizeInstance(
  type:                   string,
  props:                  Props,
  rootContainerInstance:  ElectronApp,
  hostContext:            HostContext
) {
  return {
    tag: 'INSTANCE',
    type,
    props,
    children: [],
    rootContainerInstance
  };
}
