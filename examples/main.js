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
      bounce: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        bounce: true,
      });
    }, 3000);

    setTimeout(() => {
      this.setState({
        bounce: false,
      });
    }, 6000);
  }

  render() {
    return <app>
      <dock badge="Hey" bouncing={this.state.bounce ? 'critical' : false} />
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
