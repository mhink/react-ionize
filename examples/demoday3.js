import React from 'react';
import Ionize from 'react-ionize';
import path from 'path';
import { dialog } from 'electron';

import 'index.html';
const INDEX_HTML = path.resolve(__dirname, 'index.html');

class TestApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moveCount: 0,
      movable: true,
      position: [300, 300],
    };

    this.handleWindowMoved = this.handleWindowMoved.bind(this);
  }

  handleWindowMoved(position) {
    const { moveCount } = this.state;

    if (moveCount >= 3) {
      dialog.showMessageBox({
        message: "Alright, you've moved that window around enough. Cut it out."
      }, () => {});
    }

    this.setState({
      moveCount: (moveCount + 1),
      movable: (moveCount < 3),
      position
    });
  }

  render() {
    const { moveCount, movable, position } = this.state;
    return (
      <app>
        <window show
					file={INDEX_HTML}
          defaultSize={[640, 640]}
          position={position}
          onMoved={movable ? this.handleWindowMoved : null}
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
