console.log(app);

app.controller('OeuvresAdminController', function ($scope, $routeParams, database) {

    console.log("Administration");

    console.log('$routeParams.themeoustyle');
    console.log($routeParams.themeoustyle);
    console.log('$routeParams.id');
    console.log($routeParams.id);

    var isAdmin = localStorage.getItem("EnediartAdmin");
    if (isAdmin) {

    } else {
        window.location.href = "#!connexion"
    }

    console.log("Administration");
    var controller = this;
    controller.oeuvres = []
    database.getCollection('oeuvres').then((items) => {
        var liste = [];
        console.log("items")
        console.log(items);
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.likes) {

            } else {
                item['likes'] = 0
            }
            if (item.dislikes) {

            } else {
                item['dislikes'] = 0
            }
            if ($routeParams.id && $routeParams.themeoustyle) {
                console.log('$routeParams.themeoustyle');
                console.log($routeParams.themeoustyle);
                console.log('$routeParams.id');
                console.log($routeParams.id);
            } else {
                liste.push(item)

            }
        }
        var colonnes = ["src", "nom", "prix", "notation", "likes", "dislikes", "artiste.nom", "artiste.prenom"]
        database.initDataTable("#table_oeuvres", colonnes, liste, "administration/oeuvre")
        console.log($('#table_oeuvres tbody'))
    });

    console.log($('#table_oeuvres tbody'))
    $('#table_oeuvres tbody').on('click', 'tr', function () {
        var item = $(this).data("item");
        console.log(item);
        window.location.href = "#!administration/oeuvre/" + item.id;
    });

});




