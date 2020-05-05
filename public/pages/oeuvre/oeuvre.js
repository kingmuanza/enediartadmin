app.controller('OeuvreController', function ($scope, $routeParams, $timeout, database) {

    var controller = this;

    controller.prix = function (prix) {
        if (controller.getDevise() == 'euro') {
            return prix / 655.0;
        } else {
            return prix;
        }
    }

    controller.devise = function () {
        if (controller.getDevise() == 'euro') {
            return '€'
        } else {
            return 'FCFA'
        }
    }

    controller.prixEtDevise = function (prix) {
        if (controller.getDevise() == 'euro') {
            return controller.devise() + ' ' + accounting.formatNumber(controller.prix(prix), 2, " ");
        } else {
            return accounting.formatNumber(controller.prix(prix), 0, " ") + ' ' + controller.devise();
        }
    }

    controller.getDevise = function () {
        var devise = localStorage.getItem('EnediartDevise');
        return devise;
    }


    controller.ouvrir = function (oeuvre) {
        window.location.href = '#!/oeuvre/' + oeuvre.id;
    }
    console.log("J'affiche l'id");
    controller.id = $routeParams.id;
    console.log(controller.id);
    controller.oeuvre = {
        id: "",
        nom: "Veuillez patienter...",
        src: "",
        prix: "0",
        artiste: {
            nom: "Veuillez patienter",
            prenom: "",
            pays: "",
            photo: ""
        },
        notation: 0
    };

    controller.setNotation = function (oeuvre) {
        var likes = 0
        var dislikes = 0
        if (oeuvre.likes) {
            likes = oeuvre.likes
        }
        if (oeuvre.dislikes) {
            dislikes = oeuvre.dislikes
        }
        if (likes + dislikes == 0) {
            oeuvre['notation'] = 0
        } else {
            var note = (likes / (likes + dislikes)) * 5;
            oeuvre['notation'] = Math.floor(note)
        }
        return oeuvre
    }
    controller.jaime = function (oeuvre) {

        if (oeuvre.likes) {
            oeuvre.likes = Number(oeuvre.likes) + 1;
        } else {
            oeuvre['likes'] = 1;
        }
        oeuvre = controller.setNotation(oeuvre);
        database.saveDocument('oeuvres', oeuvre).then(() => {
            console.log("Enregistrement du likes : " + oeuvre.likes);
            controller.suivant();
            $scope.$apply();
        });
    }

    controller.oeuvres = [];
    controller.accounting = accounting;

    controller.getOeuvre = function () {
        return firebase.database().ref('enediart/oeuvres/' + controller.id).once('value').then(function (snapshot) {
            if (snapshot !== null && snapshot.val() !== null) {
                controller.oeuvre = snapshot.val();
                $scope.$apply();
                controller.getPanier();
                database.getDocumentById('artistes', controller.oeuvre.artiste.id).then((item) => {
                    console.log("item");
                    console.log(item);
                    if (item !== controller.oeuvre.artiste) {
                        controller.oeuvre.artiste = item;
                        database.saveDocument('oeuvres', controller.oeuvre).then((item) => {
                            console.log("item");
                            console.log(item);
                            $scope.$apply();
                            controller.jaime(controller.oeuvre);
                        });
                    }
                });

            } else {
                controller.oeuvre = {}
            }
            console.log(controller.oeuvre);
        });
    }

    controller.voirArtiste = function (artiste) {
        window.location.href = "#!/artiste/" + artiste.id
    }

    controller.getOeuvre();
    controller.oeuvres = [];
    controller.getOeuvres = function () {
        database.getCollectionLimitTo('oeuvres', 4).then((item) => {
            console.log("item");
            console.log(item);
            controller.oeuvres = item;
            $scope.$apply();
        });
    }
    controller.getOeuvres();

    controller.estPresent = false;
    controller.estPresentDansPanier = function (panier, oeuvre) {
        if (panier) {
            for (var j = 0; j < panier.length; j++) {
                var element = panier[j]
                if (element.id == oeuvre.id) {
                    return true;
                }
            }
        }
        return false;
    }


    // Gestion du panier
    controller.panier = []
    controller.getPanier = function () {
        console.log("Récupération du panier")
        var user = firebase.auth().currentUser;
        if (user) {
            console.log("Utilisateur trouvé")
            firebase.database().ref('enediart/utilisateurs/' + user.uid).once('value').then(function (snapshot) {
                if (snapshot != null && snapshot.val() != null) {
                    var donnees = snapshot.val()
                    console.log(donnees)
                    var panier = donnees.panier;
                    controller.panier = panier;
                    controller.estPresent = controller.estPresentDansPanier(panier, controller.oeuvre)
                    $scope.$apply();
                }
            });
        }
    }
    controller.getPanier();

    controller.ajouterAuPanier = function () {
        if (window.confirm("Etes-vous sûr de vouloir ajouter l'oeuvre '" + controller.oeuvre.nom + "' à votre panier")) {
            controller.ajoutAuPanier();
        }
    }




    //Ajouter l'oeuvre au Panier
    controller.ajoutAuPanier = function () {
        var user = firebase.auth().currentUser;
        if (user) {
            console.log("Utilisateur trouvé")
            firebase.database().ref('enediart/utilisateurs/' + user.uid).once('value').then(function (snapshot) {
                if (snapshot != null && snapshot.val() != null) {

                    var donnees = snapshot.val()
                    console.log(donnees)
                    var panier = donnees.panier;
                    if (panier) {

                    } else {
                        panier = []
                    }
                    var oeuvre = controller.oeuvre
                    oeuvre['date'] = new Date().toISOString();
                    var estPresent = 0;
                    for (var j = 0; j < panier.length; j++) {
                        var element = panier[j]
                        if (element.id == oeuvre.id) {
                            estPresent = 1
                        }
                    }
                    if (estPresent) {
                        alert("L'oeuvre '" + oeuvre.nom + "' est déjà présente dans votre panier");
                    } else {

                        panier.push(oeuvre)
                    }

                    console.log(panier)
                    donnees['panier'] = panier;
                    console.log(donnees)


                    firebase.database().ref('enediart/utilisateurs/' + user.uid).set(donnees);
                    window.location.href = "#!/panier";

                } else {

                }
            });

        } else {
            window.location.href = "connexion.html";
        }
    }

    controller.retirerOeuvre = function () {
        controller.total = 0;
        var user = firebase.auth().currentUser;
        var panier = []
        if (window.confirm("Etes-vous sûr de vouloir retirer l'oeuvre '" + controller.oeuvre.nom + "' du panier")) {
            for (var i = 0; i < controller.panier.length; i++) {
                var o = controller.panier[i];
                if (o.id == controller.oeuvre.id) {

                } else {
                    panier.push(o);
                }
            }
            controller.panier = panier;
            controller.estPresent = false;

            firebase.database().ref('enediart/utilisateurs/' + user.uid + '/panier').set(panier);
            console.log("Element supprimé de liste");
        }

    }


});




