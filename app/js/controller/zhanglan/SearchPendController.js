(function(){
  angular.module('app').controller("SearchPendController",SearchPendController);
  SearchPendController.$inject=['$scope','SearchListAPI'];
  function SearchPendController($scope,SearchListAPI){
    //标识是否去后台请求数据true可以请求false不可以请求
      var state=false;
      var page=1;
    //初始化函数
    var SearchPendLoad=function(){
      document.title="竞品调研";
      LoadMore();
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
            SearchListAPI.SearchPendingList(obj).then(function(result){
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
    $scope.LoadMore=LoadMore;
    var ConfigFun=function(){
      wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wx7e982df0ff12914e', // 必填，公众号的唯一标识
          timestamp:1427440956 , // 必填，生成签名的时间戳
          nonceStr: '53ab4296-f6f2-4907-b822-00095296488f', // 必填，生成签名的随机串
          signature: '0a7c31712b7bbb3de92beceeae2589c9ab218e88',// 必填，签名，见附录1
          jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(function(){
        console.log(111);
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          Scan();
      });
      wx.error(function(res){
        alert(res.errMsg);

      });
    };
    var Scan=function(){
      console.log('调用微信扫一扫接口');
      alert('nihao');
      wx.scanQRCode({
          needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          console.log(result);
          console.log('调用成功');
      }
      });
    };
    $scope.SearchPendLoad=SearchPendLoad;
    $scope.ShowAll=ShowAll;
    $scope.ConfigFun=ConfigFun;
  }
})();