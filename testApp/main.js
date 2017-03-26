import React from 'react';
import Ionize from '../lib/IonizeFiber';

function handleReady() {
  console.log("window is ready to show");
}

Ionize.start(
  <app>
    <window
      onReadyToShow={handleReady}
      file='index.html'
      />
  </app>,
  () => {
    console.log("--- Finished Ionize.start()");
  }
);
