import React from 'react';
import Ionize from '../lib/IonizeFiber';
import { BrowserWindow } from 'electron';

function handleReady() {
  console.log("window is ready to show");
}

class TestApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleReadyToShow = this.handleReadyToShow.bind(this);
    this.handleMainWindowClosing = this.handleMainWindowClosing.bind(this);

    this.state = {
      isWindowReady: false,
      isWindowClosing: false,
    };
  }

  handleMainWindowClosing(e) {
    this.setState({
      isClosing: true,
    });
  }

  handleReadyToShow(e) {
    this.setState({
      mainWindowReady: true,
    });
  }

  render() {
    const {
      isWindowReady,
      isWindowClosing,
    } = this.state;

    return (
      <app>

        <window
          file='index.html'
          onReadyToShow={() => this.setState({ isWindowReady: true })}
          onClose={() => this.setState({ isWindowClosing: true })}
          show={isWindowReady}
        />

        <dialog
          show={isWindowClosing}
          message="Goodbye!"
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
