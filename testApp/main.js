import React from 'react';
import Ionize from '../lib/IonizeFiber';
import { BrowserWindow } from 'electron';

function handleReady() {
  console.log("window is ready to show");
}

class TestApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleAppReady = this.handleAppReady.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state = {
      isWindowReady: false,
      isWindowClosing: false,
    };
  }

  handleAppReady() {
    setTimeout(() => {
      this._appDialog.show();
    }, 500);
  }

  handleShow() {
    setTimeout(() => {
      this._windowDialog.show();
    }, 1000);
  }

  render() {
    const {
      isWindowReady,
      isWindowClosing,
    } = this.state;

    return (
      <app onReady={this.handleAppReady}>
        <dialog ref={c => { this._appDialog = c }} />
        <window
          file='index.html'
          onReadyToShow={() => this.setState({ isWindowReady: true })}
          onClose={() => this.setState({ isWindowClosing: true })}
          show={isWindowReady}
          onShow={this.handleShow}
        >
          <dialog ref={c => { this._windowDialog = c }} />
        </window>
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
