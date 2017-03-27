// @flow

import { dialog, BrowserWindow } from 'electron';
import type { MessageBoxOptions } from 'electron';
import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';

import BaseElement from './BaseElement';
import TextElement from './TextElement';

function showFromProps(parentWindow, props) {
  const opts = (({}: any): MessageBoxOptions);

  if (props.title) { opts.title = props.title; }
  if (props.message) { opts.message = props.message; }
  if (props.type) { opts.type = props.type; }

  if (parentWindow) {
    dialog.showMessageBox(
      parentWindow,
      opts
    );
  } else {
    dialog.showMessageBox(opts);
  }
}

export default class MessageDialog extends BaseElement {
  parentWindow: ?BrowserWindow;

  finalizeBeforeMount(
    type    : string,
    props   : Object,
  ): boolean {
    console.log("MessageDialog.finalizeBeforeMount");
    return true;
  }

  commitMount(
    newProps: Object
  ): void {
    if (newProps.show) {
      showFromProps(this.parentWindow, newProps)
    }
  }

  prepareUpdate(
    oldProps              : Object,
    newProps              : Object,
    rootContainerInstance : IonizeContainer,
    hostContext           : HostContext,
  ): null | Array<mixed> {
    let updatePayload: (null | Array<mixed>) = null;

    if (!oldProps.show && newProps.show) {
      (updatePayload = updatePayload || []).push('show', true);
    }

    return updatePayload;
  }

  commitUpdate(
    updatePayload : Array<mixed>,
    oldProps      : Object,
    newProps      : Object,
  ): void {
    for (let i = 0; i < updatePayload.length; i += 2) {
      let propKey = updatePayload[i];
      let propVal = updatePayload[i+1];

      if (propKey === 'show' && propVal) {
        showFromProps(this.parentWindow, newProps);
      }
    }
  }
}
