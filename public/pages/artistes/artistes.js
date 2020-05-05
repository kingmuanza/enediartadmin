console.log(app);

app.controller('ArtistesController', function ($scope) {
    var artistesList = this;

    artistesList.sourcesImages = [
        "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/muanza.jpg?alt=media&token=6b22a211-6223-475d-a6f3-561e84fc8ec3",
        "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/hermann.jfif?alt=media&token=a3760093-76d5-4250-a769-140cba7abce6",
        "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/YVI.JPG?alt=media&token=c9ce7bba-28ae-42e0-8582-f4be0bdc7d47",
        "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/fred.jpg?alt=media&token=3ac5b894-18ae-4b6a-9e2f-90c63f51a184"
    ]

    artistesList.nomsArtistes = [
        "Muanza Kangudie",
        "Hermann Talla",
        "Ngole Mboula"
    ]
    artistesList.prenomsArtistes = [
        "",
    ]
    artistesList.pays = [
        "Cameroun",
        "RD Congo",
        "Tchad"

    ]

    artistesList.artistes = [
        {
            nom: "Muanza",
            prenom: "Kangudie",
            pays: "RD Congo",
            photo: "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/muanza.jpg?alt=media&token=6b22a211-6223-475d-a6f3-561e84fc8ec3"
        },
        {
            nom: "Talla",
            prenom: "Herman",
            pays: "Cameroun",
            photo: "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/hermann.jfif?alt=media&token=a3760093-76d5-4250-a769-140cba7abce6"
        },
        {
            nom: "Likama",
            prenom: "Yvana",
            pays: "Tchad",
            photo: "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/YVI.JPG?alt=media&token=c9ce7bba-28ae-42e0-8582-f4be0bdc7d47"
        },
        {
            nom: "Ngole Mboula",
            prenom: "Fred Maurice",
            pays: "Cameroun",
            photo: "https://firebasestorage.googleapis.com/v0/b/coworking-muanza.appspot.com/o/fred.jpg?alt=media&token=3ac5b894-18ae-4b6a-9e2f-90c63f51a184"
        }
    ]

    artistesList.generateUID = function () {
        var firstPart = (Math.random() * 46656) | 0;
        var secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        return "ARTIST" + firstPart + secondPart + artistesList.formatDate(new Date().toString());
    }
    artistesList.formatDate = function (date) {
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
    artistesList.artistes = {

    }

    artistesList.afficherLesNotations = function (notation) {
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
    artistesList.afficherLesBlocAvecElegance = function (i, n, pattern) {
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
                    var artiste = artistesList.artistes[Object.keys(artistesList.artistes)[i]];
                    $(element).data("artiste", artiste);
                    var noteHtml = artistesList.afficherLesNotations(artiste.notation);
                    $(element).html("<div class='h50 text-white padding20 noir_transparent'><h3 class='africa'>"
                            + artiste.nom +" "+ artiste.prenom
                            + "</h3><p class='lead'>"
                            + artiste.pays
                            + "</p><p class='bottom_div right_div align-right'>"
                            + noteHtml + "</p></div>")
                    $(element).find("div").css("display", "none")
                    $(element).css("background-image", "url('" + artiste.photo + "')");
                    $(element).css('background-size', 'cover');
                    //console.log(artiste);
                    if (i == 0) {
                        $('#branding').css("background-image", "url('" + artiste.photo + "')");
                        $('#branding').css('background-size', 'cover');
                    }

                    setTimeout(function () {
                        $(element).css('opacity', '0');
                        $(element).css('display', 'block');
                        $(element).fadeTo("fast", 1, function () {
                            artistesList.afficherLesBlocAvecElegance(i + 1, n, pattern);
                        });

                    }, 100);
                }
            } catch (e) {

                console.log(e);
                //console.log("Terminé !");
            }
        }
    }

    artistesList.rechercherArtistes = function (motsCles, note, pays) {
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
        return firebase.database().ref('enediart/artistes/').once('value').then(function (snapshot) {
            if (snapshot != null && snapshot.val() != null) {
                artistesList.artistes = snapshot.val();
                var artistes = {}
                for (var i = 0; i < Object.keys(artistesList.artistes).length; i++) {
                    var artiste = artistesList.artistes[Object.keys(artistesList.artistes)[i]];
                    //console.log(artiste.nom.indexOf(motsCles));
                    if (artiste.nom.indexOf(motsCles) !== -1 || artiste.artiste.nom.indexOf(motsCles) !== -1) {
                        if (artiste.notation > note) {
                            console.log(prix);
                            if (true) {
                                artistes[artiste.id] = artiste;
                            }
                        }

                    }
                }
                //console.log(artistes);
                artistesList.artistes = artistes;
                //console.log(artistesList.artistes);
            } else {
                artistesList.artistes = {}

            }
            console.log(artistesList.artistes)
            console.log(Object.keys(artistesList.artistes))
            console.log(Object.keys(artistesList.artistes).length)
            artistesList.afficherLesBlocAvecElegance(0, Object.keys(artistesList.artistes).length, motsCles);
        });
    }

    artistesList.getArtistes = function () {
        return firebase.database().ref('enediart/artistes/').once('value').then(function (snapshot) {
            if (snapshot != null && snapshot.val() != null) {
                artistesList.artistes = snapshot.val();
            } else {
                artistesList.artistes = {}
            }
            console.log(artistesList.artistes)
            console.log(Object.keys(artistesList.artistes))
            console.log(Object.keys(artistesList.artistes).length)
            artistesList.afficherLesBlocAvecElegance(0, Object.keys(artistesList.artistes).length, "");
        });
    }
    artistesList.getArtistes();




    artistesList.creerArtiste = function () {
        var id = artistesList.generateUID().toUpperCase();
        var indexArtiste = Math.floor(Math.random() * artistesList.nomsArtistes.length)
        var indexSource = Math.floor(Math.random() * artistesList.sourcesImages.length)
        var indexPays = Math.floor(Math.random() * artistesList.pays.length)

        console.log("id : " + id);
        var artiste = {
            id: id,
            nom: artistesList.nomsArtistes[indexArtiste],
            prenom: "",
            photo: artistesList.sourcesImages[indexSource],
            pays: artistesList.pays[indexPays],
            notation: Math.floor(Math.random() * 5)
        }
        console.log(artiste);
        var artistes = artistesList.artistes;
        artistes[artiste.id] = artiste;
        console.log(artistes);
        firebase.database().ref('enediart/artistes/').set(artistesList.artistes, function (element) {
            console.log("erreur : " + element);
        });
        artistesList.getArtistes();
    };








    artistesList.todos = [
        {text: 'learn AngularJS', done: true},
        {text: 'build an AngularJS app', done: false}];

    artistesList.addTodo = function () {
        artistesList.todos.push({text: artistesList.todoText, done: false});
        artistesList.todoText = '';
    };

    artistesList.remaining = function () {
        var count = 0;
        angular.forEach(artistesList.todos, function (todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    artistesList.archive = function () {
        var oldTodos = artistesList.todos;
        artistesList.todos = [];
        angular.forEach(oldTodos, function (todo) {
            if (!todo.done)
                artistesList.todos.push(todo);
        });
    };
});




