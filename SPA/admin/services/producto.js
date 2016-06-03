(function () {
    'use strict';
    angular.module('atlas2').service('productoService', ["$http", "$q", productoService]);

    function productoService($http, $q) {

        var getAll = function(){
            var defer = $q.defer();

            $http.get('/api/producto')
            .success(function (productos) {
                defer.resolve(productos);
            })
            .error(function(){
                defer.reject('server error')
            });

            return defer.promise;
        };

        return {
            getAll  : getAll,
        }

    }

})();