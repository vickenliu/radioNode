
radioApp.service('localApiService', ($http)=>{
  return {
    getCollections : ()=>{
      return $http({
        url:'/collections'
      });
    }
  }
})
