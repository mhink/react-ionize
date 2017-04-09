// @flow

import path from 'path';
import { BrowserWindow } from 'electron';
import BaseElement from './BaseElement';
import TextElement from './TextElement';

import type { ElectronApp } from 'electron';
import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';

/* PROPS NEEDED
 * title
 * minSize
 * maxSize
 *
 * NOTE: ABOUT CONTROLLED ATTRIBUTES
 * Controlled attributes behave in similar fashion to the <input> tag in React
 * DOM. Specifically, if you include a prop which specifies the value of a 
 * controlled attribute, you must also include an event handler which updates
 * the value of that prop.
 *
 * For instance, If you define the 'size' prop, the window will be set to
 * 'resizable: false', and the user will not be allowed to change it UNLESS
 * you also define the 'onResize' event handler, which should cause the size
 * to change. In this case, you should ensure that the `size` prop is updated
 * accordingly.
 *
 * If you do NOT define a controlled attribute, but you would still like to
 * define an initial value, most controlled attributes have a 'defaultXXX'
 * analogue that simply sets the value when the element is created and then
 * allows the user to adjust it as they please.
 *
 * Props that behave this way are marked as such below.
 *
 * size (controlled)
 * onResize
 * resizable
 * defaultSize
 *
 *  * position (controlled)
 * onMove
 * onMoved
 * defaultPosition
 * movable
 *
 * fullscreen (controlled)
 * onEnterFullScreen
 * onLeaveFullScreen
 * fullscreenable
 *
 * minimized (controlled)
 * onMinimize
 * onRestore
 * minimizable
 *
 * maximized (controlled)
 * onMaximize
 * onUnmaximize
 * maximizable
 *
 * focused (controlled)
 * onBlur
 * onFocus
 * focusable
 *
 * - By default, the show() method on a BrowserWindow should be called
 *   immediately upon mount.
 * show (controlled)
 * onReadyToShow
 * onShow
 * onHide
 * 
 * closable
 * onClose
 * onClosed (???)
 *
 * TBD props
 * alwaysOnTop
 * skipTaskbar
 * autoHideMenuBar
 * onPageTitleUpdated
 * onUnresponsive
 * onResponsive
 * onAppCommand
 * onScrollTouchBegin
 * onScrollTouchEnd
 * onScrollTouchEdge
 * onSwipe
 */

const PROP_TO_APP_EVENT_NAME = {
  'onReadyToShow' : 'ready-to-show',
  'onMove'        : 'move',
  'onMoved'       : 'moved',
};

export default class WindowElement extends BaseElement {
  parentWindow: (null | BrowserWindow);
  window: BrowserWindow;
  attachedHandlers: {[string]: Function};

  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);

    this.window = new BrowserWindow({ show: false });
    this.parentWindow = null;
    this.attachedHandlers = {};
  }

  appendChildBeforeMount(
    child         : (BaseElement | TextElement)
  ): void {
    if (child instanceof DialogElement
    ||  child instanceof WindowElement) {
      child.parentWindow = this.window;
    }
  }

  // Hook up event handlers, if they exist
  finalizeBeforeMount(
    type                  : string,
    props                 : Object,
  ): boolean {
    for (const propKey in props) {
      if (PROP_TO_APP_EVENT_NAME.hasOwnProperty(propKey)) {
        const handler = props[propKey];
        const eventKey = PROP_TO_APP_EVENT_NAME[propKey];
        this.window.on(eventKey, handler);
        this.attachedHandlers[eventKey] = handler;
      }
    }

    const { size, onResize, defaultSize } = props;
    configureSize(this.window, size, onResize, defaultSize);

    const { position, onMove, onMoved, defaultPosition } = props;
    configurePosition(this.window, position, onMove, onMoved, defaultPosition);

    if (props.showDevTools) {
      this.window.webContents.openDevTools();
    }

    const { file } = props;
    if (file) {
      configureFile(this.window, file);
    }

    if (this.parentWindow) {
      this.window.setParentWindow(this.parentWindow);
    }

    return true;
  }

  commitMount(
    newProps      : Object,
  ) {
    if (newProps.show) {
      this.window.show();
    }
  }

  finalizeBeforeRemoval(): void {
    this.window.close();
    for (const eventKey in this.attachedHandlers) {
      const handler = this.attachedHandlers[eventKey];
      this.window.removeListener(eventKey, handler);
    }
  }

  getPublicInstance(): BrowserWindow {
    // TBD: Make this a 'smart ref' so users can't modify window state that
    // we control.
    return this.window;
  }

  prepareUpdate(
    oldProps              : Object,
    newProps              : Object,
    rootContainerInstance : IonizeContainer,
  ): null | Array<mixed> {
    let updatePayload: Array<mixed> = [];

    // Check for entering/changed/exiting handlers
    for (const propKey in PROP_TO_APP_EVENT_NAME) {
      const newHandler = newProps[propKey];
      const oldHandler = oldProps[propKey];

      // Exiting
      if (oldHandler && !newHandler) {
        updatePayload.push(propKey, null);
        continue;
      }
      // Entering
      if (!oldHandler && newHandler) {
        updatePayload.push(propKey, newHandler);
        continue;
      }
      // Changed
      if (oldHandler !== newHandler) {
        updatePayload.push(propKey, newHandler);
        continue;
      }
    }

    // If .show changed, we need to flush in the new value.
    if (oldProps.show !== newProps.show) {
      updatePayload.push('show', !!newProps.show);
    }

    // Likewise with position.
    if (oldProps.position !== newProps.position) {
      updatePayload.push('position', true);
    }

    // Likewise with size.
    if (oldProps.size !== newProps.size) {
      updatePayload.push('size', true);
    }

    if (oldProps.file !== newProps.file) {
      updatePayload.push('file', true);
    }

    if (updatePayload.length === 0) {
      return null;
    } else {
      return updatePayload;
    }
  }

  commitUpdate(
    updatePayload : Array<mixed>,
    oldProps      : Object,
    newProps      : Object,
  ): void {

    for (let i = 0; i < updatePayload.length; i += 2) {
      let propKey = ((updatePayload[i]: any): string);
      let propVal = updatePayload[i+1];

      // Deal with changed event handlers
      if (propKey in PROP_TO_APP_EVENT_NAME) {
        propVal = ((propVal: any): Function);
        const eventKey = PROP_TO_APP_EVENT_NAME[propKey];
        this.window.removeAllListeners(eventKey);

        if (propVal !== null) {
          const eventKey = PROP_TO_APP_EVENT_NAME[propKey];
          this.window.on(eventKey, propVal);
        }
      }

      switch (propKey) {
        case 'show': {
          if (newProps.show) {
            this.window.show();
          } else {
            this.window.hide();
          }
          break;
        }
        case 'position': {
          const { position, onMove, onMoved, defaultPosition } = newProps;
          configurePosition(this.window, position, onMove, onMoved, defaultPosition);
          break;
        }
        case 'size': {
          const { size, onResize, defaultSize } = newProps;
          configureSize(this.window, size, onResize, defaultSize);
          break;
        }
        case 'file': {
          const { file } = newProps;
          configureFile(this.window, file);
        }
      }
    }
  }

  appendChildBeforeMount(
    child         : (BaseElement | TextElement)
  ): void {
    if (child instanceof WindowElement) {
      child.parentWindow = this.window;
    }
  }

  appendChild(
    child         : (BaseElement | TextElement)
  ): void {
    if (child instanceof WindowElement) {
      child.parentWindow = this.window;
    }
  }

  insertBefore(
    child         : (BaseElement | TextElement),
    beforeChild   : (BaseElement | TextElement)
  ): void {
    if (child instanceof WindowElement) {
      child.parentWindow = this.window;
    }
  }

  removeChild(
    child         : (BaseElement | TextElement)
  ): void {
    if (child instanceof WindowElement) {
      child.parentWindow = null;
    }
  }
}

function configureSize(
  window: BrowserWindow,
  size,
  onResize,
  defaultSize
) {
  if (!size && defaultSize) {
    window.setSize(...defaultSize);
    window.setResizable(true);
    return;
  }
  if (!size && !defaultSize) {
    window.setResizable(true);
    return;
  }
  if (size && onResize) {
    window.setSize(...size);
    window.setResizable(true);
    return;
  }
  if (size && !onResize) {
    window.setSize(...size);
    window.setResizable(false);
    return;
  }
}

function configurePosition(
  window: BrowserWindow,
  position,
  onMove,
  onMoved,
  defaultPosition
) {
  if (!position && defaultPosition) {
    window.setPosition(...defaultPosition);
    window.setMovable(true);
    return;
  }
  if (!position && !defaultPosition) {
    window.setMovable(true);
    return;
  }
  if (position && (onMove || onMoved)) {
    window.setPosition(...position);
    window.setMovable(true);
    return;
  }
  if (position && !(onMove || onMoved)) {
    window.setPosition(...position);
    window.setMovable(false);
    return;
  }
}

function configureFile(window, file) {
  const filePath = path.resolve(file);
  window.loadURL(`file://${filePath}`);
}
