// @flow

import BaseElement from './BaseElement';

import type IonizeContainer from '../IonizeContainer';
import type {
  Props,
  HostContext,
} from '../types.flow.js';

export default class GenericElement extends BaseElement {
  _type: string;

  constructor(
    type          : string,
    props         : Props,
    rootContainer : IonizeContainer,
    hostContext   : HostContext
  ) {
    super(props, rootContainer, hostContext);
    this._type = type;
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
