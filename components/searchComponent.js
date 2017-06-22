/**
 * Created by Cris on 20.06.2017.
 */
(function () {
    'use strict';

    angular
        .module("components")
        .component('marvelSearch',{
            bindings: {
                'query': '<',
                'queryChange' : '&'
            },
            templateUrl:"components/searchTemplate.html",
            controller: SearchController,
            controllerAs: "vm"
        });

    //SearchController.$inject = [];
    function SearchController() {
        var vm = this;

        vm.$onInit = init;
        vm.$onDestroy = destroy;
        vm.setQuery = setQuery;
        vm.clearQuery = clearQuery;

        function init() {
            vm.srcString = "";
            vm.searchTypes = [
                {id: "", name: 'Select type'},
                {id: 'characters', name: 'Characters'},
                {id: 'creators', name: 'Creators'},
                {id: 'events', name: 'Events'}
            ];
        }

        function setQuery() {
                vm.queryChange({event: {query : {query: vm.searchTypeModel, srcString : vm.srcString}}});
        }

        function clearQuery() {
            vm.searchTypeModel = vm.srcString = "";
            vm.queryChange({event: {query : {query: vm.searchTypeModel, srcString : vm.srcString}}});
        }

        function destroy(){
            vm = null;
        }
    }
}());