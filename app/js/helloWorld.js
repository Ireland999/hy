(function(){
  angular.module('app').directive("helloWorld",helloWorld);
  function helloWorld(){
    return {
      scope: {},  // use a new isolated scope
      restrict: 'AE',
      replace: 'true',
      template: '<h3>Hello World!!</h3>'
    };
  }
})();
  