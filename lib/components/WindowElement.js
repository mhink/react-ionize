// @flow

import path from 'path';
import { BrowserWindow } from 'electron';
import BaseElement from './BaseElement';
import TextElement from './TextElement';

import type { ElectronApp } from 'electron';
import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';

const PROP_TO_APP_EVENT_NAME = {
  'onReadyToShow': 'ready-to-show',
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

    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
    });

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
    if (newProps.file) {
      const filePath = path.resolve(__dirname, newProps.file);
      this.window.loadURL(`file://${filePath}`);

      if (newProps.showDevTools) {
        this.window.webContents.openDevTools();
      }

      if (newProps.showImmediate) {
        this.window.show();
      } else {
        this.window.once('ready-to-show', () => {
          this.window.show();
        });
      }
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

  getPublicInstance(): BrowserWindow {
    return this.window;
  }

  appendInitialChild(
    child         : (BaseElement | TextElement)
  ): void {
    console.log('Window.appendInitialChild', child);
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
