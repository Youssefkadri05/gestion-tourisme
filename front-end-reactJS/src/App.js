import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import ConnexionApp from './connexion/ConnexionApp.js';
import HomeApp from './HomeApp.js';
import AboutApp from './AboutApp.js';
import HomeUtilisateur from './utilisateur/HomeUtilisateur';
import HomeAdmin from './admin/HomeAdmin';
import DeconnexionApp from './deconnexion/DeconnexionApp';
import jwt_decode from 'jwt-decode';

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
        {localStorage.getItem('token') && jwt_decode(localStorage.getItem('token')).admin === 1 &&
        <>
          <Link className="nav-link" to="/compte">Compte</Link >
          <Link className="nav-link" to="/sorties">Sorties</Link >
        </>
        }
        {localStorage.getItem('token') &&
        <Link className="nav-link" to="/deconnexion">Déconnexion</Link >
        }
        {!localStorage.getItem('token') &&
        <Link className="nav-link" to="/connexion">Connexion</Link >
        }

      </div>
    </div>
  </div>
</nav>

        <Routes>
          <Route exact path="/" element={<HomeApp />} />
          <Route path="/About" element={<AboutApp />} />
          <Route path="/homeutilisateur" element={<HomeUtilisateur />} />
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/connexion" element={<ConnexionApp />} />
          <Route path="/deconnexion" element={<DeconnexionApp />} />
        </Routes>

      </Router>

    );
  }
}

export default App;