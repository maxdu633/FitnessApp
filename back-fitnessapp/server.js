const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Créer une instance de l'application Express
const app = express();
app.use(express.json());
app.use(cors());

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/votre_base_de_donnees', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connecté à la base de données MongoDB');
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit(1);
  });

// Schéma et modèle pour la collection Utilisateur
const utilisateurSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

// Routes pour la collection Utilisateur
app.post('/utilisateurs', (req, res) => {
  const utilisateur = new Utilisateur(req.body);
  utilisateur.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.get('/utilisateurs/:id', (req, res) => {
  const id = req.params.id;
  Utilisateur.findById(id)
    .then((utilisateur) => {
      if (utilisateur) {
        res.json(utilisateur);
      } else {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.delete('/utilisateurs/:id', (req, res) => {
  const id = req.params.id;
  Utilisateur.findByIdAndDelete(id)
    .then((utilisateur) => {
      if (utilisateur) {
        res.json({ message: 'Utilisateur supprimé' });
      } else {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.put('/utilisateurs/:id', (req, res) => {
  const id = req.params.id;
  const utilisateur = req.body;
  Utilisateur.findByIdAndUpdate(id, utilisateur, { new: true })
    .then((updatedUtilisateur) => {
      if (updatedUtilisateur) {
        res.json(updatedUtilisateur);
      } else {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.get('/utilisateurs', (req, res) => {
  Utilisateur.find()
    .then((utilisateurs) => {
      res.json(utilisateurs);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// Schéma et modèle pour la collection Activite
const activiteSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  userID: {
    type: Number,
    required: true,
  },
});

const Activite = mongoose.model('Activite', activiteSchema);

// Routes pour la collection Activite
app.post('/activites/:id', (req, res) => {
  const activite = new Activite(req.body);
  activite.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.get('/activites/:id', (req, res) => {
  const id = req.params.id;
  Activite.findById(id)
    .then((activite) => {
      if (activite) {
        res.json(activite);
      } else {
        res.status(404).json({ message: 'Activité non trouvée' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.delete('/activites/:id', (req, res) => {
  const id = req.params.id;
  Activite.findByIdAndDelete(id)
    .then((activite) => {
      if (activite) {
        res.json({ message: 'Activité supprimée' });
      } else {
        res.status(404).json({ message: 'Activité non trouvée' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.put('/activites/:id', (req, res) => {
  const id = req.params.id;
  const activite = req.body;
  Activite.findByIdAndUpdate(id, activite, { new: true })
    .then((updatedActivite) => {
      if (updatedActivite) {
        res.json(updatedActivite);
      } else {
        res.status(404).json({ message: 'Activité non trouvée' });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.get('/activites', (req, res) => {
  Activite.find()
    .then((activites) => {
      res.json(activites);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// Schéma et modèle pour la collection Objectif
const objectifSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  userID: {
    type: Number,
    required: true,
  },
});

const Objectif = mongoose.model('Objectif', objectifSchema);

// Routes pour la collection Objectif
app.post('/objectifs/:id', (req, res) => {
  const objectif = new Objectif(req.body);
  objectif.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.get('/objectifs/:id', (req, res) => {
  const id = req.params.id;
  Objectif.findById(id)
    .then((objectif) => {
      if (objectif) {
        res.json(objectif);
      } else {
        res.status(404).json({ message: 'Objectif non trouvé' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.delete('/objectifs/:id', (req, res) => {
  const id = req.params.id;
  Objectif.findByIdAndDelete(id)
    .then((objectif) => {
      if (objectif) {
        res.json({ message: 'Objectif supprimé' });
      } else {
        res.status(404).json({ message: 'Objectif non trouvé' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.put('/objectifs/:id', (req, res) => {
  const id = req.params.id;
  const objectif = req.body;
  Objectif.findByIdAndUpdate(id, objectif, { new: true })
    .then((updatedObjectif) => {
      if (updatedObjectif) {
        res.json(updatedObjectif);
      } else {
        res.status(404).json({ message: 'Objectif non trouvé' });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.get('/objectifs', (req, res) => {
  Objectif.find()
    .then((objectifs) => {
      res.json(objectifs);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});