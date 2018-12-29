import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import Routes from './components/routes';
import history from './components/history';

class App extends Component {
  render() {
    return(
      <React.Fragment>
        <Router history={history}>
          <React.Fragment>
            <Routes/>
          </React.Fragment>
        </Router>
      </React.Fragment>
    )
  }
}

export default App;