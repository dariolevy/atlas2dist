(function () {

    angular.module('atlas2', ['ngRoute']);

    angular.module('atlas2').config(['$routeProvider', '$httpProvider', configFunction]);

    /*@ngInject*/
    function configFunction($routeProvider, $httpProvider) {
        //$httpProvider.defaults.withCredentials = true;

        // Routes
        $routeProvider.when("/", {
            templateUrl : "/SPA/admin/views/dashboard.html",
		    controller  : 'dashboardCtrl'
        }).when("/configuracion", {
            templateUrl: "/SPA/admin/views/configuracion.html",
            controller: 'confCtrl'
        }).otherwise({
            redirectTo 	: '/'
        });

		// ruta de recursos
		$routeProvider.when("/recurso", {
		    templateUrl : "/SPA/admin/views/recurso/list.html",
		    controller  : 'recursoCtrl'
		}).when("/recurso/add", {
		    templateUrl: "/SPA/admin/views/recurso/add.html",
		    controller  : 'recursoCtrl'
		}).when("/recurso/edit/:id", {
		    templateUrl: "/SPA/admin/views/recurso/edit.html",
		    controller  : 'recursoCtrl'
		});

        // ruta de mapa
		$routeProvider.when("/mapa", {
		    templateUrl: "/SPA/admin/views/mapa/list.html",
		    controller: 'mapaCtrl'
		}).when("/mapa/add", {
		    templateUrl: "/SPA/admin/views/mapa/add.html",
		    controller: 'mapaCtrl'
		}).when("/mapa/edit/:id", {
		    templateUrl: "/SPA/admin/views/mapa/edit.html",
		    controller: 'mapaCtrl'
		});

        // ruta de investigacion
		$routeProvider.when("/investigacion", {
		    templateUrl : "/SPA/admin/views/investigacion/list.html",
		    controller  : 'investigacionCtrl'
		}).when("/investigacion/add", {
		    templateUrl: "/SPA/admin/views/investigacion/add.html",
		    controller  : 'investigacionCtrl'
		}).when("/investigacion/edit/:id", {
		    templateUrl: "/SPA/admin/views/investigacion/edit.html",
		    controller  : 'investigacionCtrl'
		});

        // ruta de destacamento
		$routeProvider.when("/destacamento", {
		    templateUrl: "/SPA/admin/views/destacamento/list.html",
		    controller: 'destacamentoCtrl'
		}).when("/destacamento/add", {
		    templateUrl: "/SPA/admin/views/destacamento/add.html",
		    controller: 'destacamentoCtrl'
		}).when("/destacamento/edit/:id", {
		    templateUrl: "/SPA/admin/views/destacamento/edit.html",
		    controller: 'destacamentoCtrl'
		});

        // ruta de edificios
		$routeProvider.when("/edificio", {
		    templateUrl: "/SPA/admin/views/edificio/list.html",
		    controller: 'edificioCtrl'
		}).when("/edificio/add", {
		    templateUrl: "/SPA/admin/views/edificio/add.html",
		    controller: 'edificioCtrl'
		}).when("/edificio/edit/:id", {
		    templateUrl: "/SPA/admin/views/edificio/edit.html",
		    controller: 'edificioCtrl'
		});

        // ruta de dependencia
		$routeProvider.when("/dependencia", {
		    templateUrl: "/SPA/admin/views/dependencia/list.html",
		    controller: 'dependenciaCtrl'
		}).when("/dependencia/add", {
		    templateUrl: "/SPA/admin/views/dependencia/add.html",
		    controller: 'dependenciaCtrl'
		}).when("/dependencia/edit/:id", {
		    templateUrl: "/SPA/admin/views/dependencia/edit.html",
		    controller: 'dependenciaCtrl'
		});

        // ruta de interacciones
		$routeProvider.when("/interaccion", {
		    templateUrl: "/SPA/admin/views/interaccion/list.html",
		    controller: 'interaccionCtrl'
		}).when("/interaccion/add", {
		    templateUrl: "/SPA/admin/views/interaccion/add.html",
		    controller: 'interaccionCtrl'
		}).when("/interaccion/edit/:id", {
		    templateUrl: "/SPA/admin/views/interaccion/edit.html",
		    controller: 'interaccionCtrl'
		});
    }

})();