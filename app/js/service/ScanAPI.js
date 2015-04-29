(function(){
  angular.module('app').service("ScanAPI",ScanAPI);
  ScanAPI.$inject=['$http','$q'];
  function ScanAPI($http,$q){
    //获取签名
    this.ScanSignature=function(){
      var deferred=$q.defer();
      //拿到签名调用微信jssdk api/sign
      $http.post('api/sign',{url:window.location.href})
      .success(function(result){
        deferred.resolve(result);
      }).error(function(result){
        deferred.reject(result);
      });
      return deferred.promise;
    },
    //保存采集信息
    this.saveCollectInfo=function(obj){
      console.log(obj);
      var deferred=$q.defer();
      $http.post('api/comp/saveCc',obj)
      .success(function(result){
        deferred.resolve(result);
      }).error(function(result){
        deferred.reject(result);
      });
      return deferred.promise;
    },
    //检测是竞品异动还是新竞品并返回产品信息
    this.scanVerify=function(obj){
      console.log('检测是竞品异动还是新竞品'+obj);
      var deferred=$q.defer();
      $http.post('api/comp/compIsExistRe',obj)
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