(function(){
  angular.module('app').controller("MyproScancontroller",MyproScancontroller);
  MyproScancontroller.$inject=['$scope','$state','ScanAPI','UserAPI'];
  function MyproScancontroller($scope,$state,ScanAPI,UserAPI){
    //初始化函数
    var MyproLoad=function(){
      //加载人员信息
      var search=location.hash;
      if(!sessionStorage.userId||sessionStorage.userId==undefined){
        UserAPI.getUserId(search.split('?')[0]).then(function(result){
          //返回终端
          console.log(result);
          // if(result[0]==false)return;
          if(sessionStorage.Termnial_name==undefined || !sessionStorage.Termnial_name)return Prompt("你还没有进行终端定位","red");
          // if(result[0]==false)return Prompt("你还没有进行终端定位","red");
          $("#alertbgDiv").remove();
          //终端名称
          $scope.Termnial_name=sessionStorage.Termnial_name;
          //微信扫一扫
          GainSignature();
        });
      }else{
         $("#alertbgDiv").remove();
          //微信扫一扫
          GainSignature();
      }
    };
    //去后台请求拿到签名
    var GainSignature=function(){
      ScanAPI.ScanSignature({url:window.location.href}).then(function(result){
        console.log(result);
        ConfigFun(result);
      });
    };
    //通过签名去调用微信扫一扫接口
    var ConfigFun=function(res){
      console.log(sessionStorage.name);
       wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wxb3c27ef068bf7146', // 必填，公众号的唯一标识
          timestamp:res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature,// 必填，签名，见附录1
          jsApiList: ['scanQRCode','chooseImage','previewImage','uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
       wx.ready(function(){
        console.log(111);
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          Scan();
      });
     };
     //扫一扫返回69码
     var Scan=function(){
      console.log('调用微信扫一扫接口');
      wx.scanQRCode({
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
        // var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        var resultstr=res.resultstr;
        sessionStorage.MyProCode=resultstr.resultstr.split(',')[1];;
        //跳转到竞品采集界面
        $state.go('MyProScanInfo');
        }
      });
    };

    $scope.MyproLoad=MyproLoad;
  }
})();