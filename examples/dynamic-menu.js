import React from 'react';
import Ionize from 'react-ionize';
import path from 'path';

import 'index.html';

const LABELS = [
  'Hello!',
  'World!',
  'Foo the bars!',
  'Baz the quuxes!',
  'Something else, I guess'
];

class ExampleApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };
  }

  render() {
    const { counter } = this.state;
    const customLabel = LABELS[counter % 5];

    return (
      <app>
        <menu>
          <submenu label="Electron">
            <about />
            <sep />
            <quit />
          </submenu>
          <submenu label="Custom Menu">
            <item
              label={customLabel}
              onClick={() => this.setState({ counter: counter+1 })}
            />
          </submenu>
        </menu>
        <window show
          file={path.resolve(__dirname, "index.html")}
          position={[120, 120]}
          size={[300, 300]}
        />
      </app>
    );
  }
}

Ionize.start(
  <ExampleApp />
);
