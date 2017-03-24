// @flow

import type {
  HostContext,
  Props,
  PropsDiff,
  Container,
  Instance,
  TextInstance
} from '../types.flow.js';

const DEFAULT_HOST_CONTEXT = (({} : any): HostContext);

export function getRootHostContext(
  rootContainerInstance: Container,
): HostContext {
  return DEFAULT_HOST_CONTEXT;
}

export function getChildHostContext(
  parentHostContext       : HostContext,
  type                    : string,
): HostContext {
  return parentHostContext;
}
