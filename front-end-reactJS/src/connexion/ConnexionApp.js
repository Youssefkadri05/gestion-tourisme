import React, { useState } from 'react';
import axios from 'axios';

function ConnexionApp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', { username, password });
      localStorage.setItem('token', response.data.token);

      // Vérifier le token JWT
      const config = {
        headers: { Authorization: `Bearer ${response.data.token}` }
      };
      const verifyResponse = await axios.get('http://localhost:8000/api/protected', config);
      console.log(verifyResponse.data);

      // Afficher un message de succès
      alert("Bienvenue !");
    } catch (error) {
      // Afficher un message d'erreur
      alert("Username ou mot de passe est incorrect!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username:</label>
        <input type="text" className="form-control" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input type="password" className="form-control" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
}

export default ConnexionApp;
