(function () {

    angular.module('atlas2-juego', ['ngRoute']);

    angular.module('atlas2-juego').config(['$routeProvider', configFunction]);

    /*@ngInject*/
    function configFunction($routeProvider) {
        // Routes
        $routeProvider.when('/', {
            templateUrl: '/SPA/front/views/home.html',
		    controller  : 'homeCtrl'
		}).otherwise({
            redirectTo 	: '/'
        });

		// ruta de edificio
		$routeProvider.when('/edificio', {
		    templateUrl : '/SPA/front/views/edificio.html',
		    controller  : 'edificioCtrl'
		});

        // ruta de destacamento
        $routeProvider.when('/destacamento', {
            templateUrl : '/SPA/front/views/destacamento.html',
            controller  : 'destacamentoCtrl'
        });

        // ruta de investigacion
        $routeProvider.when('/investigacion', {
            templateUrl : '/SPA/front/views/investigacion.html',
            controller  : 'investigacionCtrl'
        });

        // ruta de zona
        $routeProvider.when('/zona', {
            templateUrl : '/SPA/front/views/zona.html',
            controller  : 'zonaCtrl'
        });
    }

})();