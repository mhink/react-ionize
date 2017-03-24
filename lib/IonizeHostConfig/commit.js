// @flow

import type {
  HostContext,
  Props,
  PropsDiff,
  Container,
  Instance,
  TextInstance
} from '../types.flow.js';

const UPDATE_SIGNAL = {};

// Before/after hooks to allow us to manipulate module-specific app state
export function prepareForCommit(): void {
  // console.log("prepareForCommit");
}

export function commitMount(
  instance              : Instance,
  type                  : string,
  newProps              : Props,
  internalInstanceHandle: Object
) : void {
}

export function prepareUpdate(
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
}

export function commitUpdate(
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
}

export function resetAfterCommit(): void {
  // console.log("resetAfterCommit");
}
