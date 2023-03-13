import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ConnexionApp from './connexion/ConnexionApp.js';
import HomeApp from './HomeApp.js';
import AboutApp from './AboutApp.js';
import HomeUtilisateur from './utilisateur/HomeUtilisateur';
import HomeAdmin from './admin/HomeAdmin';
import DeconnexionApp from './deconnexion/DeconnexionApp';
import CompteList from './compte/CompteListe';
import ModifierCompte from './compte/ModifierCompte';
import AjoutCompte from './compte/AjoutCompte';
import SortieListe from './sortie/SortieListe';
import SortieDetails from './sortie/SortieDetails';
import AjouterSortie from './sortie/AjouterSortie';

import ReservationList from './reservation/ReservationList';
import UsrSortieDetails from './reservation/UsrSortieDetails';

import AjoutCommentaire from './commentaire/AjoutCommentaire';



import jwt_decode from 'jwt-decode';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      const isAdmin = decodedToken.admin === 1;
      setLoggedIn(true);
      setIsAdmin(isAdmin);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">

              <Link className="nav-link" to="/">Home</Link >
              <Link className="nav-link" to="/About">About</Link >
              {loggedIn && isAdmin &&
                <>
                  <Link className="nav-link" to="/comptes">Comptes</Link >
                  <Link className="nav-link" to="/sorties">Sorties</Link >
                </>
              }
              {loggedIn && !isAdmin &&
                <>
                  <Link className="nav-link" to="/sorties">Sorties</Link >
                  <Link className="nav-link" to="/mes-reservations">Mes réservations</Link >
                </>
              }
              {loggedIn &&
                <Link className="nav-link" to="/deconnexion" onClick={handleLogout}>Déconnexion</Link >
              }
              {!loggedIn &&
                <Link className="nav-link" to="/connexion">Connexion</Link >
              }

            </div>
          </div>
        </div>
      </nav>

      <Routes>
        {/* Définition des routes pour le navbar */}
        <Route exact path="/" element={<HomeApp />} />
        <Route path="/About" element={<AboutApp />} />
        <Route path="/homeutilisateur" element={<HomeUtilisateur />} />
        <Route path="/admin" element={<HomeAdmin />} />

        {/* Définition des routes pour la gestion des comptes */}
        <Route path="/comptes" element={<CompteList />} />
        <Route path="/modifier-compte/:id" element={<ModifierCompte />} />
        <Route path="/ajouter-compte" element={<AjoutCompte />} />

        {/* Définition des routes pour la gestion des sorties */}
        <Route path="/sorties" element={<SortieListe />} />
        <Route path="/modifier-sorti/:id" element={<ModifierCompte />} />
        <Route path="/details/sortie/:id" element={<SortieDetails />} />
        <Route path="/details/sortie/:id" element={<SortieDetails />} />
        <Route path="/usr/details/sortie/:id" element={<UsrSortieDetails />} />
        <Route path="/ajouter-sortie" element={<AjouterSortie />} />
        
        {/* Définition des routes pour l'ahtentification */}
        <Route path="/connexion" element={<ConnexionApp setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin} />} />
        <Route path="/deconnexion" element={<DeconnexionApp />} />

        {/* Définition des routes pour la gestion des reservations */}
        <Route path="/mes-reservations" element={<ReservationList  />} />

        {/* Définition des routes pour la gestion des commentaires */}
        <Route path="/ajouter-commentaire/:idUser/:idSortie" element={<AjoutCommentaire />} />
        
      </Routes>

    </Router>
  );
}

export default App;
