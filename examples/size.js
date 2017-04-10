import React from 'react';
import Ionize from 'react-ionize';
import path from 'path';

import 'index.html';

const DefaultSizeApp = () => (
  <window show
    file={path.resolve(__dirname, "index.html")}
    defaultSize={[800, 800]}
  />
);

const FixedSizeApp = () => (
  <window show
    file={path.resolve(__dirname, "index.html")}
    size={[800, 800]}
  />
);

class ResizableApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: [300, 300],
    };
  }

  render() {
    return <window show
      file={path.resolve(__dirname, "index.html")}
      size={this.state.size}
      onResize={size => this.setState({ size })}
    />
  }
}

Ionize.start(
  <ResizableApp />
);
