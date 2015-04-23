(function(){
  angular.module('app').service("CompetitorAPI",CompetitorAPI);
  CompetitorAPI.$inject=['$http','$q'];
  function CompetitorAPI($http,$q){
    //保存调研信息
    this.saveComInfo=function(obj){
      var deferred=$q.defer();
      $http.post('',obj)
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