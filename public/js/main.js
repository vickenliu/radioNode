'use strict';

var radioApp = angular.module('RadioApp', ['ui.router']);

radioApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: './views/charts.html',
    controller: 'chartCtrl',
    resolve: {
      stations: function stations(radioService, $rootScope) {
        return $rootScope.stations ? Promise.resolve($rootScope.stations) : radioService.getTop20Stations().then(function (data) {
          $rootScope.isloading = false;
          $rootScope.stations = data;
          return data;
        });
      }
    }
  }).state('collection', {
    url: '/collection',
    templateUrl: './views/collection.html',
    controller: 'collectionCtrl',
    resolve: {
      collections: function collections(localApiService, $rootScope) {
        return $rootScope.collections ? Promise.resolve($rootScope.collections) : localApiService.getCollections().then(function (response) {
          $rootScope.collections = response.data;
          return response.data;
        });
      }
    }
  });
});

radioApp.controller('chartCtrl', function ($scope, stations) {
  $scope.stations = stations;
});

radioApp.controller('collectionCtrl', function ($scope, collections) {
  $scope.collections = collections;
});

radioApp.controller('mediaplayerCtrl', function ($scope, $rootScope) {
  $rootScope.buttonStatus = 'pause';

  var radio = document.getElementById('radio');

  $scope.buttonClicked = function () {
    if ($rootScope.buttonStatus === 'pause') {
      $rootScope.buttonStatus = 'play';
      radio.play();
    } else {
      $rootScope.buttonStatus = 'pause';
      radio.pause();
    }
  };

  if (window.localStorage.volume) {
    radio.volume = window.localStorage.volume;
    $scope.volume = window.localStorage.volume;
  }

  $scope.adjustVolum = function (volume) {
    if (volume) {
      radio.volume = parseFloat(volume).toFixed(1);
      window.localStorage.volume = parseFloat(volume).toFixed(1);
    }
  };
});

radioApp.controller('stationCtrl', function ($scope) {
  $scope.num = 23;
});

radioApp.directive('mediaplayer', function () {
  return {
    restrict: 'AE',
    controller: 'mediaplayerCtrl',
    templateUrl: "./views/mediaplayer.html"
  };
});

radioApp.directive('station', function () {
  return {
    restrict: 'AE',
    scope: {
      data: '=',
      current: '='
    },
    templateUrl: "./views/station.html"
  };
});

radioApp.directive('stream', function (playService, $rootScope, mediaService) {
  return {
    restrict: 'A',
    link: function link($scope, elem, attrs) {
      // ele is the element the directive applied to
      // attrs are the attributes the element has
      elem.bind('click', function () {
        playService.stationClicked(attrs);
        $rootScope.buttonStatus = 'pause';
      });
    }
  };
});

console.log('this is from factory hey');

radioApp.service('localApiService', function ($http) {
  return {
    getCollections: function getCollections() {
      return $http({
        url: 'http://localhost:3000/collections'
      });
    }
  };
});

radioApp.service('mediaService', function ($rootScope) {
  var radio = document.getElementById('radio'),
      toggleButton = $('.mediaplayer_toggle-button'),
      currentTime = $('.mediaplayer_current-time'),
      stationName = $('.mediaplayer_radio-name');
  return {
    updateMediaUI: function updateMediaUI() {
      toggleButton.click();
      $rootScope.currentStationId ? stationName.text($('#' + $rootScope.currentStationId).data('name')) : stationName.text('radio name');
      $(radio).bind('timeupdate', function () {

        var mins = Math.floor(radio.currentTime / 60, 10);
        var secs = Math.floor(radio.currentTime, 10) - mins * 60;

        if (!isNaN(mins) || !isNaN(secs)) {
          currentTime.text(mins + ':' + (secs > 9 ? secs : '0' + secs));
        }
      });
    }
  };
});

radioApp.service('playService', function (radioService, mediaService, $rootScope) {
  // helper function
  var playStream = function playStream(url) {
    var radio = document.getElementById('radio');
    radio.setAttribute('src', url);

    var playPromise = radio.play();
    if (playPromise !== undefined) {
      playPromise.then(function () {
        // Automatic playback started!
        console.log('playing start');
        mediaService.updateMediaUI();
      }).catch(function (error) {
        // Automatic playback failed.
        // Show a UI element to let the user manually start playback.
        $('.currentStation').removeClass('currentStation');
        alert('this station is not available at the moment');
      });
    }
  };

  return {
    currentStationId: 'hi',

    getCurrentStation: function getCurrentStation() {
      return self.currentStationId;
    },

    stationClicked: function stationClicked(attrs) {
      $rootScope.currentStationId = attrs.id;
      if (attrs.streamurl) {
        playStream(attrs.streamurl);
      } else {
        radioService.getStreamUrl(attrs.id).then(playStream);
      }
    }

  };
});

radioApp.service('radioService', function ($http, $q, $rootScope) {

  return {
    getTop20Stations: function getTop20Stations() {
      var url = '/proxy?url=http://api.shoutcast.com/legacy/Top500?k=QVmydVad1rTssRzC&limit=20';
      $rootScope.isloading = true;
      return $http({ url: url }).then(function (response) {
        var stations = $(response.data).find('station').map(function (i, station) {
          return {
            name: $(station).attr('name'),
            id: $(station).attr('id'),
            genre: $(station).attr('genre')
          };
        });
        return stations;
      });
    },

    getStreamUrl: function getStreamUrl(id) {
      var url = '/proxy?url=http://yp.shoutcast.com/sbin/tunein-station.m3u?id=' + id;

      return $http({ url: url }).then(function (response) {
        var arr = response.data.split('#'),
            l = arr.length,
            index = arr[l - 1].indexOf('http');
        return arr[l - 1].substr(index);
      });
    }

  };
});