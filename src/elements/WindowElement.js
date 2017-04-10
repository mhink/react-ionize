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

const SUPPORTED_PROPS = {
  'show': true,
  'position': true,
  'size': true,
  'file': true,
  'onReadyToShow': true,
  'onResize': true,
  'showDevTools': true,
};

const PROP_TO_APP_EVENT_NAME = {
  'onReadyToShow' : 'ready-to-show',
  'onResize'      : 'resize',
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
    if (props.onReadyToShow !== undefined) {
      configureWrappedEventHandler.call(this, 'onReadyToShow', 'ready-to-show', props.onReadytoShow, (rawHandler) => rawHandler());
      const handler = props.onReadyToShow;
      this.window.on('ready-to-show', handler);
      this.attachedHandlers['ready-to-show'] = handler;
    }

    if (props.showDevTools) {
      this.window.webContents.openDevTools();
    }

    configureSize.call(this, props);
    configurePosition.call(this, props);
    configureFile.call(this, props);

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
    const updatePayload: Array<mixed> = [];
    
    const mergedProps = {};
    for (const propKey in oldProps) {
      mergedProps[propKey] = [oldProps[propKey], null];
    }
    for (const propKey in newProps) {
      if (mergedProps[propKey] !== undefined) {
        mergedProps[propKey][1] = newProps[propKey];
      } else {
        mergedProps[propKey] = [null, newProps[propKey]];
      }
    }

    for (const propKey in mergedProps) {
      if (!SUPPORTED_PROPS[propKey]) {
        continue;
      }
      const [oldVal, newVal] = mergedProps[propKey];
      if (oldVal !== newVal) {
        updatePayload.push(propKey, newVal);
      }
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

      // If we hit this point, we KNOW the prop changed, so we don't need to do
      // any checking. Just update to the new value.
      switch (propKey) {
        case 'onReadyToShow': {
          propVal = ((propVal: any): Function);
          configureWrappedEventHandler.call(this, 'onReadyToShow', 'ready-to-show', propVal, (rawHandler) => rawHandler());
          break;
        }
        case 'show': {
          if (newProps.show) {
            this.window.show();
          } else {
            this.window.hide();
          }
          break;
        }
        case 'size': 
        case 'defaultSize':
        case 'onResize': {
          configureSize.call(this, newProps);
          break;
        }
        case 'position':
        case 'defaultPosition':
        case 'onMove':
        case 'onMoved': {
          configurePosition.call(this, newProps);
          break;
        }
        case 'file': {
          configureFile.call(this, newProps);
          break;
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

function configureFile({ file }: Object) {
  if (file) {
    const filePath = path.resolve(file);
    this.window.loadURL(`file://${filePath}`);
  }
}

function configureSize({ size, onResize, defaultSize }: Object) {
  configureWrappedEventHandler.call(this, 'onResize', 'resize', onResize, (rawHandler) => {
    const size = this.window.getSize();
    rawHandler(size);
  });

  if (!size && defaultSize) {
    this.window.setSize(...defaultSize);
    this.window.setResizable(true);
    return;
  }
  if (!size && !defaultSize) {
    this.window.setResizable(true);
    return;
  }
  if (size && onResize) {
    this.window.setSize(...size);
    this.window.setResizable(true);
    return;
  }
  if (size && !onResize) {
    this.window.setSize(...size);
    this.window.setResizable(false);
    return;
  }
}

function configurePosition({
  position,
  onMove,
  onMoved,
  defaultPosition
}: Object) {

  configureWrappedEventHandler.call(this, 'onMove', 'move', onMove, (rawHandler) => {
    const position = this.window.getPosition();
    rawHandler(position);
  });

  configureWrappedEventHandler.call(this, 'onMoved', 'moved', onMoved, (rawHandler) => {
    const position = this.window.getPosition();
    rawHandler(position);
  });

  if (!position && defaultPosition) {
    this.window.setPosition(...defaultPosition);
    this.window.setMovable(true);
    return;
  }
  if (!position && !defaultPosition) {
    this.window.setMovable(true);
    return;
  }
  if (position && (onMove || onMoved)) {
    this.window.setPosition(...position);
    this.window.setMovable(true);
    return;
  }
  if (position && !(onMove || onMoved)) {
    this.window.setPosition(...position);
    this.window.setMovable(false);
    return;
  }
}

function configureWrappedEventHandler(propKey: string, eventKey: string, rawHandler: Function, wrapper: Function) {
  const rawEventKey = `${eventKey}_raw`
  const removingHandler = (
   rawHandler === undefined &&
   this.attachedHandlers[rawEventKey] !== undefined
  );

  const changingHandler = (
    rawHandler !== undefined &&
    this.attachedHandlers[rawEventKey] !== undefined && 
    rawHandler !== this.attachedHandlers[rawEventKey]
  );

  const newHandler = (
    rawHandler !== undefined &&
    this.attachedHandlers[rawEventKey] === undefined
  );
    
  if (removingHandler || changingHandler) {
    const existingHandler = this.attachedHandlers[eventKey];
    this.window.removeListener(eventKey, existingHandler);
    delete this.attachedHandlers[eventKey];
    delete this.attachedHandlers[rawEventKey];
  }

  if (changingHandler || newHandler) {
    const handler = () => wrapper(rawHandler);
    this.attachedHandlers[eventKey] = handler;
    this.attachedHandlers[rawEventKey] = rawHandler;
    this.window.on(eventKey, handler);
  }
}
