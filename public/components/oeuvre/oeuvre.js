function OeuvreComponentController() {
    var ctrl = this;
    ctrl.ouvrir = function (oeuvre) {
        window.location.href = '#!/oeuvre/' + oeuvre.id;
    }
    
    ctrl.accounting = accounting ;
    ctrl.prix = function (prix) {
        if (ctrl.getDevise() == 'euro') {
            return prix / 655.0;
        } else {
            return prix;
        }
    }

    ctrl.devise = function () {
        if (ctrl.getDevise() == 'euro') {
            return '€'
        } else {
            return 'FCFA'
        }
    }

    ctrl.prixEtDevise = function (prix) {
        if (ctrl.getDevise() == 'euro') {
            return ctrl.devise() + ' ' + accounting.formatNumber(ctrl.prix(prix), 2, " ");
        } else {
            return accounting.formatNumber(ctrl.prix(prix), 0, " ") + ' ' + ctrl.devise();
        }
    }

    ctrl.getDevise = function () {
        var devise = localStorage.getItem('EnediartDevise');
        return devise;
    }

}

app.component('oeuvre', {
    templateUrl: 'components/oeuvre/oeuvre.html',
    controller: OeuvreComponentController,
    bindings: {
        element: '='
    }
});