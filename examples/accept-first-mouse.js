import React from 'react';
import Ionize from 'react-ionize';
import path from 'path';

import 'index.html';

Ionize.start(
  <window show
          acceptFirstMouse
          file={path.resolve(__dirname, "index.html")}
          position={[200, 200]}
  />
);
