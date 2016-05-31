(function () {
    'use strict';
    angular.module('atlas2-juego').directive('atlas2Unidad', [atlas2Unidad]);

    function atlas2Unidad() {
        
        return {
            templateUrl: '/SPA/front/views/partials/unidad.html'
        };

    }

})();