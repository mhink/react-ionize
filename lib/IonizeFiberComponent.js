// @flow

import type {
  ElectronApp,
} from 'electron';

import type {
  Props,
  HostContext,
  Instance,
} from './types.flow.js';

const createGenericInstance = (
  type                  : string,
  props                 : Props,
) => ({
  tag: 'INSTANCE',
  type,
  props,
});

function createAppElementInstance(
  props                 : Props,
  electronApp           : ElectronApp,
): Instance {
  if (props.onReady) {
    electronApp.on('ready', props.onReady)
  }

  return {
    tag: 'INSTANCE',
    type: 'app',
    props,
  };
}

export function createIonizeInstance(
  type                  : string,
  props                 : Props,
  rootContainerInstance : ElectronApp,
  hostContext           : HostContext
): Instance {
  switch (type) {
    case 'listen': {
      return createAppElementInstance(props, rootContainerInstance);
    }
    default: {
      return createGenericInstance(type, props);
    }
  }
}
