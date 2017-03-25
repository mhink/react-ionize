// @flow

import ReactFiberReconciler from 'react-dom/lib/ReactFiberReconciler';
import type { FiberRoot } from 'react-dom/lib/ReactFiberRoot';
import * as IonizeHostConfig from './IonizeHostConfig';
import { app } from 'electron';
import IonizeContainer from './IonizeContainer';

const IonizeRenderer = ReactFiberReconciler(IonizeHostConfig);

const Ionize = {
  start(
    element : React$Element<any>,
    callback: ?Function,
  ) {
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
};

export default Ionize;
