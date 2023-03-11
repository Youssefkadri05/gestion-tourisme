import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AjoutCompte = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [motdepasse, setPassword] = useState('');
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8000/api/comptes',
        { nom, prenom, email, motdepasse, admin: admin ? 1 : 0},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/comptes');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Ajouter un compte</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            className="form-control"
            id="nom"
            required
            value={nom}
            onChange={(event) => setNom(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="prenom">Prénom</label>
          <input
            type="text"
            className="form-control"
            id="prenom"
            required
            value={prenom}
            onChange={(event) => setPrenom(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="motdepasse"
            required
            value={motdepasse}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="admin"
            checked={admin}
            onChange={() => setAdmin(!admin)}
          />
          <label className="form-check-label" htmlFor="admin">
            Admin
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AjoutCompte;
