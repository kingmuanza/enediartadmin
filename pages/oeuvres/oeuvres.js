console.log(app);

app.controller('OeuvresController', function ($scope) {

    var controller = this;
    //Propriétes
    controller.artistes = []
    controller.oeuvres = {}

    controller.prix = function (prix) {
        if (controller.getDevise() == 'euro') {
            return prix / 655.0;
        } else {
            return prix;
        }
    }

    controller.devise = function () {
        if (controller.getDevise() == 'euro') {
            return '€'
        } else {
            return 'FCFA'
        }
    }

    controller.prixEtDevise = function (prix) {
        if (controller.getDevise() == 'euro') {
            return controller.devise() + ' ' + accounting.formatNumber(controller.prix(prix), 2, " ");
        } else {
            return accounting.formatNumber(controller.prix(prix), 0, " ") + ' ' + controller.devise();
        }
    }

    controller.getDevise = function () {
        var devise = localStorage.getItem('EnediartDevise');
        return devise;
    }

    //Méthodes intermédiaires

    controller.generateUID = function () {
        var firstPart = (Math.random() * 46656) | 0;
        var secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        return "OEUVR" + firstPart + secondPart + bashenga.formatDate(new Date().toString());
    }

    controller.afficherLesNotations = function (notation) {
        var noteHtml = " ";
        var nombreEtoiles = 0;
        var entier = Math.floor(notation);

        for (var compteur_etoile = 0; compteur_etoile < entier; compteur_etoile++) {
            noteHtml = noteHtml + "<i class='fas fa-star'></i>"
            nombreEtoiles++;
        }

        var diff = notation - entier;
        if (diff > 0) {
            noteHtml = noteHtml + "<i class='fas fa-star-half-alt'></i>"
            nombreEtoiles++;
        }
        while (nombreEtoiles < 5) {
            noteHtml = noteHtml + "<i class='far fa-star'></i>"
            nombreEtoiles++;
        }

        return noteHtml;
    }
    controller.creerBloc = function (element, oeuvre) {
        $(element).data("oeuvre", oeuvre);
        $(element).data("oeuvre", oeuvre);
        var noteHtml = controller.afficherLesNotations(oeuvre.notation);
        $(element).html("<div class='h50 text-white padding20 noir_transparent'><h3 class='africa'>"
                + oeuvre.nom
                + "</h3><p class='lead line5'><a class='lien_gris lien_artiste' href='#!/artiste/"
                + oeuvre.artiste.id + "'>"
                + oeuvre.artiste.nom + " "
                + oeuvre.artiste.prenom + "</a><span class='chargement cacher'> <i class='rotation fas fa-spinner'></i></span>, "
                + oeuvre.artiste.pays
                + "</p><p>"
                + (oeuvre.description ? oeuvre.description : "Aucune description")
                + "</p><p class='bottom_div right_div align-right'><span class='texte_moyen africa'>"
                + controller.prixEtDevise(oeuvre.prix)
                + "</span><br>"
                + noteHtml
                + "</p></div>")
        $(element).find("div").css("display", "none")
        $(element).find(".lien_gris").data("artiste", oeuvre.artiste);
        $(element).css("background-image", "url('" + oeuvre.src + "')");
        $(element).css('background-size', 'cover');
        $(element).css('background-position', 'center center');
    }
    controller.example = function () {
        controller.getArtistes();
        return {
            sourcesImages: [
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/3.jfif?alt=media&token=40d86b22-16a1-4b94-8784-44c9c8dfc576",
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/31.jfif?alt=media&token=ddbb9200-5c01-4bc8-a9d6-cd27df93f97f",
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/32.jfif?alt=media&token=3392cdc9-6048-4280-8228-e0637abb913e",
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/37.jfif?alt=media&token=9986eef8-77a7-4327-82b6-f3191e8b7426",
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/42.jfif?alt=media&token=6e555bea-76e2-453e-9e29-7686c944a062",
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/44.jfif?alt=media&token=675498b9-ea77-46ee-8b55-1d945149fdd5",
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/49.jfif?alt=media&token=d7797b2e-a52f-45d4-ad4b-ed45808905e9",
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/1.jfif?alt=media&token=6dd7d4a9-77d1-475c-83ac-f6a019cee4f7",
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/25.jfif?alt=media&token=d4e2250e-f980-4e9c-82ab-d51613c5e6a5",
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/27.jfif?alt=media&token=3a9edf5a-b20c-4527-a615-73ddaded456d",
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/11.jfif?alt=media&token=3bed2bb5-2303-4439-9a3e-9adc83d761ed",
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/12.jfif?alt=media&token=4aaec9c9-862b-4731-b38c-928c2f35e757",
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/13.jfif?alt=media&token=8031017c-0d4e-42b3-a495-c0117b8eee27",
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/15.jfif?alt=media&token=874fb0e1-6e93-420b-ac74-6a5f8bdae27c",
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/17.jfif?alt=media&token=d77a771a-8031-4d1f-ac18-cc2798807dbe",
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/18.jfif?alt=media&token=051aeabb-6a64-4deb-b861-d64ffd0a3b84",
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/20.jfif?alt=media&token=809aa743-0803-4eda-9cd8-d191c68c5494",
                "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/10.jfif?alt=media&token=0a046a47-bca3-4d98-abfc-54e21ab3dd56"
            ],
            nomsOeuvres: [
                "L'inattention",
                "L'imperfectible de l'abstrait",
                "Le retour des heures perdues",
                "Le choix des innocents",
                "Et un jour, il arriva",
                "Il était une fois",
                "Plus jamais comme avant",
                "Les regrets",
                "Mediations",
                "La solitude de l'âme",
                "Vers les coeurs",
                "Les subséquences",
                "Et pourtant c'est moi",
                "Ils ne chanteront plus"
            ],
            creerOeuvre: function () {
                var id = controller.generateUID().toUpperCase();
                var indexOeuvre = Math.floor(Math.random() * controller.example().nomsOeuvres.length)
                var indexSource = Math.floor(Math.random() * controller.example().sourcesImages.length)
                var indexArtiste = Math.floor(Math.random() * controller.artistes.length)
                console.log("id : " + id);
                var oeuvre = {
                    id: id,
                    nom: controller.example().nomsOeuvres[indexOeuvre],
                    src: controller.example().sourcesImages[indexSource],
                    prix: Math.floor(Math.random() * 325) + "000",
                    artiste: controller.artistes[indexArtiste],
                    notation: Math.floor(Math.random() * 5)
                }
                console.log(oeuvre);
                var oeuvres = controller.oeuvres;
                oeuvres[oeuvre.id] = oeuvre;
                console.log(oeuvres);
                firebase.database().ref('enediart/oeuvres/').set(controller.oeuvres, function (element) {
                    console.log("erreur : " + element);
                });
                controller.getOeuvres();
            }
        }
    }

    //Méthodes finales
    controller.getArtistes = function () {
        return firebase.database().ref('enediart/artistes/').once('value').then(function (snapshot) {
            if (snapshot != null && snapshot.val() != null) {
                var artistes = snapshot.val();
                var artistesTableaux = []
                for (var i = 0; i < Object.keys(artistes).length; i++) {
                    var artiste = artistes[Object.keys(artistes)[i]];
                    artistesTableaux.push(artiste)
                }
                controller.artistes = artistesTableaux;
            } else {
                controller.artistes = []
            }

        });
    }
    controller.getArtistes();
    controller.getOeuvres = function () {
        return firebase.database().ref('enediart/oeuvres/').once('value').then(function (snapshot) {
            if (snapshot != null && snapshot.val() != null) {
                controller.oeuvres = snapshot.val();
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
                    controller.creerBloc(element, oeuvre);
                    //console.log(oeuvre);
                    setTimeout(function () {
                        $(element).css('opacity', '0');
                        $(element).css('display', 'block');
                        $(element).fadeTo("fast", 1, function () {
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
            note = -1;
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
                controller.oeuvres = snapshot.val();
                var oeuvres = {}
                for (var i = 0; i < Object.keys(controller.oeuvres).length; i++) {
                    var oeuvre = controller.oeuvres[Object.keys(controller.oeuvres)[i]];
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

    controller.creerOeuvre = controller.example().creerOeuvre;
})




