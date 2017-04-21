// @flow

import type { ElectronDock } from 'electron';
import type IonizeContainer from '../IonizeContainer';

import BaseElement from './BaseElement';

const SUPPORTED_PROPS = {
  bouncing: true,
  badge: true,
};

export default class DockElement extends BaseElement {
  dock: ElectronDock
  currentBounce: number

  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);
    
    this.dock = rootContainer.app.dock;

    if (props.badge) this.dock.setBadge(props.badge);
    if (props.bouncing) this.currentBounce = this.dock.bounce(props.bouncing);
  }

  getPublicInstance(): ElectronDock {
    return this.dock;
  };

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
      let propVal: any = updatePayload[i+1];
      switch (propKey) {
        case 'badge': {
          this.dock.setBadge(propVal);
          break;
        }
        case 'bouncing': {
          if (typeof this.currentBounce !== 'undefined') {
            this.dock.cancelBounce(this.currentBounce);
            delete this.currentBounce;
          }
          if (propVal === true) {
            this.currentBounce = this.dock.bounce();
          } else if (propVal) {
            this.currentBounce = this.dock.bounce(propVal);
          }
        }
      }
    }
  }
}
