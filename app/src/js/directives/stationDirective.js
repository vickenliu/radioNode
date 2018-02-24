radioApp.directive('station',()=>{
  return {
    restrict: 'AE',
    scope: {
      data: '=',
      current: '='
    },
    templateUrl: "./views/station.html"
  };
});
