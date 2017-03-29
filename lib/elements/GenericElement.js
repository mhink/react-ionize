// @flow

import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';

import BaseElement from './BaseElement';
import TextElement from './TextElement';

export default class GenericElement extends BaseElement {
  _type: string;
  props: Object;

  constructor(
    type          : string,
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);
    this._type = type;
    this.props = props;
  }
}
