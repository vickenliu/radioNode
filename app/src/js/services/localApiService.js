
radioApp.service('localApiService', ($http)=>{
  return {
    getCollections : ()=>{
      return $http({
        url:'http://localhost:3000/collections'
      });
    }
  }
})
