console.log(app);

app.controller('UtilisateursAdminController', function ($scope, database) {
    
    console.log("Administration");
    
    var isAdmin = localStorage.getItem("EnediartAdmin");
    if(isAdmin){
        
    }else{
        window.location.href="#!connexion"
    }
    
    console.log("Administration");
    var controller = this ;
    controller.utilisateurs = []
    database.getCollection('utilisateurs').then((items)=>{
        var utilisateurs = []
        console.log("items")
        console.log(items);
        for(var i=0; i<items.length; i++){
            var item = items[i]
            item['user']=item['email']
            utilisateurs.push(item)
        }
        var colonnes = ["displayName",]
        database.initDataTable("#table_utilisateurs", colonnes, utilisateurs, "oeuvres")
        console.log($('#table_utilisateurs tbody'))
    });
    
//    console.log($('#table_utilisateurs tbody'))
//    $('#table_utilisateurs tbody').on('click', 'tr', function () {
//        var item = $(this).data("item");        
//        console.log(item);
//        window.location.href="#!administration/utilisateur/"+item.id;
//    });
//    
});




