(function(){
  angular.module('app').service("PositionAPI",PositionAPI);
 PositionAPI.$inject=['$http','$q'];
  function PositionAPI($http,$q){
    //获取附近终端
    this.GetTemList=function(obj){
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
    //保存采集的终端的经纬度
    this.SaveTemInfo=function(obj){
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
    //把选中终端存到后台session中
    this.saveTermnial=function(obj){
      var deferred=$q.defer();
      $http.post('api/session',obj)
      .success(function(result){
        deferred.resolve(result);
      })
      .error(function(result){
        deferred.reject(result);
      });
      return deferred.promise;
    },
    //获取session中的终端
    this.getTermnial=function(){
      console.log(1);
    var deferred=$q.defer();
    console.log(11);
      $http.post('api/getsession')
      .success(function(result){
        console.log(result);
        deferred.resolve(result);
      })
      .error(function(result){
        deferred.reject(result);
      });
      return deferred.promise;
    }
  }
})();