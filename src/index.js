import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import moon from './assets/images/moon.png';
import './index.css';

render(
  <div className="App container">
    <div className="columns">
      <div className="column col-6 col-lg-8 col-md-10 col-sm-12 col-mx-auto mt-2">
        <div className="navbar mt-2">
          <div className="navbar-section" />
          <div className="navbar-center">
            <img src={moon} className="logo" alt="moon-logo" />
            <h1 className="pt-2">&nbsp;Moon</h1>
          </div>
          <div className="navbar-section" />
        </div>
        <div className="column col-10 col-lg-12 col-mx-auto mt-2">
          <Router>
            <Routes />
          </Router>
        </div>
      </div>
    </div>
  </div>,
  document.getElementById('root')
);
registerServiceWorker();
