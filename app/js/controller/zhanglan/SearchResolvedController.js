(function(){
  angular.module('app').controller("SearchResolvedController",SearchResolvedController);
  SearchResolvedController.$inject=['$scope','SearchListAPI','$stateParams','UserAPI'];
  function SearchResolvedController($scope,SearchListAPI,$stateParams,UserAPI){
    //标识是否去后台请求数据true可以请求false不可以请求
      var state=false;
      var page=1;
    //初始化函数
    var SearchResolvedLoad=function(){
      document.title="竞品调研";
      //加载人员信息
      var search=location.hash;
      if(!sessionStorage.userId||sessionStorage.userId==undefined){
        UserAPI.getUserId(search.split('?')[0]).then(function(result){
          //返回终端
          console.log(result);
          if(result[0]==false)return;
          LoadMore();
        });
      }
    };
    //加载更多的下发工单
    var LoadMore=function(Listcount){
      var pageCount=2;
      var obj={};
      //每页显示数据
      obj.count=pageCount;
      //页码
      obj.page=page;
      //用户id
      sessionStorage.userCode='785f9ea7-058b-48fe-bc8e-ef647b4ae0c8';
      obj.user_id=sessionStorage.userCode;
      //已处理工单标识  0
      obj.Pending=0;
      if(obj.Pending!=0)return;
      if(state==true)return;
      state=true;
        var start=parseInt(pageCount)*(parseInt(page-1));
        var end=start+parseInt(pageCount);
        console.log(end);
          if(page>(Listcount/pageCount)){
            return;
          }else{
            console.log(obj);
            SearchListAPI.SearchResolveList(obj).then(function(result){
              console.log(result);
              if(result[0]==false)return;
              $scope.Listcount=result[2];
              console.log(result[3]);
              $scope.items=result[3].map(function(data){
                console.log(data);
                return {
                  //下达工单人
                  IssuedName:data.user_name,
                  //下达时间
                  timestamp:data.ts,
                  //调研内容
                  IssuedContent:data.comp_list,
                  //工单id
                  IssuedId:data.list_id,
                  //模板id
                  template_id:data.template_id,
                  //默认隐藏超出部分内容
                  flag:false,
                  len:data.comp_list.length
                }
              });
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
    $scope.SearchResolvedLoad=SearchResolvedLoad;
    $scope.LoadMore=LoadMore;
    $scope.ShowAll=ShowAll;
  }
})();