(function(){
  angular.module('app').service("SearchListAPI",SearchListAPI);
  SearchListAPI.$inject=['$http','$q','$timeout'];
  function SearchListAPI($http,$q, $timeout){
  //  console.log( $timeout);
    //加载待处理工单
    this.SearchPendingList=function(obj){
      var deferred=$q.defer();
      $http.post('api/workList/w_showWorkList',obj)
      .success(function(result){
        deferred.resolve(result);
      }).error(function(result){
        deferred.reject(result);
      });
      return deferred.promise;
    },
    //已处理工单查询
    this.SearchResolveList=function(obj){
      var deferred=$q.defer();
      console.log(obj);
      $http.post('api/workList/w_showWorkList',obj).success(function(result){
        deferred.resolve(result);
      })
      .error(function(result){
        deferred.reject(result);
      });
      return deferred.promise;
    },
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
    },
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