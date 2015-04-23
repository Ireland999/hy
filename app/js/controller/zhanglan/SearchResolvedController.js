(function(){
  angular.module('app').controller("SearchResolvedController",SearchResolvedController);
  SearchResolvedController.$inject=['$scope','SearchListAPI'];
  function SearchResolvedController($scope,SearchListAPI){
    //标识是否去后台请求数据true可以请求false不可以请求
      var state=false;
      var page=1;
    //初始化函数
    var SearchResolvedLoad=function(){
      document.title="竞品调研";
      LoadMore();
    };
    //加载更多的下发工单
    var LoadMore=function(Listcount){
       console.log(sessionStorage.name);
      var pageCount=2;
      var obj={};
      //每页显示数据
      obj.pageCount=10;
      //页码
      obj.page=page;
      obj.userCode=sessionStorage.userCode;

      if(state==true)return;
      state=true;
        var start=parseInt(pageCount)*(parseInt(page-1));
        var end=start+parseInt(pageCount);
        console.log(end);
          if(page>(Listcount/pageCount)){
            return;
          }else{
            SearchListAPI.SearchResolveList(obj).then(function(result){
              console.log(result);
            });
               $scope.items=[
                  {DrugstoreName:'大众宝泰医药（现代店）'},
                  {ListCount:'6'},
                  [
                  {
                    IssuedId:1,
                    IssuedName:'001单品委员会下达',
                    timestamp:'2015-03-01',
                    IssuedContent:'调研三金药业 消渴降糖胶囊、通化长城药业 消渴降糖胶囊的销售价格和销售活动.调研三金药业 消渴降糖胶囊、通化长城药业 消渴降糖胶囊的销售价格和销售活动.',
                    flag:false,
                    rank:1
                  },
                  {IssuedId:2,
                    IssuedName:'001单品委员会下达',
                    timestamp:'2015-03-01',
                    IssuedContent:'调研三金药业 消渴降糖胶囊、通化长城药业 消渴降糖胶囊的销售价格和销售活动.',
                    flag:false,
                    rank:2
                  }
                    ]
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
    $scope.SearchResolvedLoad=SearchResolvedLoad;
    $scope.LoadMore=LoadMore;
    $scope.ShowAll=ShowAll;
  }
})();