console.log(app);

app.controller('OeuvreAdminController', function ($scope, database, $routeParams, $timeout, storage) {
    
    console.log("Administration");
    
    var isAdmin = localStorage.getItem("EnediartAdmin");
    if(isAdmin){
        
    }else{
        window.location.href="#!connexion"
    }

    console.log("Administration");
    var controller = this;
    controller.id = $routeParams.id;
    controller.oeuvre = {
        id: database.uid(),
        nom: "",
        prix: 0,
        description: "Aucune description",
        notation: "",
        src: "",
        artiste: {
            id: "",
            nom: "",
            prenom: "",
            pays: ""
        }
    }

    controller.message = ""
    controller.artistes = [];
    database.getCollection('artistes').then((items) => {
        console.log("items")
        console.log(items);
        controller.artistes = items;

    });

    if ($routeParams.id) {
        database.getDocumentById('oeuvres', $routeParams.id).then((item) => {
            console.log("item");
            console.log(item);
            controller.oeuvre = item;
            controller.oeuvre['prix'] = Number(controller.oeuvre['prix'])
            $scope.$apply();
        });
    }


    controller.enregistrer = function (oeuvre) {

        console.log(oeuvre);
        var user = localStorage.getItem("EnediartUtilisateur")
        if (user) {
            oeuvre['user'] = JSON.parse(user).email;
            database.saveDocument('oeuvres', oeuvre).then((item) => {
                console.log("item");
                console.log(item);
                window.location.href = "#!/oeuvre/" + oeuvre.id
            });
        }
    }

    controller.image = ""
    controller.saveImage = function () {

        storage.saveImage(controller.image).then(function (downloadURL) {
            controller.oeuvre['src'] = downloadURL;
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
        var oui = confirm("Etes vous sûr de vouloir supprimer l'oeuvre : " + item.nom + " ?");
        if (oui) {

            database.supprimerDocument('oeuvres', item.id).then((item) => {
                console.log("item");
                console.log(item);
                window.location.href = "#!/administration/oeuvres"
            });
        }
    }

});




