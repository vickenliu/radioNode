radioApp.directive('mediaplayer',()=>{
  return {
    restrict: 'AE',
    controller: 'mediaplayerCtrl',
    templateUrl: "./views/mediaplayer.html"
  };
});
