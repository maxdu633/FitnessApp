document.getElementById("inscription-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Récupérer les valeurs des champs
  var pseudo = document.getElementById("pseudo").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    // Les mots de passe ne correspondent pas
    alert("Le mot de passe de confirmation ne correspond pas au mot de passe saisi. Veuillez réessayer.");
    return; // Arrêter l'exécution de la fonction
  }

  // Réinitialiser les champs du formulaire
  document.getElementById("inscription-form").reset();

  // Envoyer les données au serveur via la route de création d'utilisateur
  fetch('http://localhost:3000/utilisateurs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: pseudo,
      email: email,
      password: password
    })
  })
  .then(response => {
    if (response.ok) {
      // L'utilisateur a été créé avec succès
      alert("Inscription réussie !");
    } else {
      // Une erreur s'est produite lors de la création de l'utilisateur
      alert("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
    }
  })
  .catch(error => {
    // Une erreur s'est produite lors de la communication avec le serveur
    alert("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
    console.error(error);
  });
});