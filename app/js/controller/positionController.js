(function(){
  angular.module('app').controller("positionController",positionController);
  positionController.$inject=['$scope','PositionAPI'];
  function positionController($scope,PositionAPI){
    //搜索框
    var inputid=document.getElementById('input');
    //经度
      var latitude=document.getElementById('latitude');
      //维度
      var longitude=document.getElementById('longitude');
      //地址
      var address=document.getElementById('address');
      //终端名称
      var temname=document.getElementById('temname');
    var loder=function(){
      $scope.list=[{
        TemId:1,
        name:'新药特药人民药店(地段街店)',
        address:'地段街125号',
        contact:'黄经理', 
        phone:'(0451)84614143',
      },{
        TemId:2,
        name:'人民同泰药店',
        address:'南岗区贵新街53号',
        contact:'李经理',
        phone:'(0451)86208272',
      },{
        TemId:3,
        name:'龙威大药房民生店',
        address:'民生路26民香小区',
        contact:'张经理',
        phone:'(0451)55622289',
      },{
        TemId:4,
        name:'杰威大药房',
        address:'南苑路25号',
        contact:'周经理',
        phone:'(0451)84618940',
      }]
      var rad1=$('#rad');
      $(rad1[0]).hide();
      console.log(rad1);
    };
    //搜索获得当前经纬度下的附近终端
    var search=function(){
      var rad1=$('#rad');
      $(rad1[0]).show();
    };
    //查看附近终端列表
    var choose=function(res){
       // var obj={};
       //  // 纬度，浮点数，范围为90 ~ -90
       //  obj.latitude=res.latitude;
       //  // 经度，浮点数，范围为180 ~ -180。
       //  obj.longitude=res.longitude;
       //  PositionAPI.GetTemList(obj).then(function(result){
       //    console.log(result);
       //  });

      var radio2=document.getElementsByName("radiobutton");
      console.log(radio2);
          var se_value=null;   //  selectvalue为radio中选中的值
          for(var i=0;i<radio2.length;i++){
            if(radio2[i].checked==true) {
              if(radio2[i].value==$scope.list[i].TemId){
                $scope.TemId=$scope.list[i].TemId;
                //终端名称
                temname.innerHTML=$scope.list[i].name;
                inputid.value=$scope.list[i].name;
                //终端经度
                latitude.innerHTML='res.latitude';
                //终端纬度
                longitude.innerHTML='res.longitude';
                //终端地址
                address.innerHTML=$scope.list[i].address;
              }
              if(radio2[i].value !=='') {
              var rad2=$('#rad');
              $(rad2[0]).hide();
              console.log(rad2);
              }
             }
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
       wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wxb3c27ef068bf7146', // 必填，公众号的唯一标识
          timestamp:res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature,// 必填，签名，见附录1
          jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
       wx.ready(function(){
        console.log(111);
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          SearchTem();
      });
     };
    //调取微信的定位
    var SearchTem=function(){
      wx.getLocation({
          success: function (res) {
              // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              // var speed = res.speed; // 速度，以米/每秒计
              // var accuracy = res.accuracy; // 位置精度
              choose(res);
          }
      });
    };
    //保存终端信息
    var SaveTem=function(){
      console.log($scope.TemId);
      if($scope.TemId==undefined)
        return  Prompt("你还没有选择终端","red");
      var obj={};
      //终端名称
      obj.temname=temname.innerHTML;
      //终端ID
      obj.temid=inputid.value;
      //终端经度
      obj.latitude=latitude.innerHTML;
      //终端纬度
      obj.longitude=longitude.innerHTML;
      //终端位置
      obj.address=address.innerHTML;
      //将终端信息存到缓存中
      sessionStorage.temInfo=obj;
      console.log(obj);
      PositionAPI.SaveTemInfo(obj).then(function(result){
        console.log(result);
      });
      Prompt("保存成功","blue");
    };
    // //置空表单
    // var cancel=function(){
    //   temname.innerHTML="";
    //   inputid.value="";
    //   latitude.innerHTML="";
    //   longitude.innerHTML="";
    //   address.innerHTML="";
    // };
    $scope.loder=loder;
    $scope.search=search;
    $scope.choose=choose;
    // $scope.cancel=cancel;
    $scope.SaveTem=SaveTem;
   }
})();