import React, { useState, useEffect } from 'react';
import './App.css';

function FitnessJournal() {
  const [activities, setActivities] = useState([]);
  const [progress, setProgress] = useState(0);
  const [goals, setGoals] = useState([]);
  //const [statistics, setStatistics] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchActivities();
    //fetchStatistics();
    fetchGoals();
  }, []);

  const fetchUserInfo = (userId) => {
    fetch(`http://localhost:3000/utilisateurs/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error));
  };

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

  const logout = () => {
    fetch('http://localhost:3000/logout', {
      method: 'POST'
    })
      .then(() => setUser(null))
      .catch((error) => console.error('Erreur lors de la déconnexion:', error));
  };

  const login = () => {
    // Implémentez ici la logique de connexion
    // par exemple, affichez une fenêtre modale de connexion
  };

  return (
    <div className="fitness-journal-container">
      <h1>Journal de fitness</h1>
      
      <div className="user-info">
        {user ? (
          <div>
            <p>Connecté en tant que: {user.username}</p>
            <button onClick={logout}>Se déconnecter</button>
          </div>
        ) : (
          <div>
            <p>Non connecté.</p>
            <button onClick={login}>Se connecter</button>
          </div>
        )}
      </div>
      
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
        <form onSubmit={addActivity} class="activity">
          <input type="text" name="activityName" placeholder="Nom de l'activité" />
          <button type="submit" class="add-activity-btn">Ajouter</button>
        </form>
      </div>
      
      <div className="progress-section">
        <h2>Progression</h2>
        <p>Votre progression : {progress}%</p>
        <button onClick={() => updateProgress(progress + 10)} class="add-progress-btn">+10%</button>
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
        <form onSubmit={setGoal} class="set-goal-form">
          <input type="text" name="goalName" placeholder="Nom de l'objectif" />
          <button type="submit" class="add-goal-btn">Définir</button>
        </form>
      </div>
      
       {/* <div className="statistics-section">
        <h2>Statistiques</h2>
        <p>Nombre d'activités enregistrées : {statistics.numActivities}</p>
        <p>Nombre d'objectifs définis : {statistics.numGoals}</p>
      </div> */}
    </div>
  );
}

export default FitnessJournal;