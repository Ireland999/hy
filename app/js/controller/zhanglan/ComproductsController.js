(function(){
  angular.module('app').controller("ComproductsController",ComproductsController);
  ComproductsController.$inject=['$scope','$stateParams','CompAPI'];
  function ComproductsController($scope,$stateParams,CompAPI){
    //标识是否去后台请求数据true可以请求false不可以请求
      var state=false;
      var page=1;
    //初始化函数
    var ComproductsLoad=function(){
      document.title="竞品调研";
      LoadMore();
      console.log($stateParams);
    };
    //工单里的竞品
    var LoadMore=function(Listcount){
      var pageCount=2;
      var obj={};
      //每页显示数据
      obj.pageCount=10;
      //页码
      obj.page=page;
      //员工号
      obj.userCode=sessionStorage.userCode;
      //工单id
      obj.IssuedId=$stateParams.IssuedId;
      
      if(state==true)return;
      state=true;
        var start=parseInt(pageCount)*(parseInt(page-1));
        var end=start+parseInt(pageCount);
        console.log(end);
          if(page>(Listcount/pageCount)){
            return;
          }else{
            CompAPI.CompList(obj).then(function(result){
              console.log(result);
            });
                $scope.items=[
                      {IssuedId:1,FactoryName:'三金药业消渴降糖胶囊消渴降糖胶囊消渴降糖胶囊',DrugsName:'消渴降糖胶囊'},
                      {IssuedId:2,FactoryName:'振林药业',DrugsName:'消渴降糖胶囊'},
                      {IssuedId:3,FactoryName:'三金药业',DrugsName:'止咳糖浆'}
                   ];
              if(page==(Listcount/pageCount)){
                var nonore=document.getElementById('nomore');
                nonore.innerHTML = nonore.innerHTML+'已经是最后了~';
                var LoadMore=document.getElementsByClassName('loadmore');
                console.log(LoadMore);
                LoadMore[0].innerHTML="";
              }
          }
        page ++;
        state = false
      console.log($scope.items);
    };
     //阅读全文的展开与收起
    var ShowAll=function(IssuedId){
      console.log(IssuedId);
      $scope.flag=false;
      var showall=document.getElementsByClassName('showall');
      var getmore=document.getElementsByClassName('getmore');
      for(var i=0;i<$scope.items[2].length;i++){
        if(IssuedId==$scope.items[2][i].IssuedId){
          if(showall[i].innerHTML=="阅读全文"){
            $scope.flag=true;
            $scope.items[2][i].flag=$scope.flag;
            console.log($scope.items[2][i]);
            showall[i].innerHTML='收起';
            console.log(getmore[i].className);
            $(getmore[i]).removeClass('ng-hide');
          }else{
            $scope.flag=false;
            $scope.items[2][i].flag=$scope.flag;
            showall[i].innerHTML='阅读全文';
            $(getmore[i]).addClass('ng-hide');
          }
        }
      }   
    };
    $scope.ComproductsLoad=ComproductsLoad;
    $scope.LoadMore=LoadMore;
    $scope.ShowAll=ShowAll;
  }
})();