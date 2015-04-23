(function(){
  angular.module('app').service("CompAPI",CompAPI);
  CompAPI.$inject=['$http','$q'];
  function CompAPI($http,$q){
    //查询工单里要采集的竞品
    this.CompList=function(obj){
      var deferred=$q.defer();
      $http.post('',obj).success(function(rsult){
        deferred.resolve(result);
      })
      .error(function(result){
        deferred.reject(result);
      });
      return deferred.promise;
    }
  }
})();