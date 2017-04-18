import React from 'react';
import Ionize from 'react-ionize';
import path from 'path';
import { dialog } from 'electron';

import 'index.html';
const INDEX_HTML = path.resolve(__dirname, 'index.html');

Ionize.start(
  <app>
    <window show file={INDEX_HTML} />
    <menu>
      <submenu label="Electron">
        <about />
        <sep />
        <quit />
      </submenu>
      <submenu label="Custom Menu">
        <item
          label="Show a dialog"
          onClick={() => {
            dialog.showMessageBox({
              title: 'Hi there!',
              message: 'This is an example message box'
            })
          }}
        />
      </submenu>
    </menu>
  </app>
);
