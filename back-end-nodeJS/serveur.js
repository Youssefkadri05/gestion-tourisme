const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());



app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Effectuer un appel HTTP à l'API pour récupérer les informations de compte
  axios.get(`http://localhost:8080/comptes/email/${username}`)
    .then(response => {
      const compte = response.data;
      
      // Vérifier si le mot de passe est correct
      if (password === compte.motdepasse) {
        // Générer un JWT en incluant l'information "admin"
        const payload = {
          username,
          admin: compte.admin
        };
        const token = jwt.sign(payload, 'secret_key');
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(401).json({ message: 'Invalid credentials' });
    });
});


app.get('/api/protected', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'secret_key');
    res.json({ message: `Welcome ${decoded.username}!` });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.listen(8000, () => {
  console.log('Server started on port 8000');
});
