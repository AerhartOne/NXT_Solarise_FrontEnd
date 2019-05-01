import React from 'react';
import './css/main.css';
import './css/landing-page.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from './pages/landing-page';
import MainDashboard from './pages/main-dashboard';

function App() {
  return (
    <Router>

      <Route exact path="/" component = {props => {return (
          <LandingPage />
      )}}/>

      <Route exact path="/dashboard" component = {props => {return (
          <MainDashboard />
      )}}/>

    </Router>
  );
}

export default App;
