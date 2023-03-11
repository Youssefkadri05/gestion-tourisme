import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SortieList = () => {
  const [sortis, setSorties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSorties = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/sorties', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSorties(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSorties();
  }, []);

  const handleModifierClick = (id) => {
    navigate(`/modifier-sorti/${id}`);
  };

  const handleSupprimerClick = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce sortie ?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8000/api/sorties/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSorties(sortis.filter((sorti) => sorti.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAjouterClick = () => {
    navigate('/ajouter-sortie');
  };
  const handleDetailsClick = (id) => {
    navigate(`/details/sortie/${id}`);
  };
  

  return (
    <div className="container">
      <h1>Liste des sorties</h1>
      <button className="btn btn-success" onClick={handleAjouterClick}>
        Ajouter sortie
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {sortis.map((sorti) => (
            <tr key={sorti.id}>
            <td>{sorti.id}</td>
            <td>{sorti.description}</td>
            <td>
              <button className="btn btn-primary" onClick={() => handleModifierClick(sorti.id)}>Modifier</button>
              <button className="btn btn-danger" onClick={() => handleSupprimerClick(sorti.id)}>Supprimer</button>
              <button className="btn btn-info" onClick={() => handleDetailsClick(sorti.id)}>Détails</button>
            </td>
          </tr>
          
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortieList;
