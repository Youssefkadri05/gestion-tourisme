import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompteList = () => {
  const [comptes, setComptes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComptes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/comptes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComptes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComptes();
  }, []);

  const handleModifierClick = (id) => {
    navigate(`/modifier-compte/${id}`);
  };

  const handleSupprimerClick = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8000/api/comptes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComptes(comptes.filter((compte) => compte.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAjouterClick = () => {
    navigate('/ajouter-compte');
  };

  return (
    <div className="container">
      <h1>Liste des comptes</h1>
      <button className="btn btn-success" onClick={handleAjouterClick}>
        Ajouter compte
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {comptes.map((compte) => (
            <tr key={compte.id}>
              <td>{compte.id}</td>
              <td>{compte.nom}</td>
              <td>{compte.prenom}</td>
              <td>{compte.email}</td>
              <td>{compte.admin}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleModifierClick(compte.id)}>Modifier</button>
                <button className="btn btn-danger" onClick={() => handleSupprimerClick(compte.id)}>
                  Supprimer
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompteList;
