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
  })
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB :', error);
  });

function generateRandomNumber(min, max) { // fonction pour générer ID
  return Math.floor(Math.random() * (max - min) + min);
}

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
  },
  id:{
    type: Number,
    required: true,
    min: 1,
    max: 10000000
  }
});

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

// Routes pour la collection Utilisateur
app.post('/utilisateurs', (req, res) => { // Route page inscription
  req.body.id = generateRandomNumber(1, 10000000);
  const utilisateur = new Utilisateur(req.body);
  console.log('New User ! ');
  console.log('Utilisateur:', utilisateur.username);
  console.log('Email:', utilisateur.email);
  console.log('Mot de passe:', utilisateur.password);
  console.log("ID : ", utilisateur.id)
  utilisateur.save()
    .then((result) => {
      res.status(201).json({id: utilisateur.id}); // on retourne l'ID pour qu'il sois stocké en local
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

app.post('/identification', (req, res) => {
  const { username, password } = req.body;
  console.log('IDENTIFICATION');
  console.log("username : ", username);
  console.log("password : ", password);
  
  Utilisateur.findOne({ username }) // Recherche de l'utilisateur par nom d'utilisateur
    .then((utilisateur) => {
      if (utilisateur) {
        // Comparaison des mots de passe hashés
        if (utilisateur.password === password) {
          console.log("user et mdp OK");
          res.status(201).json({ success: true, id: utilisateur.id }); // Identification réussie
        } else {
          res.status(401).json({ message: 'Mot de passe incorrect' });
        }
      } else {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.get('/utilisateurs/:id', (req, res) => {
  const id = req.params.id;
  console.log('GET USER', UserID);
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
  console.log('DELETE USER', UserID);
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
  console.log('PUT USER', UserID);
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
  const utilisateurs = Utilisateur.find()
  console.log("GET ALL USERS")
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
  console.log('POST ACT', UserID);
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
  console.log('GET ACT', UserID);
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
  console.log('DELETE ACT', UserID);
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
  console.log('PUT ACT', UserID);
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
  console.log('GET ALL ACT', UserID);

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
  console.log('NEW OBJ', UserID);
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
  console.log('GET OBJ', UserID);
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
  console.log('DELETE OBJ', UserID);
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
  console.log('PUT OBJ', UserID);
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
  console.log('GET ALL OBJ', UserID);

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