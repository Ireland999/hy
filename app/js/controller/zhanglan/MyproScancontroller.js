(function(){
  angular.module('app').controller("MyproScancontroller",MyproScancontroller);
  MyproScancontroller.$inject=['$scope','$state','ScanAPI','UserAPI','PositionAPI'];
  function MyproScancontroller($scope,$state,ScanAPI,UserAPI,PositionAPI){
    //初始化函数
    var MyproLoad=function(){
      $("#alertbgDiv1").remove();
      //加载人员信息
      var search=location.hash;
      if(!sessionStorage.userId||sessionStorage.userId==undefined){
        UserAPI.getUserId(search.split('?')[0]).then(function(result){
          //返回终端
          console.log(result);
          PositionAPI.getTermnial().then(function(res){
            res = eval('(' + res + ')');
            $scope.res=res;
            if(res.name==""||res.name==null)return Prompt("你还没有进行终端定位","red");
            $scope.Termnial_name=res.name;
          });
        });
      }else{
         PositionAPI.GetTermnial().then(function(res){
            console.log(res);
            
            if($scope.res.name==""||$scope.res.name==null)return Prompt("你还没有进行终端定位","red");
            $scope.Termnial_name=$scope.res.name;
          });
      }
    };
     //去后台请求拿到签名
    var GainSignature=function(){
      ScanAPI.ScanSignature().then(function(result){
        console.log(result);
        wx.config({
          // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wxb3c27ef068bf7146', // 必填，公众号的唯一标识
          timestamp:result.timestamp, // 必填，生成签名的时间戳
          nonceStr: result.nonceStr, // 必填，生成签名的随机串
          signature: result.signature,// 必填，签名，见附录1
          jsApiList: ['scanQRCode','chooseImage','previewImage','uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
         wx.ready(function(){
          console.log(111);
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
            // var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            var resultstr=res.resultStr;
            $scope.MyPro_code=resultstr.split(',')[1];
            }
          });
        });
      });
    };
    var CollectFunction=function(){
      console.log($scope.MyPro_code);
      if($scope.MyPro_code==undefined){
        Prompt("请先扫码","red");
        return false;
      }
      $state.go('MyProScanInfo',{MyPro_code:$scope.MyPro_code});
    };

    $scope.MyproLoad=MyproLoad;
    $scope.CollectFunction=CollectFunction;
    $scope.GainSignature=GainSignature;
  }
})();