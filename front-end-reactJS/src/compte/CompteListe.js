import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompteList = () => {
  const [comptes, setComptes] = useState([]);

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

  return (
    <div className="container">
      <h1>Liste des comptes</h1>
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
                <button className="btn btn-primary">Modifier</button>
                <button className="btn btn-danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompteList;
