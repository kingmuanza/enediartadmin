console.log(app);

app.controller('ArtisteEditionController', function ($scope, $routeParams, $timeout) {

    var controller = this;

    controller.id = $routeParams.id;

    controller.artiste = {
        id: 0,
        nom: "",
        prenom: "",
        photo: "",
        pays: "",
        notation: 0
    }

    controller.getArtiste = function () {
        return firebase.database().ref('enediart/artistes/' + controller.id).once('value').then(function (snapshot) {
            if (snapshot != null && snapshot.val() != null) {
                controller.artiste = snapshot.val();
            } else {
                controller.artiste = {}
            }
            console.log(controller.artiste)
        });
    }
    
    controller.init = function(){
        controller.getArtiste();
    }
    
    controller.init();

});




