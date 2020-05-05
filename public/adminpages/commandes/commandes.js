console.log(app);

app.controller('CommandesAdminController', function ($scope, database) {
    
    console.log("Administration");
    
    var isAdmin = localStorage.getItem("EnediartAdmin");
    if(isAdmin){
        
    }else{
        window.location.href="#!connexion"
    }
    
    var controller = this ;
    controller.commandes = []
    database.getCollection('utilisateurs').then((items)=>{
        var commandes = []
        console.log("items")
        console.log(items);
        for(var i=0; i<items.length; i++){
            var item = items[i]
            var panier = item.panier
            for(var j=0; j<panier.length;j++){
                var commande = panier[j];
                commande['displayName']=item.displayName
                commande['email']=item.email
                commande['user']=item.email
                commande['dateCommande']=commande.date.split('T')[0]
                commandes.push(commande)
            }
        }
        var colonnes = ["nom", "src", "prix", "dateCommande", "displayName",]
        database.initDataTable("#table_commandes", colonnes, commandes, "oeuvres")
        console.log($('#table_commandes tbody'))
    });
    
//    console.log($('#table_commandes tbody'))
//    $('#table_commandes tbody').on('click', 'tr', function () {
//        var item = $(this).data("item");        
//        console.log(item);
//        window.location.href="#!administration/commande/"+item.id;
//    });
//    
});




