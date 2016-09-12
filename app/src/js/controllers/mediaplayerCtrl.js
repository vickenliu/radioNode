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
})
