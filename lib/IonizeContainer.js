// @flow

import type { ElectronApp } from 'electron';
import type { TextInstance } from './types.flow.js';
import type { BaseElement } from './components';

export default class IonizeContainer {
  _app: ElectronApp;

  constructor(
    electronApp   : ElectronApp
  ) {
    this._app = electronApp;
  }

  appendChild(
    child: (BaseElement | TextInstance)
  ): void {
  }

  insertBefore(
    child: (BaseElement | TextInstance)      
  ): void {
  }

  removeChild(
    child: (BaseElement | TextInstance)
  ): void {
  }
}

