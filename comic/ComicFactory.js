/**
 * Created by Cristian on 6/19/2017.
 */
(function () {
    'use strict';

    angular
        .module('comic')
        .factory("Comic", comicFactory);

    function comicFactory(){

        function Comic(model){
            this.title = model && model.title ? model.title : "NA";
            this.characters = getComicAttribute(model,"characters");
            this.creators =  getComicAttribute(model, "creators");
            this.events =  getComicAttribute(model, "events");
            this.series =  model && model.series && model.series.name
                && model.series.name!=="" ? model.series.name : "None";
            this.stories =  getComicAttribute(model, "stories");
            this.thumbnail = model && model.thumbnail && model.thumbnail.path
                && model.thumbnail.extension ? model.thumbnail.path+"/portrait_medium.jpg" : "None";
        }

        function getComicAttribute(model, attribute){
            var comicAttr = "";
            if( model && model[attribute] && model[attribute].items
            && model[attribute].items.length > 0){

                model[attribute].items.forEach(function(elem){
                comicAttr += elem.name+"; ";
                  });

            }else{
                comicAttr+= "None";
            }

            return comicAttr;
        }

        return Comic;
    }
}());