// @flow

import type {
  ElectronApp,
} from 'electron';

import type IonizeContainer from '../IonizeContainer';

import type {
  Props,
  PropsDiff,
  HostContext,
  TextInstance,
} from '../types.flow.js';

export default class BaseElement {
  constructor(
    props         : Props,
    rootContainer : IonizeContainer,
    hostContext   : HostContext
  ) { }

  appendInitialChild(
    child         : (BaseElement | TextInstance)
  ): void { }

  finalize(
    type                  : string,
    props                 : Props,
    rootContainerInstance : IonizeContainer
  ): boolean {
    return false;
  }

  commitMount(
    newProps      : Props,
  ): void { }

  prepareUpdate(
    oldProps              : Props,
    newProps              : Props,
    rootContainerInstance : IonizeContainer,
    hostContext           : HostContext,
  ): ?PropsDiff {
  }

  commitUpdate(
    updatePayload : ?PropsDiff,
    oldProps      : Props,
    newProps      : Props,
  ): void {
  }

  appendChild(
    child         : (BaseElement | TextInstance)
  ): void { }

  insertBefore(
    child         : (BaseElement | TextInstance)      
  ): void { }

  removeChild(
    child         : (BaseElement | TextInstance)
  ): void { }
}


