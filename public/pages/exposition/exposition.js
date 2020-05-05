/*
 *---------------------- Routage de angular JS ---------------------------------
 */

console.log(app);

app.controller('ExpositionController', function ($scope, $routeParams, $timeout) {

    var expositionList = this;
    
    expositionList.ouvrir = function (exposition) {
        window.location.href = "#!/exposition/" + exposition.id;
    }

    console.log("J'affiche l'id");
    expositionList.id = $routeParams.id;
    console.log(expositionList.id);
    expositionList.exposition = {
        id: "",
        nom: "Veuillez patienter...",
        src: "",
        pays: "veuillez patienter",
        lieu: "veuillez patienter",

        notation: 0
    };

    expositionList.expositions = [];
    expositionList.accounting = accounting;

    expositionList.dateDebut = "yyyy-mm-dd"
    expositionList.dateFin = "yyyy-mm-dd"
    expositionList.getExposition = function () {
        return firebase.database().ref('enediart/expositions/' + expositionList.id).once('value').then(function (snapshot) {
            if (snapshot != null && snapshot.val() != null) {
                expositionList.exposition = snapshot.val();
                var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
                var dateDebut = new Date(expositionList.exposition.dateDebut)
                expositionList.dateDebut = dateDebut.toLocaleDateString('fr-FR', options);
                var dateFin = new Date(expositionList.exposition.dateFin)
                expositionList.dateFin = dateFin.toLocaleDateString('fr-FR', options);
                $('#notation').html(expositionList.afficherLesNotations(expositionList.exposition.notation));
            } else {
                expositionList.exposition = {}
            }
            console.log(expositionList.exposition)
        });
    }

    expositionList.afficherLesNotations = function (notation) {
        var noteHtml = " ";
        var nombreEtoiles = 0;
        var entier = Math.floor(notation);

        for (var compteur_etoile = 0; compteur_etoile < entier; compteur_etoile++) {
            noteHtml = noteHtml + "<i class='fas fa-star'></i>"
            nombreEtoiles++;
        }

        var diff = notation - entier;
        if (diff > 0) {
            noteHtml = noteHtml + "<i class='fas fa-star-half-alt'></i>"
            nombreEtoiles++;
        }
        while (nombreEtoiles < 5) {
            noteHtml = noteHtml + "<i class='far fa-star'></i>"
            nombreEtoiles++;
        }

        return noteHtml;
    }


    expositionList.isInArray = function (value, array) {
        return array.indexOf(value) > -1;
    }

    expositionList.getExpositions = function () {
        var expositions = {}
        var nombre = 0;
        var valeurs = [];
        if (expositionList.expositions.length == 0) {


            return firebase.database().ref('enediart/expositions/').once('value').then(function (snapshot) {
                if (snapshot != null && snapshot.val() != null) {
                    expositions = snapshot.val();
                    expositionList.expositions = []
                    nombre = Object.keys(expositions).length
                    for (var i = 0; i < 4; i++) {
                        var aleatoire = Math.floor(Math.random() * nombre)
                        if (expositionList.isInArray(aleatoire, valeurs)) {

                        } else {
                            var oeu = expositions[Object.keys(expositions)[aleatoire]];
                            expositionList.expositions.push(oeu);
                            valeurs.push(aleatoire);
                        }

                    }
                } else {
                    expositionList.expositions = [];
                }
                console.log(expositionList.expositions)
            });
        }
    }
    expositionList.getExposition();
    expositionList.getExpositions();
    $timeout(expositionList.getExposition, 2000);
    $timeout(expositionList.getExposition, 4000);
    $timeout(expositionList.getExposition, 6000);
    $timeout(expositionList.getExpositions, 2000);
    $timeout(expositionList.getExpositions, 4000);
    $timeout(expositionList.getExpositions, 6000);
});




