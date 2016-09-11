
radioApp.controller('chartCtrl', ($scope,
                                  radioService,
                                  playService,
                                  $rootScope) => {
  $scope.stations = [];

  radioService.getTop20Stations().then((data)=>{
    $scope.stations = data ;
    $rootScope.isloading = false;
  })

  console.log(playService.getCurrentStation())
})
