// @flow

import { dialog, BrowserWindow } from 'electron';
import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';

import BaseElement from './BaseElement';
import TextElement from './TextElement';

export default class DialogElement extends BaseElement {
  parentWindow: ?BrowserWindow;

  getPublicInstance(): any {
    return {
      show: () => {
        if (this.parentWindow) {
          dialog.showMessageBox(
            this.parentWindow,
            { message: 'Hello, world!' },
            () => { }
          );
        } else {
          dialog.showMessageBox(
            { message: 'Hello, world!' },
            () => { }
          );
        }
      }
    };
  }
}
