radioApp.service('playService',(radioService,
                                mediaService,
                                $rootScope)=>{
  // helper function
  const playStream = (url)=>{
    const radio = document.getElementById('radio')
    radio.setAttribute('src', url);

    const playPromise = radio.play();
    if (playPromise !== undefined) {
      playPromise.then(function() {
        // Automatic playback started!
        console.log('playing start')
        mediaService.updateMediaUI()

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
      return self.currentStationId;
    },

    stationClicked: (attrs)=>{
      $rootScope.currentStationId= attrs.id;
      if(attrs.streamurl){
        playStream(attrs.streamurl)
      }else{
        radioService.getStreamUrl(attrs.id)
                    .then(playStream)
      }
    }

  }

})
