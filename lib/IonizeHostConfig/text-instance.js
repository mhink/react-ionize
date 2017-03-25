// @flow

import type {
  HostContext,
  Props,
  PropsDiff,
  Container,
  Instance,
  TextInstance
} from '../types.flow.js';

export function shouldSetTextContent(
  props                 : Props
): boolean {
  return false;
}

export function resetTextContent(
  testElement           : Instance
): void {
  // noop
}

export function createTextInstance(
  text                  : string,
  rootContainerInstance : Container,
  hostContext           : Object,
  internalInstanceHandle: Object
): TextInstance {
  return {
    text,
  };
}

export function commitTextUpdate(
  textInstance          : TextInstance,
  oldText               : string,
  newText               : string
): void {
  textInstance.text = newText;
}
