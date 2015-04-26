(function(){
  angular.module('app').service("MyProAPI",MyProAPI);
  MyProAPI.$inject=['$http','$q'];
  function MyProAPI($http,$q){
    //通过扫码获取我品信息并判断是否串货
    this.GetMyPro=function(obj){
      var deferred=$q.defer();
      $http.post('',obj)
      .success(function(result){
        deferred.resolve(result);
      })
      .error(function(result){
        deferred.reject(result);
      });
      return deferred.promise;
    },
    //保存采集我品信息
    this.SaveCollectMyPro=function(obj){
      var deferred=$q.defer();
      $http.post('',obj)
      .success(function(result){
        deferred.resolve(result);
      })
      .error(function(result){
        deferred.reject(result);
      });
      return deferred.promise;
    },
    //加载我品信息
    this.GetMyProInfo=function(obj){
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