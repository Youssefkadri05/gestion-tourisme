import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import ConnexionApp from './connexion/ConnexionApp.js';
import HomeApp from './HomeApp.js';
import AboutApp from './AboutApp.js';

class App extends React.Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/" >Navbar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">

                <Link className="nav-link" to="/">Home</Link >
                <Link className="nav-link" to="/About">About</Link >
                <Link className="nav-link" to="/connexion">Connexion</Link >



              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route exact path="/" element={<HomeApp />} />
          <Route path="/About" element={<AboutApp />} />
          <Route path="/connexion" element={<ConnexionApp />} />
        </Routes>

      </Router>

    );
  }
}

export default App;