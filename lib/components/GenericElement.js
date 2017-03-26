// @flow

import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';

import BaseElement from './BaseElement';
import TextElement from './TextElement';

export default class GenericElement extends BaseElement {
  _type: string;

  constructor(
    type          : string,
    props         : Object,
    rootContainer : IonizeContainer,
    hostContext   : HostContext
  ) {
    super(props, rootContainer, hostContext);
    this._type = type;
  }

  appendInitialChild(
    child                 : (BaseElement | TextElement)
  ): void {
    console.log("GenericElement.appendInitialChild", child);
  }

  finalizeBeforeMount(
    type                  : string,
    props                 : Object,
    rootContainerInstance : IonizeContainer
  ): boolean {
    console.log("GenericElement.finalizeBeforeMount", type, props);
    return false;
  }

  finalizeBeforeUnmount(
  ): void {
    console.log("GenericElement.finalizeBeforeUnmount");
  }

  // constructor
  // appendInitialChild
  // finalizeInitialChildren
  // commitMount
  // prepareUpdate
  // commitUpdate
  // appendChild
  // insertBefore
  // removeChild
}
