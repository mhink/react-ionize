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
}
