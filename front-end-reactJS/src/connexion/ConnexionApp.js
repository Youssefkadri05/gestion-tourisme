import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function ConnexionApp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      const decodedToken = jwt_decode(response.data.token);

      if (decodedToken.admin === 1) {
        navigate('/admin');
      } else {
        navigate('/homeutilisateur');
      }
    } catch (error) {
      setError('Username ou mot de passe incorrect');
    }
  };

  return (
    <div className="container mt-5">
      {isAuthenticated ? (
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card">
              <div className="card-header bg-primary text-white text-center">
                <h4>Vous êtes connecté!</h4>
              </div>
              <div className="card-body">
                <button type="button" className="btn btn-primary" onClick={handleLogout}>
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card">
              <div className="card-header bg-primary text-white text-center">
                <h4>Connexion</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <button type="submit" className="btn btn-primary">
                    Connexion
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConnexionApp;
