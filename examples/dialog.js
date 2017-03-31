import React from 'react';
import Ionize from 'ionize';

let app;
let dialog;

function sayHello() {
  dialog.show("Hello, Ionize!", () => app.quit());
}

Ionize.start(
  <app ref={c => { app = c; }} onReady={sayHello}>
    <dialog ref={c => { dialog = c; }} />
  </app>
);
