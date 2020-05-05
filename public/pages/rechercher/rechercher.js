console.log(app);

app.controller('RechercherController', function ($scope, database, $routeParams, $timeout, storage) {


    console.log("Contactez nous");
    var controller = this;

    controller.libelle = "";

    controller.oeuvres = [];
    controller.Oeuvres = [];
    controller.getOeuvres = function () {
        database.getCollection('oeuvres').then((item) => {
            console.log("item");
            console.log(item);
            controller.Oeuvres = item;

            $scope.$apply();
        });
    }
    controller.getOeuvres();
    controller.ouvrirOeuvre = function(oeuvre){
        window.location.href = '#!/oeuvre/' + oeuvre.id;
    }
    
    controller.artistes = [];
    controller.Artistes = [];
    controller.getArtistes = function () {
        database.getCollection('artistes').then((item) => {
            console.log("item");
            console.log(item);
            controller.Artistes = item;

            $scope.$apply();
        });
    }
    controller.getArtistes();
    controller.ouvrirArtiste = function(artiste){
        window.location.href = '#!/artiste/' + artiste.id;
    }

    controller.rechercher = function () {
        controller.oeuvres = [];
        for (var i = 0; i < controller.Oeuvres.length; i++) {
            var oeuvre = controller.Oeuvres[i];
            console.log(oeuvre);
            console.log(oeuvre.nom.toLowerCase().indexOf(controller.libelle) === -1);
            console.log(controller.libelle);
            
            if (oeuvre.nom.toLowerCase().indexOf(controller.libelle) === -1) {

            } else {
                controller.oeuvres.push(oeuvre);
            }
        }
        controller.artistes = [];
        for (var i = 0; i < controller.Artistes.length; i++) {
            var artiste = controller.Artistes[i];
            console.log(artiste);
            console.log(artiste.nom.toLowerCase().indexOf(controller.libelle) === -1);
            console.log(controller.libelle);
            
            if (artiste.nom.toLowerCase().indexOf(controller.libelle) === -1) {

            } else {
                controller.artistes.push(artiste);
            }
        }
    }



});




