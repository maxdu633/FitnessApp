const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Créer une instance de l'application Express
const app = express();
app.use(express.json());
app.use(cors());

// Configuration de la connexion à MongoDB avec Mongoose
const uri = 'mongodb+srv://balnye2204087:s4mopblMAAWt5HG7@fitnessapp.tt2jusi.mongodb.net/fitnessApp?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connecté à la base de données MongoDB');

    // Votre code ici
  })
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB :', error);
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
  const utilisateur = new Utilisateur(JSON.parse(req.body));
  console.log('New User ! ');
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
  console.log('GET USER');
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
  console.log('DELETE USER');
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
  console.log('PUT USER');
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
app.post('/activites/:UserID', (req, res) => {
  const UserID = req.params.UserID;
  const activite = new Activite(req.body);
  console.log('POST ACT');
  activite.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.get('/activites/:UserID/:id', (req, res) => {
  const UserID = req.params.UserID;
  const id = req.params.id;
  console.log('GET ACT');
  Activite.findOne({ UserID: UserID, id: id })
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

app.delete('/activites/:UserID/:id', (req, res) => {
  const UserID = req.params.UserID;
  const id = req.params.id;
  console.log('DELETE ACT');
  Activite.findOneAndDelete({ UserID: UserID, id: id })
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

app.put('/activites/:UserID/:id', (req, res) => {
  const UserID = req.params.UserID;
  const id = req.params.id;
  const activite = req.body;
  console.log('PUT ACT');
  Activite.findOneAndUpdate({ UserID: UserID, id: id }, activite, { new: true })
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

app.get('/activites/:UserID', (req, res) => {
  const UserID = req.query.UserID;
  console.log('GET ALL ACT');

  const query = {};

  if (UserID) {
    query.UserID = UserID;
  }

  Activite.find(query)
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
app.post('/objectifs/:UserID', (req, res) => {
  const UserID = req.params.UserID;
  const objectif = new Objectif(req.body);
  console.log('NEW OBJ');
  objectif.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.get('/objectifs/:UserID/:id', (req, res) => {
  const UserID = req.params.UserID;
  const id = req.params.id;
  console.log('GET OBJ');
  Objectif.findOne({ UserID: UserID, id: id })
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

app.delete('/objectifs/:UserID/:id', (req, res) => {
  const UserID = req.params.UserID;
  const id = req.params.id;
  console.log('DELETE OBJ');
  Objectif.findOneAndDelete({ UserID: UserID, id: id })
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

app.put('/objectifs/:UserID/:id', (req, res) => {
  const UserID = req.params.UserID;
  const id = req.params.id;
  const objectif = req.body;
  console.log('PUT OBJ');
  Objectif.findOneAndUpdate({ UserID: UserID, id: id }, objectif, { new: true })
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

app.get('/objectifs/:UserID', (req, res) => {
  const UserID = req.query.UserID;
  console.log('GET ALL OBJ');

  const query = {};

  if (UserID) {
    query.UserID = UserID;
  }

  Objectif.find(query)
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