// @flow

import {
  Menu,
  MenuItem,
} from 'electron';

import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';

import BaseElement from './BaseElement';
import TextElement from './TextElement';

export default class SubmenuElement extends BaseElement {
  menuItem: MenuItem;

  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);
    this.menuItem = new MenuItem({
    });
  }

  getPublicInstance(): MenuItem {
    return this.menuItem;
  }
}
