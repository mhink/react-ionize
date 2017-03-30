// @flow

import {
  Menu,
  MenuItem,
} from 'electron';

import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';

import BaseElement from './BaseElement';
import TextElement from './TextElement';
import GenericElement from './GenericElement';

export default class SubmenuElement extends BaseElement {
  menuItem: (null | MenuItem);
  menuElements: Array<BaseElement>;

  getPublicInstance(): (null | MenuItem) {
    return this.menuItem;
  }

  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);
    this.menuItem = null;
    this.menuElements = [];
  }

  appendChildBeforeMount(
    child: (BaseElement | TextElement)
  ): void {
    if (child instanceof SubmenuElement
    ||  child instanceof GenericElement) {
      this.menuElements.push(child);
    }
  }

  finalizeBeforeMount(
    type          : string,
    props         : Object,
  ): boolean {
    return true;
  }

  commitMount(
    newProps      : Object,
  ): void {
    const submenu = new Menu();

    for (const el of this.menuElements) {
      if (el instanceof SubmenuElement) {
        if (el.menuItem) {
          submenu.append(el.menuItem);
        }
      }
      if (el instanceof GenericElement) {
        submenu.append(
          new MenuItem({ label: el.props.label })
        );
      }
    }

    const { label } = newProps;
    this.menuItem = new MenuItem({
      label,
      submenu
    });
  }

  prepareUpdate(
    oldProps              : Object,
    newProps              : Object,
    rootContainerInstance : IonizeContainer
  ): null | Array<mixed> {
    let updatePayload: Array<mixed> = ['forceCommit', true];

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
    newProps      : Object,
  ): void {
    const submenu = new Menu();

    for (const el of this.menuElements) {
      if (el instanceof SubmenuElement) {
        if (el.menuItem) {
          submenu.append(el.menuItem);
        }
      }
      if (el instanceof GenericElement) {
        submenu.append(
          new MenuItem({ label: el.props.label })
        );
      }
    }

    this.menuItem = new MenuItem({
      label: newProps.label,
      submenu
    });
  }
}
