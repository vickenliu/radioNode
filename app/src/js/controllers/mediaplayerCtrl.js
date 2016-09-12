radioApp.controller('mediaplayerCtrl', ($scope, $rootScope)=>{
  $rootScope.buttonStatus='pause';

  const radio = document.getElementById('radio')

  $scope.buttonClicked = ()=>{
    if($rootScope.buttonStatus === 'pause'){
      $rootScope.buttonStatus='play';
      radio.play();
    }else{
      $rootScope.buttonStatus='pause';
      radio.pause();
    }
  }

  if(window.localStorage.volume){
    radio.volume =  window.localStorage.volume;
    $scope.volume = window.localStorage.volume;
  }

  $scope.adjustVolum = (volume)=>{
    if(volume){
      radio.volume = parseFloat(volume).toFixed(1);
      window.localStorage.volume = parseFloat(volume).toFixed(1);
    }
  }
})
