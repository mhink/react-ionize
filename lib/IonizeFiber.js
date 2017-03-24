// @flow

import ReactFiberReconciler from 'react-dom/lib/ReactFiberReconciler';
import type { FiberRoot } from 'react-dom/lib/ReactFiberRoot';
import type { Container } from './types.flow.js';
import * as IonizeHostConfig from './IonizeHostConfig';

const IonizeRenderer = ReactFiberReconciler(IonizeHostConfig);

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
