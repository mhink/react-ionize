# Ionize
A React Fiber renderer for Electron apps

Ionize lets you build [Electron](https://electron.atom.io) applications in a
declarative style, much like you'd build a web-based React application.

## Running the Demo
* `yarn install`
* `yarn start`

## API
`Ionize.start(element, [callback])`

Starts up an Electron application under Ionize. (Note: this will wait on the
'ready' Electron event before starting to render any elements.)

## Elements
Generally speaking, the presence of an Ionize element in your component tree
indicates that you _want_ it to be there, and that Ionize should ensure its
presence when rendering. This can lead to slightly surprising behavior if
you're unfamiliar with React- for instance, if you want a window to actually
go away when you close it, you need to re-render its container and remove the
window!

### `<app />`
Attachment point for event handlers related to the global app. Not strictly
necessary if you don't need to register any of these (since React Fiber now
supports multiple children without a parent element).

Generally speaking, children of <app /> are things related to the entire
application: browser windows, dialogs, tray elements, and so forth. (Or at
least, they will be once I get a chance to implement them.)

* Event Handlers
  * onReady- Fired immediately when the component is mounted.

### `<window />`
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

### `<dialog />`
This is an odd duck. Since Electron's `dialog` API is more of a functional
interface, I'm experimenting with an idea you could call a 'smart ref'- in
other words, obtaining a ref to this element gives you an object which you can
safely call `show()` on, which makes the appropriate function call based on
the props you give `<dialog />`.

When mounted within a `<window />` element, calling `show()` on this will pop
up a modal dialog _in that window_. Otherwise, it will pop up a modal dialog 
not linked to that window.

### `<menu />`
In progress!

## Examples

Here's a simple 'Hello, world!' app.

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
