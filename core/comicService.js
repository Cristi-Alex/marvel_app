/**
 * Created by Cris on 17.06.2017.
 */
(function () {
    'use strict';

    angular
        .module("core")
        .service('comicService', ComicService);

    ComicService.$inject = ['$http', '$q', 'PRIVATE_KEY', 'PUBLIC_KEY'];
    function ComicService($http, $q, PRIVATE_KEY, PUBLIC_KEY) {
        var _comicData;

        this.load = load;
        this.getComics = getComics;

        function load(type, srcString) {
            var timeStamp = Date.now();
            var hashKey = timeStamp+PRIVATE_KEY+PUBLIC_KEY;
            var hash = md5(hashKey);
            var urlToGet;
            var ENDPOINT = 'https://gateway.marvel.com/v1/public/';
            var urlGetByType, urlGetComics;
            var promis;
            var promises=[];
            _comicData=undefined;


            urlToGet = ENDPOINT+'comics?ts='+timeStamp+'&apikey='+PUBLIC_KEY+'&hash='+hash;

            if(type!=="" && srcString!==""){
                urlGetByType = ENDPOINT+type+'?nameStartsWith='+srcString+'&ts='+timeStamp+'&apikey='+PUBLIC_KEY+'&hash='+hash;
                promis = makeRequest(urlGetByType)
                    .then(function (response) {
                        var data = response.data.results;
                        data.forEach(function (element) {
                            urlGetComics = ENDPOINT+type+'/'+element.id+'/'+'comics?ts='+timeStamp+'&apikey='+PUBLIC_KEY+'&hash='+hash;
                            promises.push(makeRequest(urlGetComics));
                        });

                        return $q.all(promises).then(function (response) {
                            _comicData = response;
                            return _comicData;
                        }).catch(function (error) {
                            console.log(error);
                            return $q.reject(error);
                        });

                    }).catch(function (error) {
                        console.log(error);
                        return $q.reject(error);
                    });
            }else{
                promis = makeRequest(urlToGet)
                    .then(function (response) {
                        _comicData = [response];
                        return response;
                    }).catch(function (error) {
                        console.log(error);
                        return $q.reject(error);
                    });
            }

            return promis;
        }

        function makeRequest(urlToGet) {
            var data;

            return $http({
                method:'GET',
                url: urlToGet
            }).then(function success(response) {
                data = response && response.data
                    ? response.data : {};

                Object.freeze(data);

                console.log("Comics loaded!");
                return data;
            }).catch(function error(response) {
                console.log(response);
                return $q.reject(error);
            });
        }

        function getComics() {
            return _comicData;
        }

    }
}());