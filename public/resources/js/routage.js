/*
 *---------------------- Routage de angular JS ---------------------------------
 */


app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: "pages/accueil/accueil.html"
            })
            .when("/panier", {
                templateUrl: "pages/panier/panier.html"
            })
            .when("/contacteznous", {
                templateUrl: "pages/contactus/contactus.html"
            })
            .when("/rechercher", {
                templateUrl: "pages/rechercher/rechercher.html"
            })
            .when("/paiement", {
                templateUrl: "pages/paiement/paiement.html"
            })
            .when("/artiste/:id", {
                templateUrl: "pages/artiste/artiste.html"
            })
            .when("/artiste/edit/:id", {
                templateUrl: "pages/artiste/edition.html"
            })
            .when("/artistes", {
                templateUrl: "pages/artistes/artistes.html"
            })
            .when("/oeuvre", {
                templateUrl: "pages/oeuvre/oeuvre.html"
            })
            .when("/oeuvre/:id", {
                templateUrl: "pages/oeuvre/oeuvre.html"
            })
            .when("/oeuvres", {
                templateUrl: "pages/oeuvres/oeuvres.html"
            })
            .when("/exposition", {
                templateUrl: "pages/exposition/exposition.html"
            })
            .when("/exposition/:id", {
                templateUrl: "pages/exposition/exposition.html"
            })
            .when("/expositions", {
                templateUrl: "pages/expositions/expositions.html"
            })
            .when("/mentions", {
                templateUrl: "pages/mentions/mentions.html"
            })
            .when("/eneditrip", {
                templateUrl: "pages/eneditrip/eneditrip.html"
            })
            .when("/apropos", {
                templateUrl: "pages/apropos/apropos.html"
            })
            .when("/administration", {
                templateUrl: "pages/administration/admin.html"
            })
            
            
            .when("/administration/artistes", {
                templateUrl: "adminpages/artistes/artistes.html"
            })
            .when("/administration/artiste", {
                templateUrl: "adminpages/artiste/artiste.html"
            })
            .when("/administration/artiste/:id", {
                templateUrl: "adminpages/artiste/artiste.html"
            })
            .when("/administration/oeuvres", {
                templateUrl: "adminpages/oeuvres/oeuvres.html"
            })
            .when("/administration/oeuvre", {
                templateUrl: "adminpages/oeuvre/oeuvre.html"
            })
            .when("/administration/oeuvre/:id", {
                templateUrl: "adminpages/oeuvre/oeuvre.html"
            })
            .when("/administration/expositions", {
                templateUrl: "adminpages/expositions/expositions.html"
            })
            .when("/administration/exposition", {
                templateUrl: "adminpages/exposition/exposition.html"
            })
            .when("/administration/exposition/:id", {
                templateUrl: "adminpages/exposition/exposition.html"
            })
            .when("/administration/commandes", {
                templateUrl: "adminpages/commandes/commandes.html"
            })
            .when("/administration/utilisateurs", {
                templateUrl: "adminpages/utilisateurs/utilisateurs.html"
            })
            
            
            
            .otherwise({
                redirectTo: '/'
            });
});



