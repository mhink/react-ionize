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
  submenuElements: Array<BaseElement>;

  getPublicInstance(): (null | MenuItem) {
    return this.menuItem;
  }

  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);
    this.menuItem = null;
    this.submenuElements = [];
  }

  appendInitialChild(
    child: (BaseElement | TextElement)
  ): void {
    if (child instanceof SubmenuElement
    ||  child instanceof GenericElement) {
      this.submenuElements.push(child);
    }
  }

  finalizeBeforeMount(
    type          : string,
    props         : Object,
  ): boolean {
    const { label } = props;
    const submenu = new Menu();
    for (const el of this.submenuElements) {
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
      label,
      submenu
    });

    return false;
  }
}
