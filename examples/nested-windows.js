import React from 'react';
import Ionize from 'react-ionize';
import path from 'path';

import 'index.html';

class Windows extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFirstWindow: false,
      showSecondWindow: false
    }
  }

  componentDidMount() {
    // This causes an append of a child that has children of it's own
    setTimeout(() => this.setState(() => ({
      showSecondWindow: true
    })), 5000);

    // This causes an insert of a child
    setTimeout(() => this.setState(() => ({
      showFirstWindow: true
    })), 10000);

    // This causes removal of children
    setTimeout(() => this.setState(() => ({
      showFirstWindow: false,
      showSecondWindow: false
    })), 15000);
  }

  render() {
    return (
      <window
        show
        file={path.resolve(__dirname, "index.html")}
        defaultPosition={[50, 50]}
      >
        {
          this.state.showFirstWindow && (
            <window
              show
              file={path.resolve(__dirname, "index.html")}
              defaultPosition={[100, 100]}
            />
          )
        }
        {
          this.state.showSecondWindow && (
            <window
              show
              file={path.resolve(__dirname, "index.html")}
              defaultPosition={[150, 150]}
            >
              <window
                show
                file={path.resolve(__dirname, "index.html")}
                defaultPosition={[200, 200]}
              />
            </window>
          )
        }
      </window>
    )
  }
}

Ionize.start(
  <Windows />
);
