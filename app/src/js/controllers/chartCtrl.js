
radioApp.controller('chartCtrl', ($scope,
                                  playService,
                                  mediaService,
                                  stations) => {
  $scope.stations = stations;

  mediaService.updateActiveStation();
})
