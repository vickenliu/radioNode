
radioApp.controller('chartCtrl', ($scope,radioService) => {
  $scope.stations = [];

  radioService.getTop20Stations().then((data)=>{
    $scope.stations = data ;
  })

  $scope.stationClicked = (station)=>{
    radioService.getStreamUrl(station.id)
        // get the streaming url
        .then((response)=>{
          const arr = response.data.split('#'),
                l   = arr.length,
                index = arr[l-1].indexOf('http');

          return arr[l-1].substr(index)
        })
        .then((stremUrl)=>{
          const radio = document.getElementById('radio')
          radio.pause();
          radio.setAttribute('src', stremUrl);
          radio.play();
        })
  }
})
