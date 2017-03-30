// @flow

import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';
import type TextElement from './TextElement';

export default class BaseElement {
  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) { }

  appendChildBeforeMount(
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
  getPublicInstance(): mixed {
    return this;
  }

  prepareUpdate(
    oldProps              : Object,
    newProps              : Object,
    rootContainerInstance : IonizeContainer,
  ): null | Array<mixed> {
    return null;
  }

  commitUpdate(
    updatePayload : Array<mixed>,
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
