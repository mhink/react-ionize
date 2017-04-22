// @flow

import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';
import type TextElement from './TextElement';

const SUPPORTED_PROPS: { [string]: boolean } = {};

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

  getSupportedProps(
  ): { [string]: boolean } {
    return SUPPORTED_PROPS;
  }

  prepareUpdate(
    oldProps              : Object,
    newProps              : Object,
    rootContainerInstance : IonizeContainer,
  ): null | Array<mixed> {
    const updatePayload: Array<mixed> = [];

    const mergedProps = {};
    for (const propKey in oldProps) {
      mergedProps[propKey] = [oldProps[propKey], null];
    }
    for (const propKey in newProps) {
      if (mergedProps[propKey] !== undefined) {
        mergedProps[propKey][1] = newProps[propKey];
      } else {
        mergedProps[propKey] = [null, newProps[propKey]];
      }
    }

    const supportedProps = this.getSupportedProps();

    for (const propKey in mergedProps) {
      if (!supportedProps[propKey]) {
        continue;
      }
      const [oldVal, newVal] = mergedProps[propKey];
      if (oldVal !== newVal) {
        updatePayload.push(propKey, newVal);
      }
    }

    if (updatePayload.length === 0) {
      return null;
    } else {
      return updatePayload;
    }
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
    child         : (BaseElement | TextElement),
    beforeChild   : (BaseElement | TextElement)
  ): void { }

  removeChild(
    child         : (BaseElement | TextElement)
  ): void { }
}
