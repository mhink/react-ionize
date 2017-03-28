// @flow
import type { ElectronApp } from 'electron';
import type IonizeContainer from './IonizeContainer';

export type HostContext = {| |};

const DEFAULT_HOST_CONTEXT: HostContext = ({}: any);

import {
  TYPE_TO_ELEMENT_MAP,
  GenericElement,
  TextElement,
  BaseElement,
} from './elements';

// Create the actual "thing" described by the type and props of the element
// we're looking at. (It will be 'attached' to the thing represented by its
// parent element later on, in appendInitialChild/appendChild/insertBefore.)
export function createInstance(
  type                    : string,
  props                   : Object,
  rootContainerInstance   : IonizeContainer,
  hostContext             : HostContext,
  internalInstanceHandle  : Object
): BaseElement {
  let element: BaseElement;

  if (TYPE_TO_ELEMENT_MAP[type] !== undefined) {
    element = TYPE_TO_ELEMENT_MAP[type];
    return new element(
      props,
      rootContainerInstance,
      hostContext
    );
  } else {
    return new GenericElement(
      type,
      props,
      rootContainerInstance,
      hostContext
    );
  }
}

// Apparently, this function gets called instead of 'appendChild' when we're
// dealing with a child which has just been mounted?
export function appendInitialChild(
  parentInstance  : BaseElement,
  child           : BaseElement| TextElement
): void {
  parentInstance.appendInitialChild(child);
}

// In this function, ReactDOM:
// - Sets up event listeners for e.g. onChange
//
// The return value of this function appears to indicate whether we should
// run commitMount or not, although I'm not completely sure what that means.
//
// (ReactDOM uses this behavior to decide whether or not to auto-focus a
// component, presumably after it's been mounted?)
export function finalizeInitialChildren(
  newElement            : BaseElement,
  type                  : string,
  props                 : Object,
  rootContainerInstance : ElectronApp,
): boolean {
  return newElement.finalizeBeforeMount(type, props, rootContainerInstance);
}

export function appendChild(
  parentInstance        : BaseElement | IonizeContainer,
  child                 : BaseElement | TextElement
): void {
  parentInstance.appendChild(child);
}

export function insertBefore(
  parentInstance        : BaseElement | IonizeContainer,
  child                 : BaseElement | TextElement,
  beforeChild           : BaseElement | TextElement
): void {
  parentInstance.insertBefore(child, beforeChild);
}

export function removeChild(
  parentInstance        : BaseElement | IonizeContainer,
  child                 : BaseElement | TextElement
): void {
  child.finalizeBeforeRemoval();
  parentInstance.removeChild(child);
}

export function shouldSetTextContent(
  props                 : Object
): boolean {
  return false;
}

export function resetTextContent(
  element               : BaseElement
): void {
  // noop
}

export function createTextInstance(
  text                  : string,
  rootContainerInstance : IonizeContainer,
  hostContext           : Object,
  internalInstanceHandle: Object
): TextElement {
  return new TextElement(text, rootContainerInstance, hostContext);
}

export function commitTextUpdate(
  textElement           : TextElement,
  oldText               : string,
  newText               : string
): void {
  return textElement.commitUpdate(oldText, newText);
}

export function getRootHostContext(
  rootContainerInstance: IonizeContainer,
): HostContext {
  return DEFAULT_HOST_CONTEXT;
}

export function getChildHostContext(
  parentHostContext       : HostContext,
  type                    : string,
): HostContext {
  return DEFAULT_HOST_CONTEXT;
}

const UPDATE_SIGNAL = {};

// Before/after hooks to allow us to manipulate module-specific app state
// ReactDOM uses this to disable its event system before making changes to
// the DOM.
export function prepareForCommit(): void {
}

// ReactDOM uses this to focus any input elements it just created.
export function commitMount(
  instance              : BaseElement,
  type                  : string,
  newProps              : Object,
  internalInstanceHandle: Object
) : void {
  instance.commitMount(newProps);
}

// In the ReactDOM fiber implementation this appears to be a diff of props
// that will be changing. ReactHardware says that 'diffing properties here
// allows the reconciler to reuse work', but I'm not sure what that
// actually entails.
//
// The return value is a diff of the oldProps/newProps which get passed to
// commitUpdate.
export function prepareUpdate(
  instance              : BaseElement,
  type                  : string,
  oldProps              : Object,
  newProps              : Object,
  rootContainerInstance : IonizeContainer,
  hostContext           : HostContext,
) : null | Array<any> {
  return instance.prepareUpdate(
    oldProps,
    newProps,
    rootContainerInstance,
    hostContext
  );
}

// ReactHardware says 'update the props handle so that we know which props
// are the ones with current event handlers.'
//
// This appears to be the method which actually flushes a diff out to the
// render target.
// 
// TODO: Dispatch to IonizeFiberComponent.updateProperties or suchlike
export function commitUpdate(
  instance              : BaseElement,
  updatePayload         : Array<any>, // Provided by prepareUpdate
  type                  : string,
  oldProps              : Object,
  newProps              : Object,
  internalInstanceHandle: Object,
): void {
  instance.commitUpdate(updatePayload, oldProps, newProps);
}

// The dual of prepareForCommit, this is where ReactDOM resets its event
// handlers and such.
export function resetAfterCommit(): void {
}

// Lifted wholesale from ReactTestRendererFiber.
// TODO: See if there's something more appropriate to do here.
export function scheduleAnimationCallback(fn: Function): void {
  setTimeout(fn);
}

export function scheduleDeferredCallback(fn: Function): void {
  setTimeout(fn, 0, { timeRemaining: () => Infinity });
}

// TODO: Figure out what this does. ReactTestRenderer seems to use it to
//       convert nodes into a displayable form?
export function getPublicInstance(
  instance: BaseElement
): (ElectronApp | BaseElement) {
  return instance.getPublicInstance();
}

export const useSyncScheduling = false;

export function shouldDeprioritizeSubtree(
  type                  : string,
  props                 : Object,
): boolean {
  return false;
}
