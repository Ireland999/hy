(function(){
  angular.module('app').service("PositionAPI",PositionAPI);
  PositionAPI.$inject=['$http','$q'];
  function PositionAPI($http,$q){
    //获取附近终端
    this.GetTemList=function(obj){
      var deferred=$q.defer();
      $http.post('',obj)
      .sucess(function(result){
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
      .sucess(function(result){
        deferred.resolve(result);
      })
      .error(function(result){
        deferred.reject(result);
      });
      return deferred.promise;
    }
  }
})();