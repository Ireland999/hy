(function(){
  angular.module('app').controller("greetController",greetController);
  greetController.$inject=['$scope','$location','GreetAPI','ScanAPI','UserAPI'];
  function greetController($scope,$location,GreetAPI,ScanAPI,UserAPI){
     //修改按钮里面的显示值  保存/修改
     var state=true;
    var load=function(){
      $scope.Slist=[{
        Termnial_id:'A',
        name:'新药特药人民药店(地段街店)',
        address:'地段街125号',
        contact:'黄经理',
        phone:'(0451)84614143',
      },{
        Termnial_id:2,
        name:'人民同泰药店',
        address:'南岗区贵新街53号',
        contact:'李经理',
        phone:'(0451)86208272',
      },{
        Termnial_id:3,
        name:'龙威大药房民生店',
        address:'民生路26民香小区',
        contact:'张经理',
        phone:'(0451)55622289',
      },{
        Termnial_id:4,
        name:'杰威大药房',
        address:'南苑路25号',
        contact:'周经理',
        phone:'(0451)84618940',
      }]
      //加载人员信息
      var search=location.hash;
      $scope.href=window.location.href;
      // console.log(window.location.href.substr(0,24));
      if(!sessionStorage.userId||sessionStorage.userId==undefined){
        console.log(search.split('?')[0]);
        //获取用户userId
        UserAPI.getUserId(search.split('?')[0]).then(function(result){
          console.log(result);
          $socpe.UserId=result.UserId;
          //将用户id存到session中
          sessionStorage.UserId=result.UserId;
           //根据用户和当前地理位置查询附近终端
          GreetAPI.chooseTermnial({UserId:result.UserId}).then(function(res){
            console.log(res);
          });
        });
      }
    };
    //拍照  店铺门头照片
    var ScanSignature=function(){
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
      $scope.imgList=[];
      wx.chooseImage({
          success: function (res) {
              var localIds=res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              if(localIds.length>3)return alert('选择图片不能多于三张');
              $scope.localIds=localIds;
              angular.forEach(localIds,function(localId){
                wx.uploadImage({
                    localId:localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                       var serverId= res.serverId; // 返回图片的服务器端ID
                       $scope.imgList.push(serverId);
                    }
                });
              });
              
          }
      });
    };
    //显示选择终端的名字
    var radiochoose=function(){
      $scope.Termnial_id="";
      var radio=document.getElementsByName("radiobutton");
      for(var i=0;i<radio.length;i++){
        if(radio[i].checked==true) {
          $scope.Termnial_id=radio[i].value;
            for(var j=0;j<$scope.Slist.length;j++){
              if(radio[i].value==$scope.Slist[j].Termnial_id){
                document.getElementById('termnailname').innerHTML='终端名称：'+$scope.Slist[j].name;
                break;
              }
            }
            break;
          }

      }
    };
    //保存选择的终端
    var save=function(){
      console.log($scope.Termnial_id);
      var obj={};
      obj.Termnial_id=$scope.Termnial_id;
      console.log(obj.Termnial_id);
      if(obj.Termnial_id==undefined)return Prompt("你还没有选择终端","red");
      // $location.path('position');//页面跳转
      //图片
      obj.serverIds=$scope.imgList;
      if(state==true){
          GreetAPI.chooseTermnial(obj).then(function(result){
            console.log(result);
            //保存失败直接返回
            if(result[0]==false)return;
            //背景div 
              sWidth = document.body.offsetWidth;    
              sHeight = document.body.offsetHeight;   
              var bgObj=document.createElement("div");    
              bgObj.setAttribute('id','alertbgDiv');    
              bgObj.style.position="absolute";    
              bgObj.style.top="0";    
              bgObj.style.background="silver";    
              bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=90,finishOpacity=95";    
              bgObj.style.opacity="0.3";    
              bgObj.style.left="0";    
              bgObj.style.width = sWidth + "px";    
              bgObj.style.height = (sHeight-30) + "px";    
              bgObj.style.zIndex = "10000";    
              document.body.appendChild(bgObj);    
              savebutton.innerHTML="修改";
              $(savebutton).addClass("btnDefault").removeClass("savebutton");
              var btnstyle=document.getElementsByClassName('btnstyle');
              state=false;
          });
      }else{
       savebutton.innerHTML="保存";
        $(savebutton).addClass("savebutton").removeClass("btnDefault");
        state=true;
        $("#alertbgDiv").remove();
      }
    };
    var test=function(){
      $scope.testlist=[];
      var testdata=['1','2','3','4'];
      angular.forEach(testdata,function(data){
        $scope.testlist.push(data);
      })
    };
    $scope.load=load;
    $scope.radiochoose=radiochoose;
    $scope.ScanSignature=ScanSignature;
    $scope.save=save;
    $scope.test=test;
}
})();
