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
          stations: (radioService,$rootScope)=>{
            return radioService.getTop20Stations().then((data)=>{
              $rootScope.isloading = false;
              return data ;
            })
          }
        }
      })
      .state('collection', {
        url:'/collection',
        templateUrl:'./views/collection.html',
        controller: 'collectionCtrl'
      })
  })
