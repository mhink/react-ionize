import React from 'react';
import Ionize from 'react-ionize';
import path from 'path';

import 'index.html';

Ionize.start(
  <window show
    file={path.resolve(__dirname, "index.html")}
    defaultPosition={[500, 500]}
  />
);
