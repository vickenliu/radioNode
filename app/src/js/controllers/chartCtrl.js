
radioApp.controller('chartCtrl', ($scope,
                                  playService,
                                  stations) => {
  $scope.stations = stations;

  console.log(playService.getCurrentStation())
})
