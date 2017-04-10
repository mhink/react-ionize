import React from 'react';
import Ionize from 'react-ionize';
import path from 'path';

import 'index.html';

const DefaultPositionApp = () => (
  <window show
    file={path.resolve(__dirname, "index.html")}
    defaultPosition={[100, 100]}
  />
);

const FixedPositionApp = () => (
  <window show
    file={path.resolve(__dirname, "index.html")}
    position={[200, 200]}
  />
);

class MovableApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [300, 300],
    };
  }

  render() {
    return <window show
      file={path.resolve(__dirname, "index.html")}
      position={this.state.position}
      onMove={position => this.setState({ position })}
    />
  }
}

Ionize.start(<MovableApp />);
