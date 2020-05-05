console.log(app);

app.controller('ExpositionsController', function ($scope) {
    var expositionsList = this;

    expositionsList.sourcesImages = [
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
    ]

    expositionsList.nomsExpositions = [
        "Foire Internationale de l'Art Africain",
        "Festival des Arts",
        "Grand Festival des Arts",
        "Innovations Culturelles",
        "Sous les tropiques",
        "Afric'Art Expo",
        "Couleurs Culturelles"
    ]
    expositionsList.prenomsExpositions = [
        "",
    ]
    expositionsList.pays = [
        "Cameroun",
        "RD Congo",
        "Tchad"

    ]



    expositionsList.generateUID = function () {
        var firstPart = (Math.random() * 46656) | 0;
        var secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        return "EXPO" + firstPart + secondPart + expositionsList.formatDate(new Date().toString());
    }
    expositionsList.formatDate = function (date) {
        var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('');
    }
    expositionsList.expositions = {

    }

    expositionsList.afficherLesNotations = function (notation) {
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
    expositionsList.afficherLesBlocAvecElegance = function (i, n, pattern) {
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
                var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
                var element = $('.box_muanza')[i];
                if (element) {
                    //console.log(i);
                    var exposition = expositionsList.expositions[Object.keys(expositionsList.expositions)[i]];
                    var dateDebut = new Date(exposition.dateDebut)
                    $(element).data("exposition", exposition);
                    $(element).html("<div class='h50 text-white padding20 noir_transparent'><h3 class='africa'>"
                            + exposition.nom
                            + "</h3><p class='lead'>"
                            + exposition.lieu
                            + "</p><p class='bottom_div right_div align-right'><span class='capitalize texte_moyen africa'>"
                            + dateDebut.toLocaleDateString('fr-FR', options) + "</span><br>"
                            + exposition.pays + "</p></div>")
                    if (window.matchMedia('(max-width: 500px)').matches) {

                    } else {
                        $(element).find("div").css("display", "none")
                    }
                    $(element).css("background-image", "url('" + exposition.photo + "')");
                    $(element).css('background-size', 'cover');
                    //console.log(exposition);
                    if (i == 0) {
                        $('#branding').css("background-image", "url('" + exposition.photo + "')");
                        $('#branding').css('background-size', 'cover');
                    }

                    setTimeout(function () {
                        $(element).css('opacity', '0');
                        $(element).css('display', 'block');
                        $(element).fadeTo("fast", 1, function () {
                            expositionsList.afficherLesBlocAvecElegance(i + 1, n, pattern);
                        });

                    }, 100);
                }
            } catch (e) {

                console.log(e);
                //console.log("Terminé !");
            }
        }
    }

    expositionsList.rechercherExpositions = function (motsCles, note, pays) {
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
            pays = $scope.prix;
        } else {
            pays = 1000000000;
        }
        console.log("Note... " + note);
        console.log("motsCles... " + motsCles);
        $('.box_muanza').css("display", "none");
        return firebase.database().ref('enediart/expositions/').once('value').then(function (snapshot) {
            if (snapshot != null && snapshot.val() != null) {
                expositionsList.expositions = snapshot.val();
                var expositions = {}
                for (var i = 0; i < Object.keys(expositionsList.expositions).length; i++) {
                    var exposition = expositionsList.expositions[Object.keys(expositionsList.expositions)[i]];
                    //console.log(exposition.nom.indexOf(motsCles));
                    if (exposition.nom.indexOf(motsCles) !== -1 || exposition.exposition.nom.indexOf(motsCles) !== -1) {
                        if (exposition.notation > note) {
                            console.log(prix);
                            if (true) {
                                expositions[exposition.id] = exposition;
                            }
                        }

                    }
                }
                //console.log(expositions);
                expositionsList.expositions = expositions;
                //console.log(expositionsList.expositions);
            } else {
                expositionsList.expositions = {}

            }
            console.log(expositionsList.expositions)
            console.log(Object.keys(expositionsList.expositions))
            console.log(Object.keys(expositionsList.expositions).length)
            expositionsList.afficherLesBlocAvecElegance(0, Object.keys(expositionsList.expositions).length, motsCles);
        });
    }

    expositionsList.getExpositions = function () {
        return firebase.database().ref('enediart/expositions/').once('value').then(function (snapshot) {
            if (snapshot != null && snapshot.val() != null) {
                expositionsList.expositions = snapshot.val();
            } else {
                expositionsList.expositions = {}
            }
            console.log(expositionsList.expositions)
            console.log(Object.keys(expositionsList.expositions))
            console.log(Object.keys(expositionsList.expositions).length)
            expositionsList.afficherLesBlocAvecElegance(0, Object.keys(expositionsList.expositions).length, "");
        });
    }
    expositionsList.getExpositions();


    expositionsList.expositions = [
        {
            nom: "Foire Internationale de l'Art Africain",
            lieu: "Yaoundé, Institut Francais du Cameroun",
            pays: "Cameroun",
            photo: "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/muanza.jpg?alt=media&token=6b22a211-6223-475d-a6f3-561e84fc8ec3"
        }
    ]

    expositionsList.lieux = [
        {
            pays: "Cameroun",
            lieu: "Yaoundé, Institut Francais du Cameroun"
        },
        {
            pays: "Cameroun",
            lieu: "Douala, Institut Francais du Cameroun"
        },
        {
            pays: "Côte d'Ivoire",
            lieu: "Abidjan, Palais de Culture"
        },
        {
            pays: "RD Congo",
            lieu: "Kinshasa, Dream Island"
        },
        {
            pays: "Cameroun",
            lieu: "Yaoundé, Palais des Sports"
        }
    ]

    expositionsList.creerExposition = function () {
        var id = expositionsList.generateUID().toUpperCase();
        var indexExposition = Math.floor(Math.random() * expositionsList.nomsExpositions.length)
        var indexSource = Math.floor(Math.random() * expositionsList.sourcesImages.length)
        var indexLieu = Math.floor(Math.random() * expositionsList.lieux.length)
        console.log("id : " + id);
        var jour = Math.floor(Math.random() * 25)
        var mois = Math.floor(Math.random() * 9)
        var exposition = {
            id: id,
            nom: expositionsList.nomsExpositions[indexExposition],
            photo: expositionsList.sourcesImages[indexSource],
            lieu: expositionsList.lieux[indexLieu].lieu,
            pays: expositionsList.lieux[indexLieu].pays,
            dateDebut: new Date(2018, mois, jour).toISOString(),
            dateFin: new Date(2018, mois, jour + 3).toISOString()
        }
        console.log(exposition);
        var expositions = expositionsList.expositions;
        expositions[exposition.id] = exposition;
        console.log(expositions);
        firebase.database().ref('enediart/expositions/').set(expositionsList.expositions, function (element) {
            console.log("erreur : " + element);
        });
        expositionsList.getExpositions();
    };








    expositionsList.todos = [
        {text: 'learn AngularJS', done: true},
        {text: 'build an AngularJS app', done: false}];

    expositionsList.addTodo = function () {
        expositionsList.todos.push({text: expositionsList.todoText, done: false});
        expositionsList.todoText = '';
    };

    expositionsList.remaining = function () {
        var count = 0;
        angular.forEach(expositionsList.todos, function (todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    expositionsList.archive = function () {
        var oldTodos = expositionsList.todos;
        expositionsList.todos = [];
        angular.forEach(oldTodos, function (todo) {
            if (!todo.done)
                expositionsList.todos.push(todo);
        });
    };
});




