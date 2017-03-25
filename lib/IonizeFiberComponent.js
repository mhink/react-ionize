// @flow

import React from 'react';
import type {
  ElectronApp,
} from 'electron';

import type {
  Props,
  HostContext,
  Instance,
  AppInstance,
  PortalInstance,
  GenericInstance,
} from './types.flow.js';

function createAppElementInstance(
  props                 : Props,
  electronApp           : ElectronApp,
): AppInstance {
  if (props.onReady) {
    electronApp.on('ready', props.onReady)
  }

  return {
    onReadyCallback: props.onReady
  };
}

function createPortalInstance(
  props                 : Props,
  electronApp           : ElectronApp,
  hostContext           : HostContext
): PortalInstance {
  return {
    tag: 'PORTAL'
  };
};

function createGenericInstance(
  type                  : string,
  props                 : Props,
  electronApp           : ElectronApp,
  hostContext           : HostContext
): GenericInstance {
  return {
    type
  };
}

export function createIonizeInstance(
  type                  : string,
  props                 : Props,
  rootContainerInstance : ElectronApp,
  hostContext           : HostContext
): Instance {
  if (hostContext.context === 'PORTAL') {
    return React.createElement(type, props);
  }

  switch (type) {
    case 'app': {
      return createAppElementInstance(props, rootContainerInstance, hostContext);
    }
    case 'portal': {
      return createPortalInstance(props, rootContainerInstance, hostContext);
    }
    default: {
      return createGenericInstance(type, props, rootContainerInstance, hostContext);
    }
  }
}
