(function(){
  angular.module('app').controller("ComproductsController",ComproductsController);
  ComproductsController.$inject=['$scope','$stateParams','SearchListAPI','UserAPI'];
  function ComproductsController($scope,$stateParams,SearchListAPI,UserAPI){
    //标识是否去后台请求数据true可以请求false不可以请求
      var state=false;
      var page=1;
    //初始化函数
    var ComproductsLoad=function(){
      document.title="竞品调研";
      if(sessionStorage.obj==undefined)return;
      var obj=sessionStorage.obj;
      var row1=document.getElementsByClassName('row1');
      for(var i=0;i<sessionStorage.obj.length;i++){
        if(sessionStorage.obj.comp_id==$scope.items[i].comp_id){
          // $(row1).addClass('')
        }
      }
      //加载人员信息
      
      var search=location.hash;
      if(!sessionStorage.userId||sessionStorage.userId==undefined){
        UserAPI.getUserId(search.split('?')[0]).then(function(result){
          //返回终端
          console.log(result);
          if(result[0]==false)return;
          //终端名称
          $scope.Termnial_name=Termnial_name;
          LoadMore();
        });
      }
      
      console.log($stateParams);
    };
    //工单里的竞品
    var LoadMore=function(Listcount){
      var pageCount=10;
      var obj={};
      //每页显示数据
      obj.count=pageCount;
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
            SearchListAPI.CompList(obj).then(function(result){
              console.log(result);
              $scope.items=result[2].map(function(data){
                return {
                  //竞品id
                  CompId:data.CompId,
                  //竞品生产厂商
                  FactoryName:data.FactoryName,
                  //竞品名称
                  DrugsName:data.DrugsName
                }
              })
            });
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