(function(){
  angular.module('app').service("UserAPI",UserAPI);
  UserAPI.$inject=['$http','$q'];
  function UserAPI($http,$q){
    this.getUserId=function(obj){
      var deferred=$q.defer();
      //通过code值拿到人员信息
      $http.post('api/getUserId',obj)
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