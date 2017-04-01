// @flow

import ReactFiberReconciler from 'react-dom/lib/ReactFiberReconciler';
import type { FiberRoot } from 'react-dom/lib/ReactFiberRoot';
import * as IonizeHostConfig from './IonizeHostConfig';
import { app } from 'electron';
import IonizeContainer from './IonizeContainer';

export const IonizeRenderer = ReactFiberReconciler(IonizeHostConfig);

export const IonizeFiber: {|
  container : ?IonizeContainer,
  root      : ?FiberRoot,
  start     : (React$Element<any>, ?Function) => void,
  update    : (React$Element<any>, ?Function) => void,
  chain     : (any) => void,
  reset     : () => void,
|} = {
  container: null,
  root: null,

  start(element, callback) {
    this.container = new IonizeContainer(app);
    this.root = IonizeRenderer.createContainer(this.container);
    return this.update(element, callback);
  },

  update(element, callback) {
    if (!this.root) {
      return this.start(element, callback);
    }

    const startIonize = () => {
      IonizeRenderer.updateContainer(
        element,
        this.root,
        null,
        callback,
      );
    };

    if (app.isReady()) {
      startIonize();
    } else {
      app.once('ready', startIonize);
    }
  },

  chain(el, cbOrEl, ...restPairs) {
    if (el) {
      this.update(el, () => {
        if (typeof cbOrEl === 'function') {
          cbOrEl();
          this.chain(...restPairs);
        } else if (typeof cbOrEl === 'object') {
          this.chain(cbOrEl, ...restPairs);
        }
      });
    }
  },

  reset() {
    delete this.container;
    delete this.root;
  }
};
