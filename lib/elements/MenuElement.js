// @flow

import {
  Menu,
} from 'electron';

import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';

import BaseElement from './BaseElement';
import TextElement from './TextElement';

export default class MenuElement extends BaseElement {
  menu: Menu;

  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);
    this.menu = new Menu();
  }

  getPublicInstance(): Menu {
    return this.menu;
  }

  finalizeBeforeMount(
    type          : string,
    props         : Object
  ): boolean {
    return true;
  }

  commitMount(
    newProps      : Object
  ) {
    Menu.setApplicationMenu(this.menu);
  }
}
