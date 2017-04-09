// @flow

import { MenuItem } from 'electron';
import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';
import EventEmitter from 'events';

import BaseElement from './BaseElement';
import TextElement from './TextElement';

export const GENERIC_ELEMENT_ROLE_TYPES = [
  "undo", "redo", "cut", "copy", "paste", "pasteandmatchstyle", "selectall",
  "delete", "minimize", "close", "quit", "reload", "forcereload",
  "toggledevtools", "togglefullscreen", "resetzoom", "zoomin", "zoomout"
];

export const OSX_GENERIC_ELEMENT_ROLE_TYPES  = [
  "about", "hide", "hideothers", "unhide", "startspeaking", "stopspeaking",
  "front", "zoom", "window", "help", "services"
];

export class MenuItemElement extends BaseElement {
  menuItem: (null | MenuItem);
}

export class SeparatorElement extends MenuItemElement {
  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);
    this.menuItem = new MenuItem({
      type: 'separator'
    });
  }
}

export class RoleMenuItemElement extends MenuItemElement {
  constructor(
    role          : string,
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);
    this.menuItem = new MenuItem({ role });
  }
}

export class CustomMenuItemElement extends MenuItemElement {
  emitter: EventEmitter;

  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);
    this.emitter = new EventEmitter();
    this.menuItem = new MenuItem({
      type: 'normal',
      label: props.label,
      click: function(menuItem, browserWindow, event) {
        this.emitter.emit('click', event);
      }
    });
  }
}

export const isRoleMenuItemType = (type: string) => {
  if (GENERIC_ELEMENT_ROLE_TYPES.indexOf(type) !== -1) {
    return true;
  }
  if (process.platform === 'darwin'
    && OSX_GENERIC_ELEMENT_ROLE_TYPES.indexOf(type) !== -1) {
    return true;
  }

  return false;
}
