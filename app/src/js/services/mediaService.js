radioApp.service('mediaService',($rootScope)=>{
  const radio = document.getElementById('radio'),
        toggleButton = $('.mediaplayer_toggle-button'),
        currentTime = $('.mediaplayer_current-time'),
        stationName = $('.mediaplayer_radio-name');
  return {
    updateMediaUI: ()=>{
        toggleButton.click();
        $rootScope.currentStationId ? stationName.text($('#'+$rootScope.currentStationId).data('name')) :
                                      stationName.text('radio name');
        $(radio).bind('timeupdate', ()=> {

          var mins = Math.floor(radio.currentTime / 60,10);
          var secs = Math.floor(radio.currentTime, 10) - mins * 60;

          if ( !isNaN(mins) || !isNaN(secs) ) {
              currentTime.text(mins + ':' + (secs > 9 ? secs : '0' + secs));
          }

      });
    }
  }
})
