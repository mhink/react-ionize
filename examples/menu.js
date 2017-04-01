import React from 'react';
import Ionize from 'react-ionize';
import { BrowserWindow } from 'electron';
import { map, range } from 'lodash';

import 'index.html';

Ionize.start(
  <app>
    <menu>
      <menu label="Electron">
        <about />
        <sep />
        <hide />
        <hideothers />
        <unhide />
        <sep />
        <quit />
      </menu>
      <menu label="Edit">
        <undo />
        <redo />
        <sep />
        <cut />
        <copy />
        <paste />
        <selectall />
      </menu>
      <menu label="View">
        <reload />
        <forcereload />
        <toggledevtools />
        <sep />
        <resetzoom />
        <zoomin />
        <zoomout />
        <sep />
        <togglefullscreen />
      </menu>
    </menu>
    <window show
      file="index.html"
      position={[120, 120]}
      size={[300, 300]}
    />
  </app>,
  () => console.log("Finished Ionize.start()")
);
