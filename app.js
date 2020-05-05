const config = {
    apiKey: "AIzaSyA6BzmVk6TAmQka4-sZVsHmc94ZSXmMRZU",
    authDomain: "coworking-muanza.firebaseapp.com",
    databaseURL: "https://coworking-muanza.firebaseio.com",
    projectId: "coworking-muanza",
    storageBucket: "coworking-muanza.appspot.com",
    messagingSenderId: "38968912248"
};

var app = angular.module("myApp", ["ngRoute"]);
app.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
        // We must whitelist the JSONP endpoint that we are using to show that we trust it
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://developer.mtn.cm/OnlineMomoWeb/faces/transaction/transactionRequest.xhtml'
        ]);
    }])
firebase.initializeApp(config);


