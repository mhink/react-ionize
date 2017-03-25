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
  <app
    onReady={handleReady}
    onQuit={handleQuit}
  >
    <menu label="Test App">
      <item role="about" />
      <sep />
      <menu role="services" />
      <sep />
      <item role="hide" />
      <item role="hideothers" />
      <item role="unhide" />
      <sep />
      <item role="quit" />
    </menu>

    <window
      title="Test App"
      url="main.html"
    >
      <portal toDom="#fucking-magic">
        <h1>Hello, world!</h1>
        <div style={{ color: 'red' }}>
          <p>HOW THE FUCK DID THIS GET HERE</p>
        </div>
      </portal>
    </window>
  </app>
);

Ionize.start(
  <TestApp />,
  () => {
    console.log("--- Finished Ionize.start()");
  }
);
