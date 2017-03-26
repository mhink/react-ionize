// @flow

import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';
import type TextElement from './TextElement';

export default class BaseElement {
  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
    hostContext   : HostContext
  ) { }

  appendInitialChild(
    child         : (BaseElement | TextElement)
  ): void { }

  finalizeBeforeMount(
    type                  : string,
    props                 : Object,
    rootContainerInstance : IonizeContainer
  ): boolean {
    return false;
  }

  finalizeBeforeRemoval(
  ): void { }

  commitMount(
    newProps      : Object,
  ): void { }

  // TODO: There's probably a better way 
  getPublicInstance(
  ): mixed {
    return this;
  }

  prepareUpdate(
    oldProps              : Object,
    newProps              : Object,
    rootContainerInstance : IonizeContainer,
    hostContext           : HostContext,
  ): ?Object {
  }

  commitUpdate(
    updatePayload : ?Object,
    oldProps      : Object,
    newProps      : Object,
  ): void {
  }

  appendChild(
    child         : (BaseElement | TextElement)
  ): void { }

  insertBefore(
    child         : (BaseElement | TextElement)      
  ): void { }

  removeChild(
    child         : (BaseElement | TextElement)
  ): void { }
}
