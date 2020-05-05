/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
app.controller('IndexController', function ($scope) {

    var controller = this;

    controller.isAdmin = false
    controller.noUser = true
    controller.devise = "XAF"

    controller.user = firebase.auth().currentUser;
    console.log(controller.user);

    controller.getUtilisateurOnFirebase = function (user) {
        firebase.database().ref('enediart/utilisateurs/' + user.uid).once('value').then((snapshot) => {
            var utilisateur = snapshot.val();
            controller.utilisateur = utilisateur;
            console.log(controller.utilisateur);
            if (controller.utilisateur) {

            } else {
                var donnees = {
                    displayName: controller.user.email,
                    email: controller.user.email,
                    tel: " ",
                    devise: "XAF"

                }
                firebase.database().ref('enediart/utilisateurs/' + user.uid).set(donnees).then(() => {
                    console.log("Utilisateur enregistré")
                })
            }
        })

    }

    controller.checkIfIsAdmin = function (user) {
        firebase.database().ref('enediart/administrateurs/' + user.uid).once('value').then((snapshot) => {
            var isAdmin = snapshot.val();
            console.log("isAdmin")
            console.log(isAdmin)
            controller.isAdmin = true

        })
    }


    var utilisateur = localStorage.getItem("EnediartUtilisateur")
    if (utilisateur) {
        controller.utilisateur = JSON.parse(utilisateur)
        controller.noUser = false
        controller.getUtilisateurOnFirebase(controller.utilisateur)
        controller.checkIfIsAdmin(controller.utilisateur)
    }


    
    controller.deconnexion = function () {
        firebase.auth().signOut().then(function () {
            console.log("Déconnexion !")
            controller.utilisateur = null
            controller.noUser = true;
            controller.user = null
            localStorage.removeItem("EnediartUtilisateur")
            window.location.href = "connexion.html";
        }, function (error) {
            console.log(error);
        });
    }


})







