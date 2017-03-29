import React from 'react';
import Ionize from 'ionize';
import { BrowserWindow } from 'electron';

import 'index.html';

function handleReady() {
  console.log("window is ready to show");
}

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

  // componentDidMount() {
  //   this.timer = setTimeout(() => {
  //     this.setState({
  //       posIx: ((this.state.posIx + 1) % 4)
  //     });
  //   }, 1000);
  // }

  // componentDidUpdate() {
  //   this.timer = setTimeout(() => {
  //     this.setState({
  //       posIx: ((this.state.posIx + 1) % 4)
  //     });
  //   }, 1000);
  // }

  render() {
    const { posIx } = this.state;

    return (
      <app>
        <menu>
          <menu label="Electron">
            <item label="A" />
            <item label="B" />
            <item label="C" />
          </menu>
          <menu label="Hello">
            <item label="One" />
            <item label="Two" />
            <item label="Three" />
            <menu label="More menu">
              <item label="Four" />
              <item label="Five" />
              <item label="Six" />
            </menu>
          </menu>
        </menu>
        <window show
          file="index.html"
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
