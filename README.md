# react-ionize
[Electron](https://electron.atom.io) applications consist of two types of process: a *main process* which manages the lifecycle of the application, and several *renderer processes*, which display webpages which comprise the application's GUI. It's fairly common to use React and ReactDOM to build a GUI in the renderer process.

react-ionize is a library which lets you use the same React component-based architechure to manage the lifecycle of your application in the Electron main process. It is essentially a replacement for ReactDOM- but instead of flushing component updates to a DOM, it flushes them out to Electron's API. Think React Native for Electron apps.

![react-ionize demo](https://cloud.githubusercontent.com/assets/780461/24886483/b5f61e70-1e09-11e7-8e44-9179a5dc8ab7.gif)

## Caveat Developer
react-ionize is still an EXPERIMENTAL, PRE-ALPHA library, and is not yet
suitable for for use in a production app! It's a custom renderer built on top
of the React Fiber reconciliation API, which itself is still under active
development. (Not to mention, I've got a whole crop of Electron features yet
to add.)

## Getting Started

```
* npm install --save electron
* npm install --save react@16.0.0-alpha.5
* npm install --save react-ionize
```

Take a look at [Ionize Example App](https://github.com/mhink/ionize-example-app) to get started.

## Hello, world!

```
const React = require('react');
const Ionize = require('react-ionize');
const path = require('path');
const fs = require('fs');

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

(Normally, you'd build and distribute an `index.html` along with your JS during your build process, but I wanted this example to be as independent of build processes as possible.)

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
  * onReady- Fired immediately when the component is mounted. Under the hood, Ionize actually waits for 'ready' before even trying to start mounting everything, but this is here for the sake of API compatibility.

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
    
* onReadyToShow
  * Called when the window's `ready-to-show` event is triggered. You can use this to keep the window hidden until it's ready.

* showDevTools
  * If this is true when the element is mounted, Ionize will open
    the Chrome Developer Tools when opening the browser window.

* size
  * This is a controlled prop, and behaves much like an `<input>` element in traditional React apps. That is to say, if you provide `size` by itself, the user will not be able to resize the window- it will simply *be* that size, unless you provide an `onResize` handler to update the value provided.
  * See also: https://facebook.github.io/react/docs/forms.html#controlled-components

* onResize
  * This event handler is called with the new window size when the window size changes. If provided in conjunction with the `size` prop, it will allow the window to be resized (although you will need to update the value of the `size` prop accordingly). 
  
* defaultSize
  * If you don't care about tracking the window's size manually, you may provide a `defaultSize` prop to set the window to an initial size when it's mounted.

* position
* onMove
* onMoved
* defaultPosition
  * These props work pretty much the same as `size`, `onResize`, and `defaultSize`, except they represent the position on the screen.
  * Keep in mind that these values might be funky if you're dealing with multiple monitors.

### `<menu>`
The `<menu>` element defines an Electron application menu. By nesting `<submenu>`s inside it, you can construct your menu.

TODO: When nested inside a `<window>` element, this should attach the menu to
that window, specifically- and I'd like to have something like a `<contextmenu>`
element for right-clicks.

### `<submenu>`
* label
  * The label of the submenu. (Keep in mind that on OSX, the first submenu in the list will take the application's name, no matter what label you might give it.)
* children
  * `<submenu>` and `<item>` elements only!

### `<item>` and related
Pretty much equivalent to `new MenuItem({ type: 'normal' })` in vanilla Electron.

* label
  * The text shown for this menu item
  
* onClick
  * An onclick handler for this menu item.
  
There are a couple special-case elements related to `<item>`.

#### `<sep>`
A *separator* menu item. Equivalent to `new MenuItem({ type: 'separator' })` in vanilla Electron.

#### Role-based elements
In the Electron API, you can create MenuItems with a "role", which assigns them some OS-native functionality (think copy, paste, select all, and so on.) As a shorthand, you can use these directly as an element name within a `<submenu>`. For instance,

```
<pasteandmatchstyle />
```

is equivalent to 

`new MenuItem({ role: 'pasteandmatchstyle' })` in vanilla Electron.

## Feedback and Contributions
Feedback is welcome! Add an issue or hit me up on [Twitter](https://twitter.com/mhink1103). I'm still working out how all this should work, but I would love to hear your suggestions.

If you'd like to contribute, right now we could really use some more feature implementations. Basically, what I've been doing is picking Electron APIs and figuring out how to turn them into either elements or props on existing elements. For instance, the [`app.setBadge(text)`](https://electron.atom.io/docs/api/app/#appdocksetbadgetext-macos) API call would make for a pretty good prop on `<app />`.

To assist the would-be contributor, I've included a bunch of documentation and notes about React Fiber in the comments of [`IonizeHostConfig.js`](https://github.com/mhink/react-ionize/blob/master/src/IonizeHostConfig.js). For further reading, I'd basically recommend cloning down the React repo and digging through its `/src/renderers` directory, starting with `/src/renderers/shared/fiber/ReactFiberReconciler.js` and going from there.
