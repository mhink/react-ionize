// @flow
import type {
  Props,
  Instance,
} from '../types.flow.js';

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
export function getPublicInstance(instance: Instance) {
  return instance;
}

export const useSyncScheduling = false;

export function shouldDeprioritizeSubtree(
  type                  : string,
  props                 : Props
): boolean {
  return false;
}
