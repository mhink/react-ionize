import React from 'react';
import Ionize from '../lib/IonizeFiber';
import { map } from 'lodash';

const handleReady = (e) => {
  console.log("App is ready!");
  console.log(e.sender.isReady());
};

const handleQuit = () => {
  console.log("Goodbye!");
};

const TestApp = () => (
  <app>
    <outer />
    <portal>
      <inner>Hello, world</inner>
    </portal>
  </app>
);

Ionize.start(
  <TestApp />,
  () => {
    console.log("--- Finished Ionize.start()");
  }
);
