import React from 'react';
import Ionize from 'react-ionize';
import path from 'path';

import 'index.html';
const INDEX_HTML = path.resolve(__dirname, 'index.html');

Ionize.start(
  <window show file={INDEX_HTML} />
);
