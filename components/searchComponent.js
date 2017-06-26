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
        var searchPressed= 0;
        vm.$onInit = init;
        vm.$onDestroy = destroy;
        vm.setQuery = setQuery;
        vm.clearQuery = clearQuery;

        function init() {
            vm.srcString = "";
            vm.searchTypeModel= "";
            vm.searchTypes = [
                {id: "", name: 'Select type'},
                {id: 'characters', name: 'Characters'},
                {id: 'creators', name: 'Creators'},
                {id: 'events', name: 'Events'}
            ];
        }

        function setQuery() {
            if(vm.query.query !== vm.searchTypeModel || vm.query.srcString !== vm.srcString) {
                searchPressed++;
                vm.queryChange({
                    event: {
                        query: {
                            query: vm.searchTypeModel,
                            srcString: vm.srcString,
                            searchPressed: searchPressed
                        }
                    }
                });
            }
        }

        function clearQuery() {
            vm.searchTypeModel = vm.srcString = "";
            searchPressed = 0;
            vm.queryChange({event: {query : {query: vm.searchTypeModel,
                srcString : vm.srcString, searchPressed: searchPressed}}});
        }

        function destroy(){
            vm = null;
        }
    }
}());