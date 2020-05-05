console.log(app);

app.controller('ArtisteAdminController', function ($scope, database, $routeParams, $timeout, storage) {
    
    
    console.log("Administration");
    
    var isAdmin = localStorage.getItem("EnediartAdmin");
    if(isAdmin){
        
    }else{
        window.location.href="#!connexion"
    }

    console.log("Administration");
    var controller = this;
    controller.id = $routeParams.id;
    controller.artiste = {
        id: database.uid(),
        nom: "",
        prenom: "",
        notation: 0,
        pays: "",
        photo: ""
    }
    
    controller.message = ""

    if ($routeParams.id) {
        database.getDocumentById('artistes', $routeParams.id).then((item) => {
            console.log("item");
            console.log(item);
            controller.artiste = item;
            $scope.$apply();
        });
    }


    controller.enregistrer = function (artiste) {
        var user = localStorage.getItem("EnediartUtilisateur")
        if (user) {
            artiste['user'] = JSON.parse(user).email;
            database.saveDocument('artistes', artiste).then((item) => {
                console.log("item");
                console.log(item);
                window.location.href = "#!artiste/"+artiste.id
            });
        }
    }

    controller.image = ""
    controller.saveImage = function () {
        
        storage.saveImage(controller.image).then(function (downloadURL) {
            controller.artiste['photo'] = downloadURL;
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
        var oui = confirm("Etes vous sûr de vouloir supprimer l'artiste : " + item.nom + " " + item.prenom +" ?");
        if (oui) {

            database.supprimerDocument('artistes', item.id).then((item) => {
                console.log("item");
                console.log(item);
                window.location.href = "#!/administration/artistes"
            });
        }
    }

});




