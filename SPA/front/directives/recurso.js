(function () {
    'use strict';
    angular.module('atlas2-juego').directive('atlas2Recurso', [atlas2Recurso]);

    function atlas2Recurso() {
        
        return {
            templateUrl: '/SPA/front/views/partials/recurso.html'
        };

    }

})();