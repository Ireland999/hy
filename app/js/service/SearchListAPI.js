(function(){
  angular.module('app').service("SearchListAPI",SearchListAPI);
  SearchListAPI.$inject=['$http','$q'];
  function SearchListAPI($http,$q){
    //加载待处理工单
    this.SearchPendingList=function(obj){
      var deferred=$q.defer();
      $http.post('',obj).success(function(result){
        deferred.resolve(result);
      })
      .error(function(result){
        deferred.reject(result);
      });
      return deferred.promise;
    },
    //已处理工单查询
    this.SearchResolveList=function(obj){
      var deferred=$q.defer();
      $http.post('',obj).success(function(result){
        deferred.resolve(result);
      })
      .error(function(result){
        deferred.reject(resolve);
      });
      return deferred.promise;
    }
  }
})();