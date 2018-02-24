'use strict';

var radioApp = angular.module('RadioApp', [
    'ui.router'
]);

  radioApp.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url:'/',
        templateUrl:'./views/charts.html',
        controller: 'chartCtrl',
        resolve: {
          stations: (radioService, $rootScope)=>{
            return $rootScope.stations ? 
                   Promise.resolve($rootScope.stations) : 
                   radioService.getTop20Stations().then((data)=>{
                     $rootScope.isloading = false;
                     $rootScope.stations = data;
                     return data ;
                   });
          }
        }
      })
      .state('collection', {
        url:'/collection',
        templateUrl:'./views/collection.html',
        controller: 'collectionCtrl',
        resolve: {
          collections: (localApiService, $rootScope)=>{
            return $rootScope.collections ? 
                  Promise.resolve($rootScope.collections) : 
                  localApiService.getCollections().then((response)=>{
                      $rootScope.collections = response.data; 
                      return response.data;
                  })
          }
        }
      })
  })
