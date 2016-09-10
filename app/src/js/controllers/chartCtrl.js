
radioApp.controller('chartCtrl', ($scope,
                                  radioService,
                                  playService) => {
  $scope.stations = [];

  radioService.getTop20Stations().then((data)=>{
    $scope.stations = data ;
  })

})
