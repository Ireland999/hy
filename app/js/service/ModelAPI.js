(function(){
  angular.module('app').service("ModelAPI",ModelAPI);
  ModelAPI.$inject=['$http','$q'];
  function ModelAPI($http,$q){
    //保存调研信息
    this.test=function(obj){
      var deferred=$q.defer();
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