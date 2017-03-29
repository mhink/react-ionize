// @flow

import {
  Menu,
  MenuItem
} from 'electron';

import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';

import BaseElement from './BaseElement';
import TextElement from './TextElement';
import SubmenuElement from './SubmenuElement';
import GenericElement from './GenericElement';

export default class MenuElement extends BaseElement {
  menu: (null | Menu);
  menuElements: Array<BaseElement>

  getPublicInstance(): (null | Menu) {
    return this.menu;
  }
  
  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);
    this.menu = null;
    this.menuElements = [];
  }

  appendInitialChild(
    child         : (BaseElement | TextElement)
  ): void {
    if (child instanceof SubmenuElement
    ||  child instanceof GenericElement) {
      this.menuElements.push(child);
    }
  }

  finalizeBeforeMount(
    type          : string,
    props         : Object
  ): boolean {
    this.menu = new Menu();
    for (const el of this.menuElements) {
      if (el instanceof SubmenuElement) {
        if (el.menuItem) {
          this.menu.append(el.menuItem);
        }
      }
      if (el instanceof GenericElement) {
        this.menu.append(
          new MenuItem({ label: el.props.label })
        );
      }
    }

    return true;
  }
  
  commitMount(
    newProps      : Object
  ) {
    if (this.menu) {
      Menu.setApplicationMenu(this.menu);
    }
  }
}
