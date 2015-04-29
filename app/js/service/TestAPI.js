(function(){
  angular.module('app').service("TestAPI",TestAPI);
  TestAPI.$inject=['$http'];
  function TestAPI($http){
    //测试driective
    this.test=function(){
      $http.get('api/')
      .success(function (result) {
        
       });
    }
  }
})();