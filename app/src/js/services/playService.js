radioApp.service('playService',(radioService)=>{
  // helper function
  const playStream = (url)=>{
    const radio = document.getElementById('radio')
    radio.pause();
    radio.setAttribute('src', url);
    const playPromise = radio.play();
    if (playPromise !== undefined) {
      playPromise.then(function() {
        // Automatic playback started!
        console.log('playing start')
      }).catch(function(error) {
        // Automatic playback failed.
        // Show a UI element to let the user manually start playback.
        $('.currentStation').removeClass('currentStation');
        alert('this station is not available at the moment')
      });
    }
  }

  return {
    currentStationId: 'hi',
    getCurrentStation: ()=>{
      console.log('this is self',self)
      return self.currentStationId;
    },
    stationClicked: (id)=>{
      self.currentStationId= id;
      radioService.getStreamUrl(id)
                  .then(playStream)
    }
  }

})
