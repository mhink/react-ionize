// @flow

import BaseElement from './BaseElement';

import type { ElectronApp } from 'electron';
import TextElement from './TextElement';
import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';

const PROP_TO_APP_EVENT_NAME = {
  'onWillFinishLaunching' : 'will-finish-launching',
  'onReady'               : 'ready',
  'onWindowAllClosed'     : 'on-window-all-closed',
};

export default class AppElement extends BaseElement {
  rootContainer : IonizeContainer;

  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
    hostContext   : HostContext
  ) {
    super(props, rootContainer, hostContext);
    this.rootContainer = rootContainer;
  }

  getPublicInstance(): ElectronApp {
    return this.rootContainer.app;
  }

  finalizeBeforeMount(
    type                  : string,
    props                 : Object,
  ): boolean {
    // Hook up event handlers, if they exist
    console.log('AppElement.finalizeBeforeMount');
    return false;
  }

  finalizeBeforeRemoval(
  ): void {
    // Remove event handlers
  }

  appendInitialChild(
    child         : (BaseElement | TextElement)
  ): void {
    console.log('AppElement.appendInitialChild', child);
  }

  appendChild(
    child         : (BaseElement | TextElement)
  ): void {
    console.log('AppElement.appendChild', child);
  }

  removeChild(
    child         : (BaseElement | TextElement)
  ): void {
    super.removeChild(child);
    console.log("AppElement.removeChild", child);
  }

  // constructor
  // finalizeInitialChildren
  // commitMount
  // prepareUpdate
  // commitUpdate
  // insertBefore
  // removeChild
}
