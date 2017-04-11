// @flow

import { MenuItem } from 'electron';
import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';
import EventEmitter from 'events';

import BaseElement from './BaseElement';
import TextElement from './TextElement';
import configureWrappedEventHandler from '../util/configureWrappedEventHandler';

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
  menuItem: MenuItem;
  getPublicInstance(): MenuItem {
    return this.menuItem;
  };
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

const SUPPORTED_PROPS = {
  label: true,
  onClick: true
};

export class CustomMenuItemElement extends MenuItemElement {
  emitter: EventEmitter;
  attachedHandlers: { [string]: Function };

  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);
    this.attachedHandlers = {};
    this.emitter = new EventEmitter();
    this.menuItem = new MenuItem({
      type: 'normal',
      label: props.label,
      click: (menuItem, browserWindow, event) => {
        this.emitter.emit('click', event);
      }
    });
  }

  finalizeBeforeMount(
    type          : string,
    props         : Object,
  ): boolean {
    if (props.onClick) {
      configureWrappedEventHandler(
        this.emitter,
        this.attachedHandlers,
        'onClick',
        'click',
        props.onClick,
        (rawHandler) => rawHandler()
      );
    }
    return false;
  }

  getSupportedProps(): { [string]: boolean } {
    return SUPPORTED_PROPS;
  }

  commitUpdate(
    updatePayload : Array<mixed>,
    oldProps      : Object,
    newProps      : Object
  ): void {
    for (let i = 0; i < updatePayload.length; i += 2) {
      let propKey = ((updatePayload[i]: any): string);
      let propVal = updatePayload[i+1];
      switch (propKey) {
        case 'onClick': {
          propVal = ((propVal: any): Function);
          configureWrappedEventHandler(
            this.emitter,
            this.attachedHandlers,
            'onClick',
            'click',
            propVal,
            (rawHandler) => rawHandler()
          );
          break;
        }
      }
    }

    this.menuItem = new MenuItem({
      type: 'normal',
      label: newProps.label,
      click: (menuItem, browserWindow, event) => {
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
