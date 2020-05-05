console.log(app);

app.controller('PanierController', function ($scope, $routeParams, $interval) {

    var controller = this;
    controller.backgroundImage =""

    var user = firebase.auth().currentUser;
    console.log("PANIER CONTROLLER")
    console.log(user);

    controller.format = function (prix) {
        return accounting.formatNumber(prix, 0, " ")
    }

    controller.goToOeuvre = function (data) {
        window.location.href = "#!oeuvres/view/" + data.id;
    }
    controller.goToArtiste = function (data) {
        window.location.href = "#!artistes/view/" + data.artiste.id;
    }

    controller.supprimerOeuvre = function (oeuvre) {
        controller.total=0;
        var user = firebase.auth().currentUser;
        var panier = []
        if (window.confirm("Etes-vous sûr de vouloir supprimer l'oeuvre '" + oeuvre.nom + "' du panier")) {
            for (var i = 0; i < controller.panier.length; i++) {
                var o = controller.panier[i];
                var oeu = angular.toJson(o);
                console.log("oeu")
                console.log(oeu)
                var oeuvr = angular.fromJson(oeu)
                console.log("oeuvr")
                console.log(oeuvr)
                if (oeuvr.id == oeuvre.id) {

                }else{
                    panier.push(oeuvr);
                    controller.total += Number(oeuvr.prix)
                }
            }
            controller.panier = panier
            firebase.database().ref('enediart/utilisateurs/' + user.uid + '/panier').set(panier);
            console.log("Element supprimer de liste");
        }

    }

    controller.panier = []
    controller.total = 0;
    controller.taxe = 0.1925;

    controller.getPanier = function () {
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
                    controller.panier = panier

                    for (var i = 0; i < controller.panier.length; i++) {
                        var oeuvre = controller.panier[i]
                        controller.backgroundImage=oeuvre.src
                        controller.total += Number(oeuvre.prix)
                    }

                } else {

                }
            });

        } else {
            window.location.href = "connexion.html";
        }
    }



    var checkPanier = $interval(function () {
        console.log("recherche de nouveaux Panier " + controller.panier.length)
        if (controller.panier.length == 0) {
            console.log("recherche de nouveaux panier")
            controller.getPanier();
        } else {

            console.log("totale : " + controller.total)
            $interval.cancel(checkPanier);
        }
    }, 2000);
    
    
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


})





