import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/reservations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservations(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservations();
  }, []);

  

  const handleConfirmation = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir confirmer ce panier ?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:8000/api/panier/${id}`, { confirmed: true }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        navigate('/mes-reservations');
      } catch (error) {
        console.error(error);
      }
    }
  };
  


    

  const confirmedReservations = reservations.filter((r) => r.panier.confirme);
  const unconfirmedReservations = reservations.filter((r) => !r.panier.confirme);

  return (
    <div className="container">
      <h1>Liste des réservations</h1>
      <div className="row">
        <div className="col">
          <h2>Réservations confirmées</h2>
          <div className="card-group">
            {confirmedReservations.map((reservation) => (
              <div key={reservation.id} className="card">
                <div className="card-body bg-success">
                  <h5 className="card-title">Réservation {reservation.id}</h5>
                  <p className="card-text">Prix: {reservation.prix} €</p>
                  <p className="card-text">Date: {reservation.panier.date}</p>
                  <p className="card-text">Description: {reservation.sortie.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col">
          <h2>Panier non confirmées</h2>
          <div className="card-group">
            {unconfirmedReservations.map((reservation) => (
              <div key={reservation.id} className="card">
                <div className="card-body bg-warning">
                  <h5 className="card-title">Réservation {reservation.id}</h5>
                  <p className="card-text">Prix: {reservation.prix} €</p>
                  <p className="card-text">Date: {reservation.panier.date}</p>
                  <p className="card-text">Description: {reservation.sortie.description}</p>
                  <button className="btn btn-primary" onClick={() => handleConfirmation(reservation.panier.id)}>Confirmer</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
