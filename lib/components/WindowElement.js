// @flow

import BaseElement from './BaseElement';
import type { TextInstance } from '../types.flow.js';

export default class WindowElement extends BaseElement {
  appendInitialChild(
    child         : (BaseElement | TextInstance)
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
