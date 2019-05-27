import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

render(
  <div className="App container col-8 col-lg-12 col-xl-10 mt-2 mb-2">
    <Router>
      <Routes />
    </Router>
  </div>,
  document.getElementById('root')
);
registerServiceWorker();
