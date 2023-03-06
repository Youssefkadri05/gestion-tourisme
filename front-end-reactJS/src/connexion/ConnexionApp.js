import React, { Component } from 'react';

class ConnexionApp extends Component {
  render() {
    return (
      <div className="container mt-5">
        <h2>Authentification</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Adresse email</label>
            <input type="email" className="form-control" id="email" placeholder="Entrer l'email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" className="form-control" id="password" placeholder="Entrer le mot de passe" />
          </div>
          <button type="submit" className="btn btn-primary">Connexion</button>
        </form>
      </div>
    );
  }
}

export default ConnexionApp;
