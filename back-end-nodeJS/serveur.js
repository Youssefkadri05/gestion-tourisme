const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());


//--------------------------------------------------------------- Connexion --------------------------------------------------
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

//--------------------------------------------------------------------------Gestion des Compted --------------------------------------------
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
// Route pour ajouter un nouveau compte
app.post('/api/comptes', verifyToken, async (req, res) => {
  try {
    const { nom, prenom, email, motdepasse, admin } = req.body;
    const response = await axios.post('http://localhost:8080/comptes', { nom, prenom, email, motdepasse, admin });
    const compte = response.data;
    res.json(compte);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l\'ajout du compte');
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



//--------------------------------------------------------------------------Gestion des Sorties --------------------------------------------

// Route pour récupérer la liste des sorties
app.get('/api/sorties', verifyToken, async (req, res) => {
  try {
    const response = await axios.get('http://localhost:8080/sorties');
    const sorties = response.data.map(({ id, description }) => ({ id, description }));
    res.json(sorties);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des sorties');
  }
});


// Route pour récupérer la sortie et ses options
app.get('/api/sorties/:id', verifyToken, async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:8080/sorties/${req.params.id}`);
    const sortie = { id: response.data.id, description: response.data.description };
    const optionsResponse = await axios.get(`http://localhost:8080/sorties/${req.params.id}/options`);
    const options = optionsResponse.data.map(({ id, dateHeure, lieu, description }) => ({
      id,
      dateHeure,
      lieu,
      description,
    }));
    const result = { sortie, options };
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des données de sortie et d\'options');
  }
});

// Route pour ajouter une nouvelle sortie
app.post('/api/sorties', verifyToken, async (req, res) => {
  try {
    const { description } = req.body;
    const response = await axios.post('http://localhost:8080/sorties', {description });
    const sortie = response.data;
    res.json(sortie);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l\'ajout de la sorties');
  }
});

// Route pour supprimer une sortie par son id
app.delete('/api/sorties/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    await axios.delete(`http://localhost:8080/sorties/${id}`);
    res.json({ message: `sortie ${id} supprimée` });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la suppression de la sortie');
  }
});


app.listen(8000, () => {
  console.log('Server started on port 8000');
});
