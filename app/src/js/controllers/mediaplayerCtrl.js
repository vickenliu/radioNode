radioApp.controller('mediaplayerCtrl', ($scope)=>{
  $scope.buttonStatus='pause';

  const radio = document.getElementById('radio')

  $scope.buttonClicked = ()=>{
    if($scope.buttonStatus === 'pause'){
      $scope.buttonStatus='play';
      radio.play();
    }else{
      $scope.buttonStatus='pause';
      radio.pause();
    }
  }
})
