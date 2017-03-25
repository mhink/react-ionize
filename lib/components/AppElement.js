// @flow

import BaseElement from './BaseElement';
import type { TextInstance } from '../types.flow.js';

export default class AppElement extends BaseElement {
  appendInitialChild(
    child         : (BaseElement | TextInstance)
  ): void {
    console.log('AppElement.appendInitialChild', child);
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
