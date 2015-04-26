(function(){
  angular.module('app').controller("ModelController",ModelController);
  ModelController.$inject=['$scope','ModelAPI'];
  function ModelController($scope,ModelAPI){
    var id=1;
    var state = true;
    var ModelLoad=function(){
      ModelAPI.test().then(function(res){
        console.log(res);
      });
    };
    var testSession=function(){
       console.log(11);
        name=id+'名字';
        var sessionStorage=[];
        var data = {};  
        data['id'] = id;  
        data['name'] = name;  
        $scope.testSession=sessionStorage.setItem('data'+id,JSON.stringify(data));
        var data = JSON.parse(sessionStorage.getItem('data'+id));  
        console.log(data);
        id++;
        console.log(id);
    };
    $scope.ModelLoad=ModelLoad;
    $scope.testSession=testSession;
  }
})();