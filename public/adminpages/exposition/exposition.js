console.log(app);

app.controller('ExpositionAdminController', function ($scope, database, $routeParams, $timeout, storage) {
    
    console.log("Administration");
    
    var isAdmin = localStorage.getItem("EnediartAdmin");
    if(isAdmin){
        
    }else{
        window.location.href="#!connexion"
    }

    console.log("Administration");
    var controller = this;
    controller.id = $routeParams.id;
    controller.exposition = {
        id: database.uid(),
        nom: "",
        lieu: "",
        dateDebut: new Date().toISOString(),
        dateFin: new Date().toISOString(),
        pays: "",
        photo: ""
    }
    
    controller.message = ""

    if ($routeParams.id) {
        database.getDocumentById('expositions', $routeParams.id).then((item) => {
            console.log("item");
            console.log(item);
            controller.exposition = item;
            $scope.$apply();
        });
    }


    controller.enregistrer = function (exposition) {
        var user = localStorage.getItem("EnediartUtilisateur")
        if (user) {
            exposition['user'] = JSON.parse(user).email;
            database.saveDocument('expositions', exposition).then((item) => {
                console.log("item");
                console.log(item);
                window.location.href = "#!exposition/"+exposition.id
            });
        }
    }

    controller.image = ""
    controller.saveImage = function () {
        
        storage.saveImage(controller.image).then(function (downloadURL) {
            controller.exposition['photo'] = downloadURL;
            $scope.$apply();
            controller.message = ""
        }).catch((error) => {
            console.log('error')
            console.log(error)
            controller.message = error
            $scope.$apply();
        })
    }

    controller.readImage = function (input) {
        console.log("Read image")
        
        storage.readInputFile(input).then((logo) => {
            console.log("Image enregistrée dans le cloud")
            $('#logo_competition').attr('src', logo);
            var png = logo.split(',')[1];
            controller.loadingLogo = false;
            controller.image = png;
            controller.saveImage();
        });
    }

    $("#input_photo").change(function () {
        console.log("L'image a changé !!")
        controller.readImage(this)
    });
    
    controller.supprimer = function (item) {
        var oui = confirm("Etes vous sûr de vouloir supprimer l'exposition : " + item.nom + " " + item.prenom +" ?");
        if (oui) {

            database.supprimerDocument('expositions', item.id).then((item) => {
                console.log("item");
                console.log(item);
                window.location.href = "#!/administration/expositions"
            });
        }
    }

});




