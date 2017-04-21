// @flow

import BaseElement from './BaseElement';

import type { ElectronApp } from 'electron';
import TextElement from './TextElement';
import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';

const PROP_TO_APP_EVENT_NAME = {
  'onReady'               : 'ready',
};

const SUPPORTED_PROPS = {
  badge: true,
};

export default class AppElement extends BaseElement {
  rootContainer : IonizeContainer;
  attachedHandlers: {[string]: Function};

  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);

    this.rootContainer = rootContainer;
    this.attachedHandlers = {};

    if (props.badge) this.rootContainer.app.dock.setBadge(props.badge);
  }

  getPublicInstance(
  ): ElectronApp {
    // TODO: We should probably return a proxy object so the user can't go
    // crazy with the possibilities here.
    return this.rootContainer.app;
  }

  getSupportedProps(): { [string]: boolean } {
    return SUPPORTED_PROPS;
  }

  // Hook up event handlers, if they exist
  finalizeBeforeMount(
    type                  : string,
    props                 : Object,
  ): boolean {
    let willCommit = false;

    for (const propKey in props) {
      // For the sake of simplicity, we wait until the Electron app is ready
      // before starting the process of mounting React elements. However, it's
      // a useful enough pattern that we'll go ahead and fire the onReady
      // handler if it's provided when <app /> gets mounted.
      if (propKey === 'onReady') {
        willCommit = true;
        continue;
      }

      if (PROP_TO_APP_EVENT_NAME.hasOwnProperty(propKey)) {
        const handler = props[propKey];
        const eventKey = PROP_TO_APP_EVENT_NAME[propKey];

        this.rootContainer.app.on(eventKey, handler);
        this.attachedHandlers[eventKey] = handler;
      }
    }

    return willCommit;
  }

  commitMount(
    newProps  : Object
  ) {
    if (newProps.onReady !== undefined) {
      newProps.onReady();
    }
  }

  finalizeBeforeRemoval(): void {
    for (const eventKey in this.attachedHandlers) {
      const handler = this.attachedHandlers[eventKey];
      this.rootContainer.app.removeListener(eventKey, handler);
    }
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
        case 'badge': {
          propVal = ((propVal: any): string);
          this.rootContainer.app.dock.setBadge(propVal);
          break;
        }
      }
    }
  }
}
