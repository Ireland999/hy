(function(){
  angular.module('app').controller("greetController",greetController);
  greetController.$inject=['$scope','$location'];
  function greetController($scope,$location){
    var load=function(){
      $scope.Slist=[{
        name:'新药特药人民药店(地段街店)',
        address:'地段街125号',
        contact:'黄经理',
        phone:'(0451)84614143',
      },{
        name:'人民同泰药店',
        address:'南岗区贵新街53号',
        contact:'李经理',
        phone:'(0451)86208272',
      },{
        name:'龙威大药房民生店',
        address:'民生路26民香小区',
        contact:'张经理',
        phone:'(0451)55622289',
      },{
        name:'杰威大药房',
        address:'南苑路25号',
        contact:'周经理',
        phone:'(0451)84618940',
      }]
      var sto=$('#sto');
      $(sto[0]).hide();
      console.log(sto);
    };
    var store=function(){
      var radio=document.getElementsByName("radiobutton");
          var selectvalue=null;   //  selectvalue为radio中选中的值
          for(var i=0;i<radio.length;i++){
            if(radio[i].checked==true) {
              selectvalue=radio[i].value;
              console.log(selectvalue);
              $scope.aa=selectvalue;
              console.log($scope.aa);
              var sto=$('#sto');
              $(sto[0]).show();
              console.log(1111);
              }else{
                document.getElementById("save").disabled = true;
                console.log(2222);
              }
                  // $('#save').on('click',function(){
               
                      // $("#save").attr("disabled",true);
                  // });
          }
    };
    var tackphone=function(){
      wx.config({
        debug:true,
        appId:'wxa2185a2142b1e98f',//企业号corpid
        timestamp:1427709224,//生成签名时间戳
        nonceStr:'37b6dbec-42f5-4494-b7c4-de87644ca541',//生成签名随机串
        signature:'a7e2febe0b13a9629fe4f01e64098eb2d5084b55',//签名
        jsApiList:['chooseImage','uploadImage']//需使用的JS接口列表
      });
      wx.ready(function(){
            wx.chooseImage({            //拍照或从手机相册中选图接口
              success: function (res) {
              var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            }
            });
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
        //config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
        //对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      });
    };
    var save=function(){
      var radio=document.getElementsByName("radiobutton");
          var selectvalue=null;   //  selectvalue为radio中选中的值
          for(var i=0;i<radio.length;i++){
            if(radio[i].checked==true) {
              selectvalue=radio[i].value;
              console.log(selectvalue);
              $scope.aa=selectvalue;
              console.log($scope.aa);
              console.log(1111);
              }else{
                document.getElementById("save").disabled = true;
                console.log(2222);
              }
                
          }
          if($scope.aa!==undefined){
              $location.path('position');//页面跳转
          }else{
            var str='未确定终端，请先选择终端';
            var contentcolor='#D51427';
             Prompt(str,contentcolor);
          }
    };
    $scope.load=load;
    $scope.store=store;
    $scope.tackphone=tackphone;
    $scope.save=save;
}
})();
