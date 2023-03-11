import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReservationList() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get('/reservations')
      .then(response => setReservations(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Mes Réservations</h2>
      {reservations.map(reservation => (
        <div key={reservation.id}>
          <p>ID de la réservation : {reservation.id}</p>
          <p>Prix : {reservation.prix} €</p>
          <p>Sortie : {reservation.sortie.description}</p>
          <p>Date de la réservation : {reservation.panier.date}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ReservationList;
