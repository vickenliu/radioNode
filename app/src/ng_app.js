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
        controller: 'chartCtrl'
      })
  })