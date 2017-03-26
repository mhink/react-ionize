import React from 'react';
import Ionize from '../lib/IonizeFiber';
import { map } from 'lodash';

const handleReady = (e) => {
  console.log("App is ready!");
  console.log(e.sender.isReady());
};

const handleQuit = () => {
  console.log("Goodbye!");
};

class Bar extends React.Component {
  componentWillUnmount() {
    console.log("Bar.componentWillUnmount()");
  }

  render() {
    return <foo />
  }
}

class TestApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on: true,
    };
  }

  componentDidMount() {
    console.log("TestApp.componentDidMount");
    setTimeout(() => {
      console.log("TestApp.componentDidMount, timeout");
      this.setState({ on: false });
    }, 1000);
  }

  render() {
    return <app onReady={handleReady}>
      <foo />
      { this.state.on &&
        <Bar />
      }
    </app>
  }
}

Ionize.start(
  <TestApp />,
  () => {
    console.log("--- Finished Ionize.start()");
  }
);
