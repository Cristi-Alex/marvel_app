/**
 * Created by Cris on 17.06.2017.
 */
(function () {
    'use strict';

    angular
        .module("ngMarvel")
        .config(marvelMainConfig)
        .controller("MarvelMainCtrl", MarvelMainCtrl);

    marvelMainConfig.$inject = ['$stateProvider'];
    function marvelMainConfig($stateProvider) {

        $stateProvider
            .state('root.main', {
                url: 'main',
                templateUrl: 'main.html',
                controller: 'MarvelMainCtrl',
                controllerAs: "vm"
            });
    }

    function MarvelMainCtrl() {
        var vm = this;

        vm.query = {query: "", srcString: "", searchPressed: 0};
        console.log("Main...");
    }
}());