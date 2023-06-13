import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';

function FitnessJournal() {
  const [activities, setActivities] = useState([]);
  const [progress, setProgress] = useState(0);
  const [goals, setGoals] = useState([]);
  //const [statistics, setStatistics] = useState([]);
  const [user, setUser] = useState(null);

  const UserId = localStorage.getItem('userId'); //UserId stocké dans le localStorage suite à la connexion
  const history = useHistory(); // Utilitaire de redirection

  useEffect(() => {
    // Vérifier la présence de l'ID utilisateur
    if (!UserId) {
      // Rediriger l'utilisateur vers l'URL d'identification
      history.push('/identification');
    } else {
      fetchActivities(UserId);
      fetchGoals(UserId);
    }
  }, [UserId, history]);

  const fetchActivities = (userId) => { // Récupération des activités
    fetch(`http://localhost:3000/activites/${userId}`)
      .then((response) => response.json())
      .then((data) => setActivities(data))
      .catch((error) => console.error('Erreur lors de la récupération des activités :', error));
  };

  const addActivity = (event, userId) => { // ajout d'une activité via POST
    fetch(`http://localhost:3000/activites/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ activityName: event.target.activityName.value }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Mettre à jour le state avec la nouvelle activité ajoutée
        setActivities([...activities, data]);
      })
      .catch((error) => console.error('Erreur lors de l\'ajout de l\'activité :', error));
  };

  const updateProgress = (value, id, userId) => { //update progrès sur un objectif
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

  const setGoal = (event, userId) => { //setup objectif
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

  const fetchGoals = (userId) => { // Récupération de tout les objectifs
    fetch(`http://localhost:3000/objectifs/${userId}`)
      .then((response) => response.json())
      .then((data) => setGoals(data))
      .catch((error) => console.error('Erreur lors de la récupération des objectifs :', error));
  };

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
        <form onSubmit={(event) => addActivity(event, UserId)} class="activity">
          <input type="text" name="activityName" placeholder="Nom de l'activité" />
          <button type="submit" class="add-activity-btn">Ajouter</button>
        </form>
      </div>
      
      <div className="progress-section">
        <h2>Progression</h2>
        <p>Votre progression : {progress}%</p>
        <button onClick={(event) => updateProgress(event, UserId)} class="add-progress-btn">+10%</button>
      </div>
      
      <div className="goals-section">
        <h2>Objectifs</h2>
          {goals.length > 0 ? (
            <ul>
              {goals.map((goal) => (
                <li key={goal._id}>{goal.name}</li>
              ))}
            </ul>
          ) : (
          <p>Aucun objectif défini pour le moment.</p>
          )}
        </div>
      
      <div className="set-goal-section">
        <h2>Définir un nouvel objectif</h2>
        <form onSubmit={(event) => setGoal(event, UserId)} class="set-goal-form">
          <input type="text" name="goalName" placeholder="Nom de l'objectif" />
          <button type="submit" class="add-goal-btn">Définir</button>
        </form>
      </div>
    </div>
  );
}

export default FitnessJournal;