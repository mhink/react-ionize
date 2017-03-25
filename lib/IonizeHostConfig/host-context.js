// @flow

import type {
  HostContext,
  InPortalContext,
  ElectronContext,
  Props,
  PropsDiff,
  Container,
  Instance,
  TextInstance
} from '../types.flow.js';

export function getRootHostContext(
  rootContainerInstance: Container,
): HostContext {
  return { context: 'ELECTRON' };
}

export function getChildHostContext(
  parentHostContext       : HostContext,
  type                    : string,
): HostContext {
  console.log('getChildHostContext', type, parentHostContext);
  if (type === 'portal') {
    return { context: 'PORTAL' };
  } else {
    return parentHostContext;
  }
}
