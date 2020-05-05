console.log(app);

app.controller('ExpositionsAdminController', function ($scope, database) {
    
    
    console.log("Administration");
    
    var isAdmin = localStorage.getItem("EnediartAdmin");
    if(isAdmin){
        
    }else{
        window.location.href="#!connexion"
    }
    
    console.log("Administration");
    var controller = this ;
    controller.expositions = []
    database.getCollection('expositions').then((items)=>{
        var liste = []
        console.log("items")
        console.log(items);
        for(var i=0; i<items.length;i++){
            var item = items[i]
            item['debut']=item.dateDebut.split('T')[0]
            item['fin']=item.dateFin.split('T')[0]
            
            liste.push(item)
        }
        console.log($)
        var colonnes = ["photo", "nom", "lieu", "debut", "fin", "pays"]
        database.initDataTable("#table_expositions", colonnes, liste, "administration/exposition")
        console.log($('#table_expositions tbody'))
    });
    
    console.log($('#table_expositions tbody'))
    $('#table_expositions tbody').on('click', 'tr', function () {
        var item = $(this).data("item");        
        console.log(item);
        window.location.href="#!administration/exposition/"+item.id;
    });
    
});




