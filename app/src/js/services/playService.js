radioApp.service('playService',(radioService)=>{
  const playStream = (url)=>{
    const radio = document.getElementById('radio')
    radio.pause();
    radio.setAttribute('src', url);
    radio.play();
  }
  let stationId;
  return {
    currentStationId: stationId,
    getCurrentStation: ()=>{
      return this.currentStationId;
    },
    stationClicked: (id)=>{
      stationId= id;
      radioService.getStreamUrl(id)
                  .then(playStream)
    }
  }

})
