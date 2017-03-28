// @flow

import path from 'path';
import { BrowserWindow } from 'electron';
import BaseElement from './BaseElement';
import TextElement from './TextElement';
import DialogElement from './DialogElement';

import type { ElectronApp } from 'electron';
import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';

const PROP_TO_APP_EVENT_NAME = {
  'onReadyToShow' : 'ready-to-show',
  'onClose'       : 'close',
  'onClosed'      : 'closed',
  'onBlur'        : 'blur',
  'onFocus'       : 'focus',
  'onShow'        : 'show',
};

export default class WindowElement extends BaseElement {
  window: BrowserWindow;
  attachedHandlers: {[string]: Function};

  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
    hostContext   : HostContext
  ) {
    super(props, rootContainer, hostContext);

    this.window = new BrowserWindow({ show: false });

    this.attachedHandlers = {};
  }

  // Hook up event handlers, if they exist
  finalizeBeforeMount(
    type                  : string,
    props                 : Object,
  ): boolean {
    for (const propKey in props) {
      if (PROP_TO_APP_EVENT_NAME.hasOwnProperty(propKey)) {
        const handler = props[propKey];
        const eventKey = PROP_TO_APP_EVENT_NAME[propKey];

        this.window.on(eventKey, handler);
        this.attachedHandlers[eventKey] = handler;
      }
    }

    return true;
  }

  commitMount(
    newProps      : Object,
  ) {
    if (newProps.size) {
      this.window.setSize(...newProps.size);
    }

    if (newProps.position) {
      this.window.setPosition(...newProps.position);
    }

    if (newProps.file) {
      const filePath = path.resolve(__dirname, newProps.file);
      this.window.loadURL(`file://${filePath}`);
    }

    if (newProps.showDevTools) {
      this.window.webContents.openDevTools();
    }

    if (newProps.show) {
      this.window.show();
    }
  }

  finalizeBeforeRemoval(): void {
    // I think closing the window BEFORE unhooking the event handers is the
    // way to go here, but I could be wrong.
    this.window.close();
    for (const eventKey in this.attachedHandlers) {
      const handler = this.attachedHandlers[eventKey];
      this.window.removeListener(eventKey, handler);
    }
  }

  getPublicInstance(): number {
    return this.window;
  }

  appendInitialChild(
    child         : (BaseElement | TextElement)
  ): void {
    if (child instanceof DialogElement) {
      child.parentWindow = this.window;
    }
  }

  prepareUpdate(
    oldProps              : Object,
    newProps              : Object,
    rootContainerInstance : IonizeContainer,
    hostContext           : HostContext,
  ): null | Array<mixed> {
    let updatePayload: (null | Array<mixed>) = null;

    if (oldProps.show && !newProps.show) {
      (updatePayload = updatePayload || []).push('show', false);
    }

    if (!oldProps.show && newProps.show) {
      (updatePayload = updatePayload || []).push('show', true);
    }

    if (!oldProps.position && newProps.position) {
      (updatePayload = updatePayload || []).push('position', newProps.position);
    } else if (oldProps.position !== newProps.position) {
      (updatePayload = updatePayload || []).push('position', newProps.position);
    }

    if (!oldProps.size && newProps.size) {
      (updatePayload = updatePayload || []).push('size', newProps.size);
    } else if (oldProps.size !== newProps.size) {
      (updatePayload = updatePayload || []).push('size', newProps.size);
    }


    return updatePayload;
  }

  commitUpdate(
    updatePayload : Array<mixed>,
    oldProps      : Object,
    newProps      : Object,
  ): void {
    for (let i = 0; i < updatePayload.length; i += 2) {
      let propKey = updatePayload[i];
      let propVal = updatePayload[i+1];

      switch (propKey) {
        case 'show': {
          if (propVal) {
            this.window.show();
          } else {
            this.window.hide();
          }
          break;
        }
        case 'position': {
          this.window.setPosition(...propVal, true);
          break;
        }
        case 'size': {
          this.window.setSize(...propVal, true);
          break;
        }
      }
    }
  }

  appendInitialChild(
    child         : (BaseElement | TextElement)
  ): void {
    if (child instanceof DialogElement) {
      child.parentWindow = this.window;
    }
  }

  appendChild(
    child         : (BaseElement | TextElement)
  ): void {
  }

  insertBefore(
    child         : (BaseElement | TextElement),
    beforeChild   : (BaseElement | TextElement)
  ): void {
  }

  removeChild(
    child         : (BaseElement | TextElement)
  ): void {
    if (child instanceof DialogElement) {
      child.parentWindow = null;
    }
  }


  // constructor
  // finalizeInitialChildren
  // commitMount
  // prepareUpdate
  // commitUpdate
  // appendChild
  // insertBefore
  // removeChild
}
