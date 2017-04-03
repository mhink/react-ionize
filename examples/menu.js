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
      <submenu label="Custom Menu">
        <item label="Foo the bars" />
        <item label="Baz the quuxes" />
        <sep />
        <togglefullscreen />
      </submenu>
    </menu>
    <window show
      file={path.resolve(__dirname, "index.html")}
      position={[120, 120]}
      size={[300, 300]}
    />
  </app>
);
