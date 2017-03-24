import React from 'react';
import Ionize from '../lib/IonizeFiber';
import { map } from 'lodash';

const FooBar = ({ children }) => {
  return <text>{ children }</text>
};

class IonizeApp extends React.Component {
  componentDidMount() {
    console.log("IT'S WORKING!");
    console.log(this._app);
  }

  render() {
    return (
      <app ref={c => { this._app = c; }} />
    );
  }
}

Ionize.start(
  <IonizeApp />,
  () => {
    console.log("--- Finished Ionize.start()");
  }
);
