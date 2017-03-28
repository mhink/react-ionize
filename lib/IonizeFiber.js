// @flow

import ReactFiberReconciler from 'react-dom/lib/ReactFiberReconciler';
import type { FiberRoot } from 'react-dom/lib/ReactFiberRoot';
import * as IonizeHostConfig from './IonizeHostConfig';
import { app } from 'electron';
import IonizeContainer from './IonizeContainer';

export const IonizeRenderer = ReactFiberReconciler(IonizeHostConfig);

export const Ionize = {
  batchedUpdates: IonizeRenderer.batchedUpdates,
  unbatchedUpdates: IonizeRenderer.unbatchedUpdates,
  syncUpdates: IonizeRenderer.unbatchedUpdates,
  deferredUpdates: IonizeRenderer.unbatchedUpdates,

  start(
    element : React$Element<any>,
    callback: ?Function,
  ) {
    const startIonize = () => {
      const root: ?FiberRoot = IonizeRenderer.createContainer(
        new IonizeContainer(app)
      );

      IonizeRenderer.updateContainer(
        element,
        root,
        null,
        callback,
      );
    }

    if (app.isReady()) {
      startIonize();
    } else {
      app.once('ready', startIonize);
    }
  }
};

export default Ionize;
