(function(){
  angular.module('app').controller("LogInfoController",LogInfoController);
  LogInfoController.$inject=['$scope','MyProAPI','$stateParams','UserAPI'];
  function LogInfoController($scope,MyProAPI,$stateParams,UserAPI){
    //初始化函数
    var LogInfoLoad=function(){
      //加载人员信息
      var search=location.hash;
      if(!sessionStorage.userId||sessionStorage.userId==undefined){
        UserAPI.getUserId(search.split('?')[0]).then(function(result){
          //返回终端
          console.log(result);
          if(result[0]==false)return Prompt("你还没有选择终端","red");
          LogInfo();
        });
      } 
    };
     //通过扫码获取我品信息并判断是否串货
    var LogInfo=function(){
      console.log(sessionStorage.MyProCode);
      MyProAPI.GetMyPro({myprocode:sessionStorage.MyProCode}).then(function(result){
        console.log(result);
      });               
    };
    //点击信息维护按钮跳转页面并加载数据对我品信息进行加载
    var myPro=function(){
      var obj={};
      obj.myProCode=$stateParams.MyProId;
      MyProAPI.GetMyProInfo(obj).then(function(result){
        console.log(result);
      });
    };
    //对采集的终端实际存量和终端零售价信息进行保存
    var SaveCollectMyPro=function(){
      var TerminalStock=document.getElementById('TerminalStock');
      var TerminalSalePrice=document.getElementById('TerminalSalePrice');
      var Activity=document.getElementById('Activity');
      //上传图片路径
      var imgsrc=document.getElementsByClassName('imgsrc');
      //终端实际存量
      obj.TerminalStock=TerminalStock.value;
      //终端零售价
      obj.TerminalSalePrice=TerminalSalePrice.value;
      //采集图片
      obj.imgsrc=$scope.serverId;
      //维价描述
      obj.Activity=Activity.innerHTML;
      //我品id
      obj.myp_id=sessionStorage.MyProCode;
      //终端id
      obj.terminal_id=sessionStorage.terminal_id;
      //操作人id
      obj.manager_id=sessionStorage.manager_id;
      MyProAPI.SaveCollectMyPro(obj).then(function(result){
        console.log(result);
      });
    };
    //拍照维价
    var Takephoto=function(){
      //去后台请求拿到签名
      ScanAPI.ScanSignature({url:window.location.href}).then(function(res){
        console.log(res);
         wx.config({
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: 'wxb3c27ef068bf7146', // 必填，公众号的唯一标识
              timestamp:res.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.nonceStr, // 必填，生成签名的随机串
              signature: res.signature,// 必填，签名，见附录1
              jsApiList: ['chooseImage','previewImage','uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
           wx.ready(function(){
            console.log(111);
              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
              takephoto();
          });
      });
    };
//点击拍照或者上传图片
    var takephoto=function(){
      wx.chooseImage({
          success: function (res) {
              $scope.localIds=res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              if($scope.localIds.length>3)return alert('选择图片不能多于三张');
              wx.uploadImage({
                  localId: $scope.localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                  isShowProgressTips: 1, // 默认为1，显示进度提示
                  success: function (res) {
                      $scope.serverId= res.serverId; // 返回图片的服务器端ID
                  }
              });
          }
      });
    };
    $scope.LogInfoLoad=LogInfoLoad;
    $scope.myPro=myPro;
    $scope.SaveCollectMyPro=SaveCollectMyPro;
  }
})();