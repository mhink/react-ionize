// @flow

import type { ElectronApp } from 'electron';
import { AppElement, BaseElement, TextElement } from './components';

export default class IonizeContainer {
  app         : ElectronApp;
  appElement  : ?AppElement;

  constructor(
    electronApp   : ElectronApp
  ) {
    this.app = electronApp;
    this.appElement = null;
  }

  appendChild(
    child: (BaseElement | TextElement)
  ): void {
    if (child instanceof AppElement) {
      this.appElement = child;
    }
  }

  insertBefore(
    child: (BaseElement | TextElement)      
  ): void {
  }

  removeChild(
    child: (BaseElement | TextElement)
  ): void {
    if (child instanceof (typeof AppElement)) {
      this.appElement = null;
    }
  }
}

