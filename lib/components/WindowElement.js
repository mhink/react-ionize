// @flow

import BaseElement from './BaseElement';
import TextElement from './TextElement';

export default class WindowElement extends BaseElement {
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
