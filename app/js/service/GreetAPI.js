(function(){
  angular.module('app').service("GreetAPI",GreetAPI);
  GreetAPI.$inject=['$http','$q'];
  function GreetAPI($http,$q){
    //根据用户和当前地理位置查询附近终端
    this.chooseTermnial=function(obj){
      var deferred=$q.defer();
      $http.post('api/getTermnial',obj)
      .success(function(result){
        deferred.resolve(result);
      })
      .error(function(result){
        deferred.reject(result);
      });
      return deferred.promise;
    }
  }
})();