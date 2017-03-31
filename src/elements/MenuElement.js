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

function commitApplicationMenu(menu: Menu, menuElements: Array<BaseElement>) {
  for (const el of menuElements) {
    if (el instanceof SubmenuElement) {
      if (el.menuItem) {
        menu.append(el.menuItem);
      }
    }
    if (el instanceof GenericElement) {
      menu.append(
        new MenuItem({ label: el.props.label })
      );
    }
  }

  Menu.setApplicationMenu(menu);
}

export default class MenuElement extends BaseElement {
  menu: (null | Menu);
  menuElements: Array<BaseElement>;

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

  appendChildBeforeMount(
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
    return true;
  }
  
  commitMount(
    newProps      : Object
  ) {
    this.menu = new Menu();
    commitApplicationMenu(this.menu, this.menuElements);
  }

  prepareUpdate(
    oldProps              : Object,
    newProps              : Object,
    rootContainerInstance : IonizeContainer
  ): null | Array<mixed> {
    let updatePayload: (null | Array<mixed>) = ['forceCommit', true];
    return updatePayload;
  }

  appendChild(
    child                 : (BaseElement | TextElement)
  ): void {
    if (child instanceof SubmenuElement
    ||  child instanceof GenericElement) {
      this.menuElements.push(child);
    }
  }

  insertBefore(
    child                 : (BaseElement | TextElement),
    beforeChild           : (BaseElement | TextElement),
  ): void {
    if (child instanceof SubmenuElement
    ||  child instanceof GenericElement) {
      const ix = this.menuElements.indexOf(child);
      if (ix !== -1) {
        this.menuElements.splice(ix, 1)
      }
      const bIx = this.menuElements.indexOf(beforeChild);
      if (bIx === -1) {
        throw new Error('This child does not exist.');
      }
      this.menuElements.splice(bIx, 0, child); 
    }
  }

  removeChild(
    child                 : (BaseElement | TextElement),
  ): void {
    const ix = this.menuElements.indexOf(child);
    this.menuElements.splice(ix, 1);
  }

  commitUpdate(
    updatePayload : Array<mixed>,
    oldProps      : Object,
    newProps      : Object
  ): void {
    this.menu = new Menu();
    commitApplicationMenu(this.menu, this.menuElements);
  }
}
