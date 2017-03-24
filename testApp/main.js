import React from 'react';
import Ionize from '../lib/IonizeFiber';
import { map } from 'lodash';

const handleReady = (e) => {
  console.log("App is ready!");
};

const TestApp = () => (
  <listen onReady={handleReady} />
);

Ionize.start(
  <TestApp />,
  () => {
    console.log("--- Finished Ionize.start()");
  }
);
