console.log(app);

app.controller('PanierController', function ($scope, $routeParams, $interval) {

    var panierList = this;
    panierList.backgroundImage =""

    var user = firebase.auth().currentUser;
    console.log("PANIER CONTROLLER")
    console.log(user);

    panierList.format = function (prix) {
        return accounting.formatNumber(prix, 0, " ")
    }

    panierList.goToOeuvre = function (data) {
        window.location.href = "#!oeuvre/" + data.id;
    }
    panierList.goToArtiste = function (data) {
        window.location.href = "#!artiste/" + data.artiste.id;
    }

    panierList.supprimerOeuvre = function (oeuvre) {
        panierList.total=0;
        var user = firebase.auth().currentUser;
        var panier = []
        if (window.confirm("Etes-vous sûr de vouloir supprimer l'oeuvre '" + oeuvre.nom + "' du panier")) {
            for (var i = 0; i < panierList.panier.length; i++) {
                var o = panierList.panier[i];
                var oeu = angular.toJson(o);
                console.log("oeu")
                console.log(oeu)
                var oeuvr = angular.fromJson(oeu)
                console.log("oeuvr")
                console.log(oeuvr)
                if (oeuvr.id == oeuvre.id) {

                }else{
                    panier.push(oeuvr);
                    panierList.total += Number(oeuvr.prix)
                }
            }
            panierList.panier = panier
            firebase.database().ref('enediart/utilisateurs/' + user.uid + '/panier').set(panier);
            console.log("Element supprimer de liste");
        }

    }

    panierList.panier = []
    panierList.total = 0;
    panierList.taxe = 0.1925;

    panierList.getPanier = function () {
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
                    panierList.panier = panier

                    for (var i = 0; i < panierList.panier.length; i++) {
                        var oeuvre = panierList.panier[i]
                        panierList.backgroundImage=oeuvre.src
                        panierList.total += Number(oeuvre.prix)
                    }

                } else {

                }
            });

        } else {
            window.location.href = "connexion.html";
        }
    }



    var checkPanier = $interval(function () {
        console.log("recherche de nouveaux Panier " + panierList.panier.length)
        if (panierList.panier.length == 0) {
            console.log("recherche de nouveaux panier")
            panierList.getPanier();
        } else {

            console.log("totale : " + panierList.total)
            $interval.cancel(checkPanier);
        }
    }, 2000);

})





