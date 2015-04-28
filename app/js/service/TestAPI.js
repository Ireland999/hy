(function(){
  angular.module('app').service("TestAPI",TestAPI);
  TestAPI.$inject=['$http','$q'];
  function TestAPI($http,$q){
    //根据用户和当前地理位置查询附近终端
    this.test=function(scope, element, attrs){
      console.log(scope);
      var deferred=$q.defer();
      $http.get(attrs.source)
      .success(function(result){
        console.log(result);
        $scope.items = result;
      });
    }
  }
})();