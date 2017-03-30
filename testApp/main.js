import React from 'react';
import Ionize from 'ionize';
import { BrowserWindow } from 'electron';
import { map, range } from 'lodash';

import 'index.html';

const SIZES = [
  [ 200, 200],
  [ 300, 300],
  [ 400, 400],
  [ 300, 300],
];

const POSITIONS = [
  [ 120, 120],
  [ 120, 200],
  [ 200, 200],
  [ 200, 120],
];

class TestApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posIx: 0
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        posIx: ((this.state.posIx + 1) % 4)
      });
    }, 1000);
  }

  componentDidUpdate() {
    this.timer = setTimeout(() => {
      this.setState({
        posIx: ((this.state.posIx + 1) % 4)
      });
    }, 1000);
  }

  render() {
    const { posIx } = this.state;
    const str = "ABCD";
    const arr = map(range(posIx + 1), i => str[i]);
    console.log(arr);

    return (
      <app>
        <menu>
          <menu label="Electron">
            {map(arr, (el, ix) => (
              <item key={ix} label={el} />
            ))}
          </menu>
        </menu>
        <window show
          file="index.html"
          position={[120, 120]/*POSITIONS[posIx]*/}
          size={[300, 300]/*SIZES[posIx]*/}
        />
      </app>
    );
  }
}

Ionize.start(
  <TestApp />,
  () => {
    console.log("--- Finished Ionize.start()");
  }
);
