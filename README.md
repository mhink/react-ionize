# react-ionize
react-ionize lets you build [Electron](https://electron.atom.io) applications in a
declarative style, much like you'd build a web-based React application.

## Caveat Developer
react-ionize is still an EXPERIMENTAL, PRE-ALPHA library, and is not yet
suitable for for use in a production app! It's a custom renderer built on top
of the React Fiber reconciliation API, which itself is still under active
development. (Not to mention, I've got a whole crop of Electron features yet
to add.)

## Getting Started

```
* yarn add react-ionize 
* yarn add react-dom@16.0.0-alpha.5
```

Take a look at [Ionize Example App](https://github.com/mhink/ionize-example-app) to get started.


## Hello, world!

```
import React from 'react';
import Ionize from 'react-ionize';
import path from 'path';
import fs from 'fs';

const INDEX_HTML_PATH = path.resolve(__dirname, 'index.html');
const INDEX_HTML_SOURCE = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello, Electron!</title>
  </head>
  <body>
    <h1>Hello, Electron!</h1>
  </body>
</html>
`;

fs.writeFileSync(INDEX_HTML_PATH, INDEX_HTML_SOURCE);

Ionize.start(
  <app>
    <window show file={INDEX_HTML_PATH} />
  </app>
);
```

## API
### `Ionize.start(element, [callback])`

Starts up an Electron application under Ionize. (Note: this will wait on the
'ready' Electron event before starting to render any elements.)

## Elements
Generally speaking, the presence of an Ionize element in your component tree
indicates that you _want_ it to be there, and that Ionize should ensure its
presence when rendering. This can lead to slightly surprising behavior if
you're unfamiliar with React- for instance, if you want a window to actually
go away when you close it, you need to make sure that the corresponding `<window/>`
element actually gets unmounted!

### `<app>`
Attachment point for event handlers related to the global app. Not strictly
necessary if you don't need to register any of these (since React Fiber now
supports multiple children without a parent element).

Generally speaking, children of `<app>` are things related to the entire
application: browser windows, dialogs, tray elements, and so forth. (Or at
least, they will be once I get a chance to implement them.)

* Event Handlers
  * onReady- Fired immediately when the component is mounted.

### `<window>`
Represents an Electron BrowserWindow object.

* file
  * The HTML file you want to render in the Chrome browser instance. (Note
    that Ionize looks up this file relative to the _runtime_ location of
    your project!)

* show
  * When this prop transitions from false -> true, Ionize displays the
    browser window. When it transitions from true -> false, Ionize hides
    (but does not close) the browser window. If this is true when the
    element is mounted, Ionize will immediately show the window.

* showDevTools
  * If this is true when the element is mounted, Ionize will open
    the Chrome Developer Tools when opening the browser window.

* Event Handlers
  * onReadyToShow
  * onClose
  * onClosed
  * onBlur
  * onFocus
  * onShow

### `<menu>`
The `<menu>` element defines an Electron application menu.

TODO: When nested inside a `<window>` element, this should attach the menu to
that window, specifically- and I'd like to have something like a <contextmenu>
element for right-clicks.

### `<submenu>`
TBD

### `<item>` and related
TBD

### `<dialog>`
This is an odd duck. Since Electron's `dialog` API is more of a functional
interface, I'm experimenting with an idea you could call a 'smart ref'- in
other words, obtaining a ref to this element gives you an object which you can
safely call `show()` on, which makes the appropriate function call based on
the props you give `<dialog>`.

When mounted within a `<window>` element, calling `show()` on this will pop
up a modal dialog _in that window_. Otherwise, it will pop up a modal dialog 
not linked to that window.

