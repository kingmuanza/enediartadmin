function OeuvresComponentController() {
    var ctrl = this;
    ctrl.ouvrir = function (oeuvre) {
        window.location.href = '#!/oeuvre/' + oeuvre.id;
    }
}

app.component('oeuvres', {
    templateUrl: 'components/oeuvres/oeuvres.html',
    controller: OeuvresComponentController,
    bindings: {
        liste: '='
    }
});