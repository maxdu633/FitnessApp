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
  });

