import React from 'react';
import { useNavigate } from 'react-router-dom';

function DeconnexionApp() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card">
            <div className="card-header bg-danger text-white text-center">
              <h4>Déconnexion</h4>
            </div>
            <div className="card-body">
              <p>Êtes-vous sûr de vouloir vous déconnecter?</p>
              <button className="btn btn-danger" onClick={handleLogout}>Déconnexion</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeconnexionApp;
