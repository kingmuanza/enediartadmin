app.controller('MenuController', function ($scope) {

    var controller = this;

    controller.isAdmin = false;
    controller.noUser = true;
    controller.devise = "XAF"

    controller.user = firebase.auth().currentUser;
    console.log(controller.user);

    controller.getUtilisateurOnFirebase = function (user) {
        firebase.database().ref('enediart/utilisateurs/' + user.uid).once('value').then((snapshot) => {
            var utilisateur = snapshot.val();
            controller.utilisateur = utilisateur;
            $scope.$apply();
            console.log(controller.utilisateur);
            if (controller.utilisateur) {
                controller.noUser = false;
                $scope.$apply();
            } else {
                var donnees = {
                    displayName: controller.user.email,
                    email: controller.user.email,
                    tel: " ",
                    devise: "XAF"

                }
                firebase.database().ref('enediart/utilisateurs/' + user.uid).set(donnees).then(() => {
                    console.log("Utilisateur enregistré");
                    $scope.$apply();
                })
            }
        })

    }

    controller.checkIfIsAdmin = function (user) {
        firebase.database().ref('enediart/administrateurs/' + user.uid).once('value').then((snapshot) => {
            if (snapshot.val()) {

                var isAdmin = snapshot.val();
                console.log("isAdmin")
                console.log(isAdmin)
                controller.isAdmin = true
                $scope.$apply();
            }
        })
    }


    var utilisateur = localStorage.getItem("EnediartUtilisateur")
    if (utilisateur) {
        controller.utilisateur = JSON.parse(utilisateur)
        controller.noUser = false;
        controller.getUtilisateurOnFirebase(controller.utilisateur)
    }
    var admin = localStorage.getItem("EnediartAdmin");
    if(admin){
        controller.noUser = false;
        controller.utilisateur = JSON.parse(admin)
        controller.checkIfIsAdmin(controller.utilisateur)
    }



    controller.deconnexion = function () {
        firebase.auth().signOut().then(function () {
            console.log("Déconnexion !")
            controller.utilisateur = null
            controller.noUser = true;
            controller.user = null
            localStorage.removeItem("EnediartUtilisateur")
            localStorage.removeItem("EnediartAdmin");
            window.location.href = "index.html";
        }, function (error) {
            console.log(error);
        });
    }
    
    
    controller.setDevise = function(devise) {
        localStorage.setItem('EnediartDevise', devise);
        window.location.reload();
    }
    
    controller.getDevise = function() {
        var devise = localStorage.getItem('EnediartDevise');
        return devise;
    }


})







