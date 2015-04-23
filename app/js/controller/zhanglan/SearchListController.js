(function(){
  angular.module('app').controller("SearchListController",SearchListController);
  SearchListController.$inject=['$scope'];
  function SearchListController($scope){
    var SearchListLoad=function(){
      sessionStorage.TerminalName="大众宝泰医药（现代店）";
      $scope.TerminalName=sessionStorage.TerminalName;
    };
    $scope.SearchListLoad=SearchListLoad;
  }
})();