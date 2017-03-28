// @flow

import ReactFiberReconciler from 'react-dom/lib/ReactFiberReconciler';
import type { FiberRoot } from 'react-dom/lib/ReactFiberRoot';
import * as IonizeHostConfig from './IonizeHostConfig';
import { app } from 'electron';
import IonizeContainer from './IonizeContainer';

export const IonizeRenderer = ReactFiberReconciler(IonizeHostConfig);

export const Ionize = {
  start(
    element : React$Element<any>,
    callback: ?Function,
  ) {
    this.container = new IonizeContainer(app);
    this.root = IonizeRenderer.createContainer(this.container);
    return this.update(element, callback);
  },

  update(
    element : React$Element<any>,
    callback: ?Function,
  ) {
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

  chain(el, cb, ...restPairs) {
    if (el && cb) {
      Ionize.update(el, () => {
        cb();
        Ionize.chain(...restPairs);
      });
    }
  },

  reset() {
    delete this.container;
    delete this.root;
  }
};

export default Ionize;
