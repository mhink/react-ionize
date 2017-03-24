// @flow
import type {
  ElectronApp,
} from 'electron';

import type {
  HostContext,
  Props,
  PropsDiff,
  Instance,
  TextInstance
} from '../types.flow.js';

import {
  createIonizeInstance,
} from '../IonizeFiberComponent';

import describe from '../util/describeInstance';

// Create the actual "thing" described by the type and props of the element
// we're looking at. (It will be 'attached' to the thing represented by its
// parent element later on, in appendInitialChild/appendChild/insertBefore.)
export function createInstance(
  type                    : string,
  props                   : Props,
  rootContainerInstance   : ElectronApp,
  hostContext             : HostContext,
  internalInstanceHandle  : Object
): Instance {
  return createIonizeInstance(
    type,
    props,
    rootContainerInstance,
    hostContext
  );
}

export function appendInitialChild(
  parentInstance  : Instance,
  child           : Instance | TextInstance
): void {
}

export function finalizeInitialChildren(
  testElement           : Instance,
  type                  : string,
  props                 : Props,
  rootContainerInstance : ElectronApp,
): boolean {
  // The return value of this function appears to indicate whether we should
  // run commitMount or not, although I'm not completely sure what that means.
  //
  // (ReactDOM uses this behavior to decide whether or not to auto-focus a
  // component, presumably after it's been mounted?)
  return false;
}

export function appendChild(
  parentInstance        : Instance | ElectronApp,
  child                 : Instance | TextInstance
): void {
}

export function insertBefore(
  parentInstance        : Instance | ElectronApp,
  child                 : Instance | TextInstance,
  beforeChild           : Instance | TextInstance
): void {
}

export function removeChild(
  parentInstance        : Instance | ElectronApp,
  child                 : Instance | TextInstance
): void {
}

export {
  shouldSetTextContent,
  resetTextContent,
  createTextInstance,
  commitTextUpdate,
} from './text-instance';

export {
  getRootHostContext,
  getChildHostContext,
} from './host-context';

export {
  prepareForCommit,
  commitMount,
  prepareUpdate,
  commitUpdate,
  resetAfterCommit,
} from './commit';

export {
  scheduleAnimationCallback,
  scheduleDeferredCallback,
  getPublicInstance,
  useSyncScheduling,
  shouldDeprioritizeSubtree,
} from './misc';
