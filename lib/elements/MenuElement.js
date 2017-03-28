// @flow

import { dialog, BrowserWindow, Menu } from 'electron';
import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';

import BaseElement from './BaseElement';
import TextElement from './TextElement';

export default class MenuElement extends BaseElement {
  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
    hostContext   : HostContext
  ) {
    super(props, rootContainer, hostContext);
    this.menu = new Menu();
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
