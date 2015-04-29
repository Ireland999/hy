(function(){
  angular.module('app').service("WorkOrderAPI",WorkOrderAPI);
  WorkOrderAPI.$inject=['$http','$q'];
  function WorkOrderAPI($http,$q){
    //获取拜访工单
    this.GetWorkList=function(obj){
      var deferred=$q.defer();
      $http.post('',obj)
      .success(function(res){
        deferred.resolve(res);
      })
      .error(function(res){
        deferred.reject(res);
      });
      return deferred.promise;
    }
  }
})();