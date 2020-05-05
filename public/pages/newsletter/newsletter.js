console.log(app);

app.controller('NewsLetterController', function ($scope) {

    var controller = this;

    controller.user = firebase.auth().currentUser
    console.log(controller.user);

    controller.generateUID = function () {
        var firstPart = (Math.random() * 46656) | 0;
        var secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        return "NEWSLETTER" + firstPart + secondPart + bashenga.formatDate(new Date().toString());
    }

    controller.ajouterMail = function (email) {
        console.log("email")
        console.log(email)
        var id = controller.generateUID();
        var newsletters = {

        }
        firebase.database().ref('enediart/newsletters/').once('value').then(function (snapshot) {
            if (snapshot != null && snapshot.val() != null) {
                newsletters = snapshot.val();
            }
            newsletters[id] = {
                email: email,
                date: new Date().toDateString()
            };
            firebase.database().ref('enediart/newsletters/').set(newsletters, function (element) {
                console.log("erreur : " + element);
            });
        });

    }




})




