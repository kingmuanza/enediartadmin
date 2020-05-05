app.controller('AccueilController', function ($scope, database, util) {
    
    var controller = this;
    
    controller.artistes = [];
    controller.getArtistes = function () {
        database.getCollectionLimitTo('artistes', 3).then((item) => {
            console.log("item");
            console.log(item);
            controller.artistes = item;
            $scope.$apply();
        });
    }
    controller.getArtistes();    
    controller.ouvrirArtiste = function(artiste){
        window.location.href = '#!/artiste/' + artiste.id;
    }
    
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
    controller.ouvrirOeuvre = function(oeuvre){
        window.location.href = '#!/oeuvre/' + oeuvre.id;
    }
    
    
    controller.expositions = [];
    controller.getExpositions = function () {
        database.getCollectionLimitTo('expositions', 1).then((item) => {
            console.log("item");
            console.log(item);
            controller.expositions = item;
            $scope.$apply();
        });
    }
    controller.getExpositions();    
    controller.ouvrirExposition = function(exposition){
        window.location.href = '#!/exposition/' + exposition.id;
    }
    
});




