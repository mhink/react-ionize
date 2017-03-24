// @flow

import ReactFiberReconciler from 'react-dom/lib/ReactFiberReconciler';
import type { FiberRoot } from 'react-dom/lib/ReactFiberRoot';

type Props = Object;

type HostContext = {||};

const DEFAULT_HOST_CONTEXT = (({} : any): HostContext);

import describe from './describeInstance';

export type PropsDiff = Object;
export type Container = {|
  tag                   : 'CONTAINER',
  children              : Array<Instance | TextInstance>,
|};

export type Instance = {|
  tag                   : 'INSTANCE',
  type                  : string,
  props                 : Object,
  children              : Array<Instance | TextInstance>,
  rootContainerInstance : Container,
|};

export type TextInstance = {|
  tag                   : 'TEXT',
  text                  : string,
|};

const UPDATE_SIGNAL = {};

const IonizeRenderer = ReactFiberReconciler({
  getRootHostContext(
    rootContainerInstance: Container,
  ): HostContext {
    return DEFAULT_HOST_CONTEXT;
  },

  getChildHostContext(
    parentHostContext       : HostContext,
    type                    : string,
  ): HostContext {
    return DEFAULT_HOST_CONTEXT;
  },

  // Before/after hooks to allow us to manipulate module-specific app state
  prepareForCommit(): void {
    // console.log("prepareForCommit");
  },

  resetAfterCommit(): void {
    // console.log("resetAfterCommit");
  },

  // Create the actual "thing" described by the type and props of the element
  // we're looking at. (It will be 'attached' to the thing represented by its
  // parent element later on, in appendInitialChild/appendChild/insertBefore.)
  createInstance(
    type                    : string,
    props                   : Props,
    rootContainerInstance   : Container,
    hostContext             : HostContext,
    internalInstanceHandle  : Object
  ): Instance {
    console.log(`Creating instance: ${type}`);
    return {
      tag: 'INSTANCE',
      type,
      props,
      children: [],
      rootContainerInstance,
    };
  },

  appendInitialChild(
    parentInstance  : Instance,
    child           : Instance | TextInstance
  ): void {
    let msg = `Appending initial ${child.tag} `;
    switch (child.tag) {
      case 'CONTAINER':
        msg += '(C)'
        break;
      case 'INSTANCE':
        msg += `(${child.type})`;
        break;
      case 'TEXT':
        msg += `("${child.text}")`;
        break;
    }
    msg += ` to ${parentInstance.tag} `;
    switch (parentInstance.tag) {
      case 'INSTANCE':
        msg += `(${parentInstance.type})`;
        break;
    }

    console.log(msg);
    const index = parentInstance.children.indexOf(child);
    if (index !== -1) {
      parentInstance.children.splice(index, 1);
    }
    parentInstance.children.push(child);
  },

  finalizeInitialChildren(
    testElement           : Instance,
    type                  : string,
    props                 : Props,
    rootContainerInstance : Container,
  ): boolean {
    // The return value of this function appears to indicate whether we should
    // run commitMount or not, although I'm not completely sure what that means.
    //
    // (ReactDOM uses this behavior to decide whether or not to auto-focus a
    // component, presumably after it's been mounted?)
    return false;
  },

  prepareUpdate(
    instance              : Instance,
    type                  : string,
    oldProps              : Props,
    newProps              : Props,
    rootContainerInstance : Container,
    hostContext           : HostContext,

  ) : ?PropsDiff {

    // In the ReactDOM fiber implementation this appears to be a diff of props
    // that will be changing. ReactHardware says that 'diffing properties here
    // allows the reconciler to reuse work', but I'm not sure what that
    // actually entails.
    //
    // *OH* this is the updatePayload which gets passed to commitUpdate.
    return UPDATE_SIGNAL;
  },

  commitUpdate(
    instance              : Instance,
    updatePayload         : ?PropsDiff, // Provided by prepareUpdate
    type                  : string,
    oldProps              : Props,
    newProps              : Props,

    internalInstanceHandle: Object,
  ) : void {
    // ReactHardware says 'update the props handle so that we know which props
    // are the ones with current event handlers.'
    //
    // This appears to be the method which actually flushes a diff out to the
    // render target.
    instance.type = type;
    instance.props = newProps;
  },

  commitMount(
    instance              : Instance,
    type                  : string,
    newProps              : Props,
    internalInstanceHandle: Object
  ) : void {
  },

  shouldSetTextContent(
    props                 : Props
  ): boolean {
    return false;
  },

  resetTextContent(
    testElement           : Instance
  ): void {
    // noop
  },

  shouldDeprioritizeSubtree(
    type                  : string,
    props                 : Props
  ): boolean {
    return false;
  },

  createTextInstance(
    text                  : string,
    rootContainerInstance : Container,
    hostContext           : Object,
    internalInstanceHandle: Object
  ): TextInstance {
    return {
      tag: 'TEXT',
      text,
    };
  },

  commitTextUpdate(
    textInstance          : TextInstance,
    oldText               : string,
    newText               : string
  ): void {
    textInstance.text = newText;
  },

  appendChild(
    parentInstance        : Instance | Container,
    child                 : Instance | TextInstance
  ): void {
    console.log(`Appending ${describe(child)} to ${describe(parentInstance)}`);

    const index = parentInstance.children.indexOf(child);
    if (index !== -1) {
      parentInstance.children.splice(index, 1);
    }
    parentInstance.children.push(child);
  },

  insertBefore(
    parentInstance        : Instance | Container,
    child                 : Instance | TextInstance,
    beforeChild           : Instance | TextInstance
  ): void {
    console.log(`Inserting ${describe(child)} before 
                ${describe(beforeChild)} within ${describe(parentInstance)}`);

    const index = parentInstance.children.indexOf(child);
    if (index !== -1) {
      parentInstance.children.splice(index, 1);
    }
    const beforeIndex = parentInstance.children.indexOf(beforeChild);
    parentInstance.children.splice(beforeIndex, 0, child);
  },

  removeChild(
    parentInstance        : Instance | Container,
    child                 : Instance | TextInstance
  ): void {
    console.log(`Removing ${describe(child)} from ${describe(parentInstance)}`);

    const index = parentInstance.children.indexOf(child);
    parentInstance.children.splice(index, 1);
  },

  // Lifted wholesale from ReactTestRendererFiber.
  // TODO: See if there's something more appropriate to do here.
  scheduleAnimationCallback(fn: Function): void { setTimeout(fn); },
  scheduleDeferredCallback(fn: Function): void { setTimeout(fn, 0, { timeRemaining: () => Infinity }); },

  // TODO: Figure out what this does. ReactTestRenderer seems to use it to
  //       convert nodes into a displayable form?
  getPublicInstance(instance) { return instance },

  useSyncScheduling: false,
});

const Ionize = {
  start(
    element : React$Element<any>,
    callback: ?Function,
  ) {
    const container: Container = {
      tag: 'CONTAINER',
      children: [],
    };

    const root: ?FiberRoot = IonizeRenderer.createContainer(container);

    IonizeRenderer.updateContainer(
      element,
      root,
      null,
      callback,
    );
  }
};

export default Ionize;
