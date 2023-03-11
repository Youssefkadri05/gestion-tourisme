import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SortieDetails = () => {
  const { id } = useParams();
  const [sortie, setSortie] = useState(null);

  useEffect(() => {
    const fetchSortie = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/sorties/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSortie(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSortie();
  }, [id]);

  if (!sortie) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Détails de la sortie</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Sortie {sortie.sortie.id}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{sortie.sortie.description}</h6>
        </div>
      </div>
      <h2 className="mt-5">Options</h2>
      {sortie.options.map((option) => (
        <div className="card my-3 card-colorr bg-secondary "  key={option.id}>
          <div className="card-body">
            <h5 className="card-title">Option {option.numero}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{option.dateHeure}</h6>
            <p className="card-text">Lieu: {option.lieu}</p>
            <p className="card-text">{option.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SortieDetails;
