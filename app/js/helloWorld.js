(function(){
  angular.module('app').directive('test',Test);
  Test.$inject=['TestAPI'];
  function Test(TestAPI){
    return {
      template: [
        '<select>',
          '<option ng-repeat="item in items">{{item}}</option>',
        '</option>'
      ].join(''),
      test: TestAPI.test
    };
  }
})();
  