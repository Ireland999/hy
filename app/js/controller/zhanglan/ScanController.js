(function(){
  angular.module('app').controller("ScanController",ScanController);
  ScanController.$inject=['$scope','$state','ScanAPI'];
  function ScanController($scope,$state,ScanAPI){
    var ScanLoad=function(){
      console.log(wx);
      GainSignature();
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
        sessionStorage.resultstr='resultstr';
        //跳转到竞品采集界面
        $state.go('appManager');
        }
      });
    };
    //请求后台检测是新竞品还是竞品异动并返回药品信息
    var ScanData=function(){
      $scope.comp_code=sessionStorage.comp_code;
      ScanAPI.scanVerify({comp_code:$scope.comp_code}).then(function(result){
        console.log(result);
        $scope.competitorInfo=result[2].map(function(data){
          return {
            //竞品编码
            comp_code:data.comp_code,
            //竞品名称
            comp_name:data.comp_name,
            //规格
            comp_spec:data.comp_spec,
            //竞品厂商
            comp_manufacturer:data.comp_manufacturer
          }
        })[0];
      });
    };
    // //测试扫描后跳转页面及抓取数据
    var clickScan=function(){
      //  6934805500011 验证爬虫  0001验证数据库中有的值
       sessionStorage.comp_code='6930537502514';
       $state.go('appManager');
    };
    //测试
    var load69=function(){
      console.log(sessionStorage.comp_code);
      $scope.comp_code=sessionStorage.comp_code;
      ScanAPI.scanVerify({comp_code:$scope.comp_code}).then(function(result){
        console.log(result);
        console.log(result[2][0]);
        $scope.competitorInfo=result[2].map(function(data){
          return {
            //竞品编码
            comp_code:data.comp_code,
            //竞品名称
            comp_name:data.comp_name,
            //规格
            comp_spec:data.comp_spec,
            //竞品厂商
            comp_manufacturer:data.comp_manufacturer
          }
        })[0];
      });
    };
    $scope.load69=load69;
    $scope.clickScan=clickScan;
    //保存采集信息
    var SaveCollectInfo=function(){
      var obj={};
      //校验手机号码
      var regMobile = /^(((13[0-9]{1})|159|153)+\d{8})$/;
      //校验数字
      var reg=/^[0-9]*$/;
      var Policy=$('#Policy');
      var Activity=$('#Activity');
      console.log(Activity[0].value);
      if($scope.tel!==undefined&&
        $scope.saleprice!==undefined&&
        $scope.buyprice!==undefined&&
        $scope.istop!==undefined&&
        $scope.isAgent!==undefined&&
        $scope.operator!==undefined&&
        $scope.selectedsort!==undefined){
          if(!regMobile.test($scope.tel)){
            alert("手机或者电话有误！");
          }else if(!reg.test($scope.saleprice)){
            alert('价格不是数字');
          }else if(!reg.test($scope.buyprice)){
            alert('价格不是数字');
          }else{
            //电话
            obj.phone=$scope.tel
            //售价
            obj.comp_sell=$scope.saleprice;
            //进价
            obj.comp_buy=$scope.buyprice;
            //推介级别 ---是否首推
            obj.comp_level=$scope.istop;
            //操作方式---
            obj.comp_way=$scope.isAgent;
            //业务作员
            obj.salesman=$scope.operator;
            //竞品剂型
            obj.comp_dosageforms=$scope.selectedsort;
            //活动描述
            obj.comp_describe=Activity[0].value;
            //政策信息
            obj.policyinfo=Policy[0].value;
            //竞品编码
            obj.comp_code=$scope.competitorInfo.comp_code;
            //竞品名称
            obj.comp_name=$scope.competitorInfo.comp_name;
            //竞品规格
            obj.comp_spec=$scope.competitorInfo.comp_spec;
            //竞品生产厂商
            obj.comp_manufacturer=$scope.competitorInfo.comp_manufacturer;
            //采集人员id
            obj.manager_id='1';
            //省区id
            obj.district_id='1';
            //终端id
            obj.terminal_id='1';
            console.log(obj);
            ScanAPI.saveCollectInfo(obj).then(function(result){
              console.log(result);
              alert(result[0]);
            });
          }
      }else{
        alert('信息填写不完整，检查后重新提交!');
      }
    };
    //拍照
    var Takephoto=function(){
      alert(111);
      //拍照或从手机相册中选图接口
      wx.chooseImage({
          success: function (res) {
              var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              $scope.images=localIds;
          }
      });
      //预览图片接口
      wx.previewImage({
          current: '', // 当前显示的图片链接
          urls: [] // 需要预览的图片链接列表
      });
      //上传图片接口
      wx.uploadImage({
        localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
        }
      });
    };
    $scope.ScanLoad=ScanLoad;
    $scope.SaveCollectInfo=SaveCollectInfo;
    $scope.ScanData=ScanData;
    $scope.Takephoto=Takephoto;
  }
})();