// Fonction pour envoyer les données de connexion au serveur
function submitForm(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  // Récupérer les valeurs des champs email et mot de passe
  var username = document.querySelector('input[name="username"]').value;
  var password = document.querySelector('input[name="password"]').value;

  // Envoyer les données au serveur
  fetch('http://localhost:3000/identification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username, password: password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.id) {
      // Connexion réussie, rediriger vers la page du compte
      window.location.href = 'http://localhost:3001/';
    } else {
      // Afficher un message d'erreur
      var errorElement = document.getElementById('error-message');
      errorElement.textContent = data.message;
      errorElement.style.display = 'block';
    }
  })
  .catch(error => {
    console.error('Erreur:', error);
  });
}

// Écouter l'événement de soumission du formulaire
var form = document.getElementById('connexion-form');
if (form) {
  form.addEventListener('submit', submitForm);
} else {
  console.error('Erreur: Impossible de trouver l\'élément avec l\'ID "connexion-form".');
}