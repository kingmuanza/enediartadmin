app.controller('ArtisteController', function ($scope, $routeParams, database, util) {

    var controller = this;
    controller.background = "";


    console.log("J'affiche l'id");
    controller.id = $routeParams.id;
    console.log(controller.id);
    controller.artiste = {
        id: "",
        nom: "Veuillez patienter...",
        prenom: "",
        pays: "veuillez patienter...",
        notation: 0
    };

    controller.ouvrir = function (artiste) {
        window.location.href = "#!/artistes/view/" + artiste.id;
    }

    controller.artistes = [];
    controller.oeuvres = {

    }
    controller.accounting = accounting;

    
    $.fn.wrapInTag = function (opts) {
        //console.log("Wrap in tag");
        var tag = opts.tag || 'strong',
                words = opts.words || [],
                regex = RegExp(words.join('|'), 'gi'),
                replacement = '<' + tag + '>$&</' + tag + '>';

        //console.log(words);

        return this.html(function () {
            var text = $(this).text().replace(regex, replacement);
            //console.log(text)
            return text;
        });
    };

    controller.creerBloc = function (element, oeuvre) {
        $(element).data("oeuvre", oeuvre);
        $(element).data("oeuvre", oeuvre);
        var noteHtml = controller.afficherLesNotations(oeuvre.notation);
        $(element).html("<div class='h50 text-white padding20 noir_transparent'><h3 class='africa'>"
                + oeuvre.nom
                + "</h3><p class='lead line5'><a class='lien_gris lien_artiste' href='#!/artiste'>"
                + oeuvre.artiste.nom + " "
                + oeuvre.artiste.prenom + "</a><span class='chargement cacher'> <i class='rotation fas fa-spinner'></i></span>, "
                + oeuvre.artiste.pays
                + "</p><p class='bottom_div right_div align-right'><span class='texte_moyen africa'>"
                + accounting.formatNumber(oeuvre.prix, 0, " ")
                + " XAF</span><br>" + noteHtml + "</p></div>")
        $(element).find("div").css("display", "none")
        $(element).find(".lien_gris").data("artiste", oeuvre.artiste);
        $(element).css("background-image", "url('" + oeuvre.src + "')");
        $(element).css('background-size', 'cover');
    }


    controller.afficherLesBlocAvecElegance = function (i, n, pattern) {
        $('.box_muanza h3').wrapInTag({
            tag: 'strong',
            words: [pattern]
        });
        $('.box_muanza a').wrapInTag({
            tag: 'strong',
            words: [pattern]
        });

        if (i == n) {
            if (n == 0) {
                $('.box_muanza').css("display", "none");
            }
        } else {
            try {
                var element = $('.box_muanza')[i];
                if (element) {
                    //console.log(i);
                    var oeuvre = controller.oeuvres[Object.keys(controller.oeuvres)[i]];
                    if (i == 0) {
                        controller.background = oeuvre.src
                    }

                    controller.creerBloc(element, oeuvre);
                    //console.log(oeuvre);
                    setTimeout(function () {
                        $(element).css('opacity', '0');
                        $(element).css('display', 'block');
                        $(element).fadeTo(33, 1, function () {
                            controller.afficherLesBlocAvecElegance(i + 1, n, pattern);
                        });

                    }, 33);
                }
            } catch (e) {

                console.log(e);
                //console.log("Terminé !");
            }
        }
    }

    controller.rechercherOeuvres = function (motsCles, note, prix) {
        if ($scope.motsCles) {
            motsCles = $scope.motsCles;
        } else {
            motsCles = "";
        }
        if ($scope.note) {
            note = $scope.note;
        } else {
            note = 0;
        }
        if ($scope.prix) {
            prix = $scope.prix;
        } else {
            prix = 1000000000;
        }
        console.log("Note... " + note);
        console.log("motsCles... " + motsCles);
        $('.box_muanza').css("display", "none");
        return firebase.database().ref('enediart/oeuvres/').once('value').then(function (snapshot) {
            if (snapshot != null && snapshot.val() != null) {
                var allOeuvres = snapshot.val();
                var oeuvresDeLArtistes = {}
                var oeuvres = {}
                for (var i = 0; i < Object.keys(allOeuvres).length; i++) {
                    var oeuvre = allOeuvres[Object.keys(allOeuvres)[i]];
                    //console.log(oeuvre.nom.indexOf(motsCles));
                    if (oeuvre.artiste.id == controller.id) {
                        oeuvresDeLArtistes[oeuvre.id] = oeuvre;
                    }
                }
                for (var i = 0; i < Object.keys(oeuvresDeLArtistes).length; i++) {
                    var oeuvre = oeuvresDeLArtistes[Object.keys(oeuvresDeLArtistes)[i]];
                    //console.log(oeuvre.nom.indexOf(motsCles));
                    if (oeuvre.nom.indexOf(motsCles) !== -1 || oeuvre.artiste.nom.indexOf(motsCles) !== -1) {
                        if (oeuvre.notation > note) {
                            console.log(prix);
                            if (true) {
                                oeuvres[oeuvre.id] = oeuvre;
                            }
                        }

                    }
                }
                //console.log(oeuvres);
                controller.oeuvres = oeuvres;
                //console.log(controller.oeuvres);
            } else {
                controller.oeuvres = {}

            }
            console.log(controller.oeuvres)
            console.log(Object.keys(controller.oeuvres))
            console.log(Object.keys(controller.oeuvres).length)
            controller.afficherLesBlocAvecElegance(0, Object.keys(controller.oeuvres).length, motsCles);
        });
    }

    controller.getOeuvres = function () {
        return firebase.database().ref('enediart/oeuvres/').once('value').then(function (snapshot) {
            if (snapshot != null && snapshot.val() != null) {
                var allOeuvres = snapshot.val();
                var oeuvresDeLArtistes = {}
                for (var i = 0; i < Object.keys(allOeuvres).length; i++) {
                    var oeuvre = allOeuvres[Object.keys(allOeuvres)[i]];
                    //console.log(oeuvre.nom.indexOf(motsCles));
                    if (oeuvre.artiste.id === controller.id) {
                        oeuvresDeLArtistes[oeuvre.id] = oeuvre;
                    }
                }
                controller.oeuvres = oeuvresDeLArtistes;
                console.log("oeuvresDeLArtistes")
                console.log(oeuvresDeLArtistes)
                $scope.$apply();
            } else {
                controller.oeuvres = {}
            }
            console.log(controller.oeuvres)
            console.log(Object.keys(controller.oeuvres))
            console.log(Object.keys(controller.oeuvres).length)
            controller.afficherLesBlocAvecElegance(0, Object.keys(controller.oeuvres).length, "");
        });
    }
    controller.getOeuvres();

    // A transformer en composant
    controller.afficherLesNotations = util.afficherLesNotations;

    // Récupérer l'artiste en question
    controller.getArtiste = function () {
        database.getDocumentById('artistes', $routeParams.id).then((item) => {
            console.log("item");
            console.log(item);
            controller.artiste = item;
            $scope.$apply();
        });
    }
    
    // Récupérer d'autres artistes avec une certaine limite 
    controller.getArtistes = function () {
        database.getCollectionLimitTo('artistes', 4, $routeParams.id).then((item) => {
            console.log("item");
            console.log(item);
            controller.artistes = item;
            $scope.$apply();
        });
    }

    //Appel des fonctions
    controller.getArtiste();
    controller.getArtistes();
});




