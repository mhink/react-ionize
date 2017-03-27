# Ionize
A React Fiber renderer for Electron apps

Ionize lets you build [Electron](https://electron.atom.io) applications in a
declarative style, much like you'd build a web-based React application.

## Usage
See the contents of `/testApp/main.js` for current demo.

The following is the most basic Hello World I can come up with...
```
import React from 'react';

let dialog;

function sayHello() {
  if (dialog) {
    dialog.show("Hello, world!");
  }
}

Ionize.start(
  <app onReady={sayHello}>
    <dialog ref={c => { dialog = c; }} />
  </app>
);
```

## API

## Examples
