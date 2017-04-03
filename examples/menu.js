import React from 'react';
import Ionize from 'react-ionize';
import path from 'path';

import 'index.html';

Ionize.start(
  <app>
    <menu>
      <submenu label="Electron">
        <about />
        <sep />
        <hide />
        <hideothers />
        <unhide />
        <sep />
        <quit />
      </submenu>
      <submenu label="Edit">
        <undo />
        <redo />
        <sep />
        <cut />
        <copy />
        <paste />
        <selectall />
      </submenu>
      <submenu label="View">
        <reload />
        <forcereload />
        <toggledevtools />
        <sep />
        <resetzoom />
        <zoomin />
        <zoomout />
        <sep />
        <togglefullscreen />
      </submenu>
    </menu>
    <window show
      file={path.resolve(__dirname, "index.html")}
      position={[120, 120]}
      size={[300, 300]}
    />
  </app>,
  () => console.log("Finished Ionize.start()")
);
