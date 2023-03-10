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

// Middleware pour vérifier le token
function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'secret_key');
    if (decoded.admin === 1) {
      req.user = decoded;
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}


app.get('/api/protected', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'secret_key');
    res.json({ message: `Welcome ${decoded.username}!` });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Route pour récupérer la liste des comptes
app.get('/api/comptes', verifyToken, async (req, res) => {
  try {
    const response = await axios.get('http://localhost:8080/comptes');
    const comptes = response.data.map(({ id, email, nom, prenom, admin }) => ({ id, email, nom, prenom, admin }));
    res.json(comptes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des comptes');
  }
});

// Route pour récupérer un seul compte par son id
app.get('/api/comptes/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`http://localhost:8080/comptes/${id}`);
    const compte = response.data;
    res.json(compte);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération du compte');
  }
});

// Route pour mettre à jour un compte par son id
app.put('/api/comptes/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const { nom, prenom, email,motdepasse, admin } = req.body;
    const response = await axios.put(`http://localhost:8080/comptes/${id}`, { nom, prenom, email, motdepasse, admin });
    const compte = response.data;
    res.json(compte);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la mise à jour du compte');
  }
});

// Route pour supprimer un compte par son id
app.delete('/api/comptes/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    await axios.delete(`http://localhost:8080/comptes/${id}`);
    res.json({ message: `Compte ${id} supprimé` });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la suppression du compte');
  }
});





app.listen(8000, () => {
  console.log('Server started on port 8000');
});
