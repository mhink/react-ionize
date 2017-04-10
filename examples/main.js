import React from 'react';
import Ionize from 'react-ionize';
import path from 'path';

import 'index.html';

class ExampleApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      size: [300, 300],
      position: [100, 100],
    };
  }

  render() {
    return <app>
      <menu>
        <submenu label="Electron">
          <about />
          <sep />
          <quit />
        </submenu>
        <submenu label="Custom Menu">
          <item label="Foo the bars" />
          <sep />
          <item label="Baz the quuxes" />
        </submenu>
      </menu>
      <window
        file={path.resolve(__dirname, "index.html")}
        show={this.state.show}
        size={this.state.size}
        position={this.state.position}
        onReadyToShow={() => this.setState({ show: true })}
        onResize={size => this.setState({ size })}
        onMoved={position => this.setState({ position })}
      />
    </app>
  }
}

Ionize.start(
  <ExampleApp />
);
