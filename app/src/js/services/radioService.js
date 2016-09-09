

radioApp.service('radioService', ($http,$q) => {

  return {
    getTop20Stations : () => {
      const url = '/proxy?url=http://api.shoutcast.com/legacy/Top500?k=QVmydVad1rTssRzC&limit=20';

      return $http({url}).then((response)=>{
        const stations = $(response.data).find('station').map((i,station)=>{
          return {
              name : $(station).attr('name'),
              id   : $(station).attr('id'),
              genre   : $(station).attr('genre')
          }
        });
        return stations;
      })
   },

   getStreamUrl : (id) => {
     const url = '/proxy?url=http://yp.shoutcast.com/sbin/tunein-station.m3u?id='+id;

     return $http( { url } );
   }

  }
})
