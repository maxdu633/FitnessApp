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

    // Créer un objet contenant les données du formulaire
    var formData = {
        username: pseudo,
        email: email,
        password: password
    };

    // Envoyer les données à server.js en utilisant fetch()
    fetch('http://localhost:3000/utilisateurs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Traiter la réponse du serveur
        console.log(data);
        alert("Inscription réussie !");
    })
    .catch(error => {
        // Gérer les erreurs
        console.error('Erreur :', error);
        alert("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
    });

    // Réinitialiser les champs du formulaire
    document.getElementById("inscription-form").reset();
  });