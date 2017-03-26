// @flow

import BaseElement from './BaseElement';

import type { ElectronApp } from 'electron';
import TextElement from './TextElement';
import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';

const PROP_TO_APP_EVENT_NAME = {
  'onReady'               : 'ready',
};

export default class AppElement extends BaseElement {
  rootContainer : IonizeContainer;
  attachedHandlers: {[string]: Function};

  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
    hostContext   : HostContext
  ) {
    super(props, rootContainer, hostContext);
    this.rootContainer = rootContainer;
    this.attachedHandlers = {};
  }

  getPublicInstance(
  ): ElectronApp {
    return this.rootContainer.app;
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

        this.rootContainer.app.on(eventKey, handler);
        this.attachedHandlers[eventKey] = handler;
      }
    }
    return false;
  }

  finalizeBeforeRemoval(): void {
    for (const eventKey in this.attachedHandlers) {
      const handler = this.attachedHandlers[eventKey];
      this.rootContainer.app.removeListener(eventKey, handler);
    }
  }

  appendInitialChild(
    child         : (BaseElement | TextElement)
  ): void {
  }

  appendChild(
    child         : (BaseElement | TextElement)
  ): void {
  }

  removeChild(
    child         : (BaseElement | TextElement)
  ): void {
    super.removeChild(child);
  }

  // constructor
  // finalizeInitialChildren
  // commitMount
  // prepareUpdate
  // commitUpdate
  // insertBefore
  // removeChild
}
