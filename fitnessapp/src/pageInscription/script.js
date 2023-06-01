document.getElementById("inscription-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Récupérer les valeurs des champs
    var pseudo = document.getElementById("pseudo").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
  
    // Effectuer la validation des données ici
  
    // Afficher les valeurs dans la console à des fins de démonstration
    console.log("Pseudo:", pseudo);
    console.log("Adresse email:", email);
    console.log("Mot de passe:", password);
    console.log("Confirmation du mot de passe:", confirmPassword);
  
    // Réinitialiser les champs du formulaire
    document.getElementById("inscription-form").reset();
  });