
app.controller('ConnexionAdminController', function ($scope, database, $routeParams, $timeout, storage) {

    console.log("Connexion");
    var controller = this;

    controller.login = ""
    controller.password = ""

    controller.connexion = function (email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function (e) {
                    console.log("resultat")
                    console.log(e.user)
                    var utilisateur = {
                        uid: e.user.uid,
                        email: email
                    }
                    firebase.database().ref('enediart/administrateurs/' + utilisateur.uid).once('value').then((snapshot) => {
                        if (snapshot.val()) {
                            console.log('Valeru admin')
                            console.log(snapshot.val())
                            localStorage.setItem("EnediartAdmin", JSON.stringify(utilisateur))
                            window.location.href = "administrateur.html";
                        } else {
                            $('#connexion').prop("disabled", false);
                            $('#connexion').html("Connexion");
                            $("#loaderProd").css("display", "none");
                            $('#indication').html("<b style='color:orangered'>Vous n'avez pas les droits d'administration. Arrêtez ce que vous voulez faire là ! Merci</b>")

                        }
                    }).catch(() => {
                        console.error(error);
                        $('#connexion').prop("disabled", false);
                        $('#connexion').html("Connexion");
                        $("#loaderProd").css("display", "none");
                        $('#indication').html("<b style='color:orangered'>Vous n'avez pas les droits d'administration. Arrêtez ce que vous voulez faire là ! Merci</b>")
                    })

                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.error(error);
                    $('#connexion').prop("disabled", false);
                    $('#connexion').html("Connexion");
                    $("#loaderProd").css("display", "none");
                    $('#indication').html("<b style='color:orangered'>Email ou mot de passe incorrect</b>")
                });
    }

});




