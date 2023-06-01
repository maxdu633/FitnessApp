const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const cors = require('cors');

// Créer une instance de l'application Express
const app = express();
app.use(express.json());
app.use(cors());

// Connexion à la base de données MongoDB
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useUnifiedTopology: true });

client.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MongoDB');

  const db = client.db('votre_base_de_donnees');

  // Routes pour la collection Utilisateur
  app.post('/utilisateurs', (req, res) => {
    const utilisateur = req.body;
    db.collection('utilisateurs').insertOne(utilisateur, (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(201).json(result.ops[0]);
      }
    });
  });

  app.get('/utilisateurs/:id', (req, res) => {
    const id = new ObjectID(req.params.id);
    db.collection('utilisateurs').findOne({ _id: id }, (err, utilisateur) => {
      if (err) {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
      } else {
        res.json(utilisateur);
      }
    });
  });

  app.delete('/utilisateurs/:id', (req, res) => {
    const id = new ObjectID(req.params.id);
    db.collection('utilisateurs').deleteOne({ _id: id }, (err) => {
      if (err) {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
      } else {
        res.json({ message: 'Utilisateur supprimé' });
      }
    });
  });

  app.put('/utilisateurs/:id', (req, res) => {
    const id = new ObjectID(req.params.id);
    const utilisateur = req.body;
    db.collection('utilisateurs').updateOne({ _id: id }, { $set: utilisateur }, (err) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        db.collection('utilisateurs').findOne({ _id: id }, (err, updatedUtilisateur) => {
          if (err) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
          } else {
            res.json(updatedUtilisateur);
          }
        });
      }
    });
  });

  app.get('/utilisateurs', (req, res) => {
    db.collection('utilisateurs').find().toArray((err, utilisateurs) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json(utilisateurs);
      }
    });
  });

  // Routes pour la collection Activite
  app.post('/activites', (req, res) => {
    const activite = req.body;
    db.collection('activites').insertOne(activite, (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(201).json(result.ops[0]);
      }
    });
  });

  app.get('/activites/:id', (req, res) => {
    const id = new ObjectID(req.params.id);
    db.collection('activites').findOne({ _id: id }, (err, activite) => {
      if (err) {
        res.status(404).json({ message: 'Activité non trouvée' });
      } else {
        res.json(activite);
      }
    });
  });

  app.delete('/activites/:id', (req, res) => {
    const id = new ObjectID(req.params.id);
    db.collection('activites').deleteOne({ _id: id }, (err) => {
      if (err) {
        res.status(404).json({ message: 'Activité non trouvée' });
      } else {
        res.json({ message: 'Activité supprimée' });
      }
    });
  });

  app.put('/activites/:id', (req, res) => {
    const id = new ObjectID(req.params.id);
    const activite = req.body;
    db.collection('activites').updateOne({ _id: id }, { $set: activite }, (err) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        db.collection('activites').findOne({ _id: id }, (err, updatedActivite) => {
          if (err) {
            res.status(404).json({ message: 'Activité non trouvée' });
          } else {
            res.json(updatedActivite);
          }
        });
      }
    });
  });

  app.get('/activites', (req, res) => {
    db.collection('activites').find().toArray((err, activites) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json(activites);
      }
    });
  });

  // Routes pour la collection Objectif
  app.post('/objectifs', (req, res) => {
    const objectif = req.body;
    db.collection('objectifs').insertOne(objectif, (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(201).json(result.ops[0]);
      }
    });
  });

  app.get('/objectifs/:id', (req, res) => {
    const id = new ObjectID(req.params.id);
    db.collection('objectifs').findOne({ _id: id }, (err, objectif) => {
      if (err) {
        res.status(404).json({ message: 'Objectif non trouvé' });
      } else {
        res.json(objectif);
      }
    });
  });

  app.delete('/objectifs/:id', (req, res) => {
    const id = new ObjectID(req.params.id);
    db.collection('objectifs').deleteOne({ _id: id }, (err) => {
      if (err) {
        res.status(404).json({ message: 'Objectif non trouvé' });
      } else {
        res.json({ message: 'Objectif supprimé' });
      }
    });
  });

  app.put('/objectifs/:id', (req, res) => {
    const id = new ObjectID(req.params.id);
    const objectif = req.body;
    db.collection('objectifs').updateOne({ _id: id }, { $set: objectif }, (err) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        db.collection('objectifs').findOne({ _id: id }, (err, updatedObjectif) => {
          if (err) {
            res.status(404).json({ message: 'Objectif non trouvé' });
          } else {
            res.json(updatedObjectif);
          }
        });
      }
    });
  });

  app.get('/objectifs', (req, res) => {
    db.collection('objectifs').find().toArray((err, objectifs) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json(objectifs);
      }
    });
  });

  // Démarrer le serveur
  app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
  });
});