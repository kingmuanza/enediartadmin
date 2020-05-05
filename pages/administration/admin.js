console.log(app);

app.controller('AdminController', function ($scope, $routeParams, $interval) {

    var panierList = this;
    panierList.backgroundImage =""

    var user = firebase.auth().currentUser;
    console.log("ADMIN CONTROLLER")
    console.log(user);

})





