import React from 'react';
import './css/main.css';
import './css/landing-page.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from './pages/landing-page';

function App() {
  return (
    <Router>

      <Route path="/" component = {props => {return (
          <LandingPage />
      )}}/>

    </Router>
  );
}

export default App;
