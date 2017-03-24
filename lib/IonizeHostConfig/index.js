// @flow

import type {
  HostContext,
  Props,
  PropsDiff,
  Container,
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
  rootContainerInstance   : Container,
  hostContext             : HostContext,
  internalInstanceHandle  : Object
): Instance {

  console.log(`Creating instance: ${type}`);
  return {
    tag: 'INSTANCE',
    type,
    props,
    children: [],
    rootContainerInstance,
  };
}

export function appendInitialChild(
  parentInstance  : Instance,
  child           : Instance | TextInstance
): void {
  let msg = `Appending initial ${child.tag} `;
  switch (child.tag) {
    case 'CONTAINER':
      msg += '(C)'
      break;
    case 'INSTANCE':
      msg += `(${child.type})`;
      break;
    case 'TEXT':
      msg += `("${child.text}")`;
      break;
  }
  msg += ` to ${parentInstance.tag} `;
  switch (parentInstance.tag) {
    case 'INSTANCE':
      msg += `(${parentInstance.type})`;
      break;
  }

  console.log(msg);
  const index = parentInstance.children.indexOf(child);
  if (index !== -1) {
    parentInstance.children.splice(index, 1);
  }
  parentInstance.children.push(child);
}

export function finalizeInitialChildren(
  testElement           : Instance,
  type                  : string,
  props                 : Props,
  rootContainerInstance : Container,
): boolean {
  // The return value of this function appears to indicate whether we should
  // run commitMount or not, although I'm not completely sure what that means.
  //
  // (ReactDOM uses this behavior to decide whether or not to auto-focus a
  // component, presumably after it's been mounted?)
  return false;
}

export function appendChild(
  parentInstance        : Instance | Container,
  child                 : Instance | TextInstance
): void {
  console.log(`Appending ${describe(child)} to ${describe(parentInstance)}`);

  const index = parentInstance.children.indexOf(child);
  if (index !== -1) {
    parentInstance.children.splice(index, 1);
  }
  parentInstance.children.push(child);
}

export function insertBefore(
  parentInstance        : Instance | Container,
  child                 : Instance | TextInstance,
  beforeChild           : Instance | TextInstance
): void {
  console.log(`Inserting ${describe(child)} before 
              ${describe(beforeChild)} within ${describe(parentInstance)}`);

  const index = parentInstance.children.indexOf(child);
  if (index !== -1) {
    parentInstance.children.splice(index, 1);
  }
  const beforeIndex = parentInstance.children.indexOf(beforeChild);
  parentInstance.children.splice(beforeIndex, 0, child);
}

export function removeChild(
  parentInstance        : Instance | Container,
  child                 : Instance | TextInstance
): void {
  console.log(`Removing ${describe(child)} from ${describe(parentInstance)}`);

  const index = parentInstance.children.indexOf(child);
  parentInstance.children.splice(index, 1);
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
