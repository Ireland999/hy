(function(){
  angular.module('app').directive('test',Test);
  function Test(){
    return {
      template: [
        '<select>',
          '<option ng-repeat="item in items">{{item.text}}</option>',
        '</select>'
      ].join(''),
       controller: TestDriectiveController
    };
  }
  TestDriectiveController.$inject=['$scope','TestAPI'];
  function TestDriectiveController($scope,TestAPI){
    // TestAPI.test().then(function(result){
    //   $scope.items=result;
    // });
      
    }
})();
  