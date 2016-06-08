(function () {
    'use strict';
    angular.module('atlas2-juego').service('jugadorRecursoService', ["$http", "$q", jugadorRecursoService]);

    function jugadorRecursoService($http, $q) {

        var getRecursoByColonia = function (colonia) {
            var defer = $q.defer();

            $http.get('/api/jugadorRecurso/' + colonia)
            .success(function (jugadorRecursos) {
                defer.resolve(jugadorRecursos);
            })
            .error(function () {
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getRecursoByColonia: getRecursoByColonia
        }

    }

})();