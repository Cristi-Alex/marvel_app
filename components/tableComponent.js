/**
 * Created by Cris on 18.06.2017.
 */
(function () {
    'use strict';

    angular
        .module("components")
        .component('marvelTable',{
            bindings : {
                'service': '@',
                'query' : '<'
            },
            templateUrl: 'components/tableTemplate.html',
            controller: TableController,
            controllerAs : "vm"
        });

    TableController.$inject = ['$injector', 'Comic'];
    function TableController($injector, Comic) {
        var vm = this;
        var query, srcString, comicService;

        vm.show= false;
        vm.num = -1;
        vm.loading = false;

        vm.$onInit = init;
        vm.$doCheck = doCheck;
       // vm.$onChanges = onChanges;
        vm.$onDestroy = destroy;
        vm.expandRow = expandRow;

        //TODO complete search
        //TODO refactor expandRow to allow multiple expansions
        //TODO write tests!!!
        //TODO styling (SASS if there's time left)
        //TODO comment code :D
        //TODO deployment
        function init() {
            //theoretically this could work with different services
            //another option could have been to inject the comicService directly but
            //'marvelTable' would have been less reusable

            comicService = $injector.get(vm.service || "comicService");
            query = vm.query.query;
            srcString = vm.query.srcString;
            var result = comicService.getComics();
            vm.data = processModel(result);
        }

        function doCheck() {
            if(vm.query.query !== query && vm.query.srcString !== srcString){
               query = vm.query.query;
               srcString = vm.query.srcString;
               var reload  = comicService.load(query,srcString);
               vm.loading = true;
               reload.then( function (response){
                   var result = comicService.getComics();
                   vm.data = processModel(result);
               }).catch(function (error) {
                   reload.reject(error);
                   console.log(error);
               }).finally(function () {
                   vm.loading = false;
               });
            }
        }

        function onChanges(query) {
            var current = query.query.currentValue;
            var previous = query.query.previousValue;
            console.log("On changes executed!" + current+ "  "+previous);
        }

        function expandRow(index){
            if(vm.num === index )
            {
                vm.num = index;
                vm.show = !vm.show;
            }
            if(vm.num !== index){
                vm.num = index;
                vm.show = true;
            }
            console.log("Row expanded!" + index);
        }

        function processModel(model) {
            var allComics = [];

            model.forEach(function(cmc){
                cmc.data.results.forEach(function (elem) {
                    allComics.push(new Comic(elem));
                });
            });
            return allComics;
        }


        function destroy(){
            vm = query = srcString = comicService = null;
        }
    }
}());
