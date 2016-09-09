radioApp.directive('station',()=>{
  return {
    restrict: 'AE',
    scope: {
      data: '='
    },
    templateUrl: "./views/station.html"
  };
});
