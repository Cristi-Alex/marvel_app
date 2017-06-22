/**
 * Created by Cris on 17.06.2017.
 */
(function () {
    'use strict';

    angular
        .module("ngMarvel",['ui.router', 'core', 'components', 'comic']);

    angular
        .module("ngMarvel")
        .config(routeConfig)
        .constant("PRIVATE_KEY",
            "7c06bc2bb2546ce4a9ca12500df010e5de4c5af8" )
        .constant("PUBLIC_KEY",
            "24d517d099f376c9e91fd46442243531")
        .run(runApp)
        .controller("InitializationCtrl", InitializationCtrl);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$compileProvider'];
    function routeConfig($stateProvider, $urlRouterProvider, $compileProvider) {
        $compileProvider.debugInfoEnabled(false);

        var resolveMain = {
            comics : loadComics
        };

        $stateProvider
            .state('root',{
                resolve: resolveMain,
                url:'/',
                template: '<ui-view>' +
                                '<div class="">Loading...</div>'+
                          '</ui-view>',
                controller: 'InitializationCtrl'

            });

        $urlRouterProvider.otherwise("/");

        loadComics.$inject = ['$q', 'comicService'];
        function loadComics($q, comicService) {
            //var defer = $q.defer();
            var dataPromise = comicService.load("","");

            dataPromise.then(function (allData) {
                var dataToHandle = allData;

                return dataToHandle;
            }).catch(function (err) {

                return $q.reject(err);

            });
            return dataPromise;
        }
    }

    InitializationCtrl.$inject = ['$scope', '$state', 'comics'];
    function InitializationCtrl($scope, $state, comics) {
        console.log("Initialization...");
        $scope.comics = comics;
        $state.transitionTo('root.main');
    }

    runApp.$inject = ['$rootScope'];
    function runApp($rootScope){

        //handle route change errors
        $rootScope.$on('$stateChangeError', function (event,  toState, toParams, fromState, fromParams, error) {
            // what you want to do if an error occurs when changing routes
            console.log("Route change err:" + error);
            throw new Error(error)
        });
    }

}());

