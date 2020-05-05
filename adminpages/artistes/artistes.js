console.log(app);

app.controller('ArtistesAdminController', function ($scope, database) {
    
    console.log("Administration");
    
    var isAdmin = localStorage.getItem("EnediartAdmin");
    if(isAdmin){
        
    }else{
        window.location.href="#!connexion"
    }
    
    console.log("Administration");
    var controller = this ;
    controller.artistes = []
    database.getCollection('artistes').then((items)=>{
        
        console.log("items")
        console.log(items);
        
        var colonnes = ["photo", "nom", "prenom", "pays", "notation"]
        database.initDataTable("#table_artistes", colonnes, items, "administration/artiste")
        console.log($('#table_artistes tbody'))
    });
    
    console.log($('#table_artistes tbody'))
    $('#table_artistes tbody').on('click', 'tr', function () {
        var item = $(this).data("item");        
        console.log(item);
        window.location.href="#!administration/artiste/"+item.id;
    });
    
});




