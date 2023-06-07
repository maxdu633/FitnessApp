import React, { useState, useEffect } from 'react';
import './App.css';

function FitnessJournal() {
  const [activities, setActivities] = useState([]);
  const [progress, setProgress] = useState(0);
  const [goals, setGoals] = useState([]);
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    fetchActivities();
    fetchStatistics();
    fetchGoals();
  }, []);

  const fetchActivities = (userId) => {
    fetch(`http://localhost:3000/activites/${userId}`)
      .then((response) => response.json())
      .then((data) => setActivities(data))
      .catch((error) => console.error('Erreur lors de la récupération des activités :', error));
  };

  const addActivity = (activity, userId) => {
    fetch(`http://localhost:3000/activites/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activity),
    })
      .then((response) => response.json())
      .then((data) => {
        // Mettre à jour le state avec la nouvelle activité ajoutée
        setActivities([...activities, data]);
      })
      .catch((error) => console.error('Erreur lors de l\'ajout de l\'activité :', error));
  };

  const updateProgress = (value, userId, id) => {
    fetch(`http://localhost:3000/objectifs/${userId}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ progress: value })
    })
      .then((response) => response.json())
      .then((data) => setProgress(data.progress))
      .catch((error) => console.error('Erreur lors de la mise à jour de la progression:', error));
  };

  const setGoal = (event, userId) => {
    event.preventDefault();
    const newGoal = {
      name: event.target.elements.goalName.value
    };

    fetch(`http://localhost:3000/objectifs/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGoal)
    })
      .then((response) => response.json())
      .then((data) => {
        setGoals([...goals, data]);
        event.target.reset();
      })
      .catch((error) => console.error('Erreur lors de la définition de l\'objectif:', error));
  };

  const fetchGoals = (userId, id) => {
    fetch(`http://localhost:3000/objectifs/${userId}/${id}`)
      .then((response) => response.json())
      .then((data) => setGoals(data))
      .catch((error) => console.error('Erreur lors de la récupération des objectifs :', error));
  };

  //const fetchStatistics = (userId) => {
    //fetch(`http://localhost:3000/utilisateurs/${userId}`)
      //.then((response) => response.json())
      //.then((data) => setStatistics(data.statistics))
      //.catch((error) => console.error('Erreur lors de la récupération des statistiques:', error));
  //};

  return (
    <div className="fitness-journal-container">
      <h1>Journal de fitness</h1>
      
      <div className="activities-section">
        <h2>Activités</h2>
        <ul>
          {activities.map((activity) => (
            <li key={activity._id}>{activity.name}</li>
          ))}
        </ul>
      </div>
      
      <div className="add-activity-section">
        <h2>Ajouter une activité</h2>
        <form onSubmit={addActivity}>
          <input type="text" name="activityName" placeholder="Nom de l'activité" />
          <button type="submit">Ajouter</button>
        </form>
      </div>
      
      <div className="progress-section">
        <h2>Progression</h2>
        <p>Votre progression : {progress}%</p>
        <button onClick={() => updateProgress(progress + 10)}>+10%</button>
      </div>
      
      <div className="goals-section">
        <h2>Objectifs</h2>
        <ul>
          {goals.map((goal) => (
            <li key={goal._id}>{goal.name}</li>
          ))}
        </ul>
      </div>
      
      <div className="set-goal-section">
        <h2>Définir un nouvel objectif</h2>
        <form onSubmit={setGoal}>
          <input type="text" name="goalName" placeholder="Nom de l'objectif" />
          <button type="submit">Définir</button>
        </form>
      </div>
      
      <div className="statistics-section">
        <h2>Statistiques</h2>
        <p>Nombre d'activités enregistrées : {statistics.numActivities}</p>
        <p>Nombre d'objectifs définis : {statistics.numGoals}</p>
      </div>
    </div>
  );
}

export default FitnessJournal;