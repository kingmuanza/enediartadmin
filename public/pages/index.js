console.log(app);

app.controller('IndexController', function ($scope) {

    var controller = this;
    
    controller.user = firebase.auth().currentUser
    console.log(controller.user)
    
    
})




