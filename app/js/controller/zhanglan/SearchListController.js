(function(){
  angular.module('app').controller("SearchListController",SearchListController);
  SearchListController.$inject=['$scope','UserAPI'];
  function SearchListController($scope,UserAPI){
    var SearchListLoad=function(){
      //加载人员信息
      var search=location.hash;
      console.log(search);
      if(!sessionStorage.userId||sessionStorage.userId==undefined){
        UserAPI.getUserId(search.split('?')[0]).then(function(result){
          //返回终端
          console.log(result);
          if(result[0]==false)return Prompt("你还没有选择终端","red");
        });
      }
    };
    $scope.SearchListLoad=SearchListLoad;
  }
})();