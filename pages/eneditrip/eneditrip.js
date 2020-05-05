app.controller('EneditripController', function ($scope, $routeParams, $interval, database) {

    var controller = this;

    controller.ouvrir = function (oeuvre) {
        window.location.href = "#!/oeuvre/" + oeuvre.id;
    }
    
    controller.oeuvres = [];
    controller.accounting = accounting;

    
    controller.isInArray = function (value, array) {
        return array.indexOf(value) > -1;
    }

    controller.getOeuvres = function () {
        var oeuvres = {}
        var nombre = 0;
        var valeurs = [];
        if (controller.oeuvres.length == 0) {

            return firebase.database().ref('enediart/oeuvres/').once('value').then(function (snapshot) {
                console.log(snapshot.val())
                if (snapshot != null && snapshot.val() != null) {
                    controller.oeuvres = [];
                    oeuvres = snapshot.val();
                    nombre = Object.keys(oeuvres).length
                    for (var i = 0; i < nombre; i++) {
                        var aleatoire = Math.floor(Math.random() * nombre)
                        if (controller.isInArray(aleatoire, valeurs)) {

                        } else {
                            var oeu = oeuvres[Object.keys(oeuvres)[aleatoire]];
                            controller.oeuvres.push(oeu);
                            valeurs.push(aleatoire);
                        }

                    }
                } else {
                    controller.oeuvres = [];
                }
                console.log(controller.oeuvres)
            });
        }
    }
    controller.getOeuvres();
    
    controller.oeuvre = {}
    
    controller.i = 0
    var checkOeuvres = $interval(function () {
        console.log("recherche de nouveaux oeuvres " + controller.oeuvres.length)
        if (controller.oeuvres.length == 0) {
            console.log("recherche de nouveaux oeuvres")
            controller.getOeuvres();
            
        } else {
            controller.oeuvre = controller.oeuvres[controller.i]
            $interval.cancel(checkOeuvres);
        }
    }, 2000);
    
    controller.jaime = function(){
        
        var oeuvre = controller.oeuvres[controller.i];
        if(oeuvre.likes){
            oeuvre.likes = Number(oeuvre.likes)+1;
        }else{
            oeuvre['likes']=1;
        }
        oeuvre = controller.setNotation(oeuvre);
        database.saveDocument('oeuvres', oeuvre).then(()=>{
            console.log("Enregistrement du likes : "+oeuvre.likes);
            controller.suivant();
            $scope.$apply();
        });
    }
    controller.jaimePas = function(){
        
        var oeuvre = controller.oeuvres[controller.i];
        if(oeuvre.dislikes){
            oeuvre.dislikes = Number(oeuvre.dislikes)+1;
        }else{
            oeuvre['dislikes']=1;
        }
        oeuvre = controller.setNotation(oeuvre);
        database.saveDocument('oeuvres', oeuvre).then(()=>{
            console.log("Enregistrement du dislikes : "+oeuvre.dislikes);
            controller.suivant();
            $scope.$apply();
        });
        
        
    }
    
    controller.setNotation = function(oeuvre) {
        var likes = 0
        var dislikes = 0
        if(oeuvre.likes){
            likes = oeuvre.likes
        }
        if(oeuvre.dislikes){
            dislikes = oeuvre.dislikes
        }
        if(likes+dislikes==0){
            oeuvre['notation']=0
        }else{
            var note = (likes/(likes + dislikes))*5;
            oeuvre['notation'] = Math.floor(note)
        }
        return oeuvre
    }
    
    controller.suivant = function(){
        console.log('Suivant')
        controller.i+=1
        if(controller.i<controller.oeuvres.length){
            
        }else{
            controller.i=0
        }
        controller.oeuvre = controller.oeuvres[controller.i];
    }
    
});




