import React, { useState, useEffect } from 'react';
import './App.css';

function FitnessJournal() {
  //React hooks
  const [activities, setActivities] = useState([]);
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState(''); //For GoalName
  const [activityName, setActivityName] = useState(''); //For ActivityName

  //Get UserID
  const searchParams = new URLSearchParams(window.location.search);
  const UserId = searchParams.get('UserID');

  //FetchActivities & FetchGoals at load
  useEffect(() => {
      fetchActivities(UserId);
      fetchGoals(UserId);
  }, []);

  const fetchActivities = (UserId) => {
    fetch(`http://localhost:3000/activites/${UserId}`)
      .then((response) => response.json())
      .then((data) => {
        setActivities(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des activités :", error)
      );
  };

  const addActivity = (event) => { // ajout d'une activité via POST
    event.preventDefault(); // Empêcher le rechargement de la page
    event.target.reset();
    fetch(`http://localhost:3000/activites/${UserId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({activityName}),
    })
      .then((response) => response.json())
      .then((data) => {
        setActivities([...activities, data]);
      })
      .catch((error) => console.error('Erreur lors de l\'ajout de l\'activité :', error));
  };

  const setGoal = (event) => { //setup objectif
    event.preventDefault();
    event.target.reset();

    fetch(`http://localhost:3000/objectifs/${UserId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({goalName})
    })
      .then((response) => response.json())
      .then((data) => {
        setGoals([...goals, data]);
      })
      .catch((error) => console.error('Erreur lors de la définition de l\'objectif:', error));
  };

  const fetchGoals = () => {
    fetch(`http://localhost:3000/objectifs/${UserId}`)
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
        <form onSubmit={addActivity} className="activity">
          <input 
            type="text" 
            name="activityName" 
            placeholder="Nom de l'activité" 
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
          />
          <button type="submit" className="add-activity-btn">Ajouter</button>
        </form>
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
        <form onSubmit={setGoal} className="set-goal-form">
        <input 
          type="text" 
          name="goalName" 
          placeholder="Nom de l'objectif" 
          value={goalName} 
          onChange={(e) => setGoalName(e.target.value)} 
        />
          <button type="submit" className="add-goal-btn">Définir</button>
        </form>
      </div>
    </div>
  );
}

export default FitnessJournal;