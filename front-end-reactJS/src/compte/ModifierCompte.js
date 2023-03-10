import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ModifierCompte = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [compte, setCompte] = useState({
    nom: '',
    prenom: '',
    email: '',
    motdepasse: '',
    admin: false,
  });

  useEffect(() => {
    const fetchCompte = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/comptes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompte(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompte();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCompte({ ...compte, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/comptes/${id}`, compte, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/comptes');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Modifier le compte {compte.nom} {compte.prenom}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            className="form-control"
            id="nom"
            name="nom"
            value={compte.nom}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="prenom">Prénom</label>
          <input
            type="text"
            className="form-control"
            id="prenom"
            name="prenom"
            value={compte.prenom}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={compte.email}
            onChange={handleInputChange}
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="motdepasse">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="motdepasse"
            name="motdepasse"
            value={compte.motdepasse}
            onChange={handleInputChange}
          />
          
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="admin"
            name="admin"
            checked={compte.admin}
            onChange={handleInputChange}
          />
          <label htmlFor="admin" className="form-check-label">Administrateur</label>
        </div>
        <button type="submit" className="btn btn-primary">Modifier</button>
      </form>
    </div>
  );
};

export default ModifierCompte;
