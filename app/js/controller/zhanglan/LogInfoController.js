(function(){
  angular.module('app').controller("LogInfoController",LogInfoController);
  LogInfoController.$inject=['$scope','MyProAPI','$stateParams','UserAPI','ScanAPI'];
  function LogInfoController($scope,MyProAPI,$stateParams,UserAPI,ScanAPI){
    //判断是否可以编辑文本框内内容
    var state=true;
    //初始化函数
    var LogInfoLoad=function(){
      $("#alertbgDiv1").remove();
       //终端名称
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
            LogInfo();
          });
        });
      }else{
         PositionAPI.GetTermnial().then(function(res){
            console.log(res);
            
            if($scope.res.name==""||$scope.res.name==null)return Prompt("你还没有进行终端定位","red");
            $scope.Termnial_name=$scope.res.name;
            LogInfo();
          });
      }
          
    };
     //通过扫码获取我品信息并判断是否串货
    var LogInfo=function(){
      $scope.MyPro_code=$stateParams.MyPro_code;
      MyProAPI.GetMyPro({myprocode:$stateParams.MyPro_code}).then(function(result){
        console.log(result);
      });               
    };
    //点击信息维护按钮跳转页面并加载数据对我品信息进行加载
    var myPro=function(){
      $scope.Termnial_name=sessionStorage.Termnial_name;
      // 传递我品编码
      MyProAPI.GetMyProInfo({myProCode:$stateParams.MyPro_code}).then(function(result){
        console.log(result);
      });
    };
    //对采集的终端实际存量和终端零售价信息进行保存
    var SaveCollectMyPro=function(){
      var obj={};
      var savebutton=document.getElementById('savebutton');
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
      obj.terminal_id=sessionStorage.Termnial_id;
      //操作人id
      obj.manager_id=sessionStorage.UserId;
      if(state==true){
          // MyProAPI.SaveCollectMyPro(obj).then(function(result){
          //   console.log(result);
            //保存成功之后将保存按钮变成修改并把内容变成不可编辑状态
                    // if(result[0]==true){
                        //背景div 
                        sWidth = document.body.offsetWidth;    
                        sHeight = document.body.offsetHeight;   
                        var bgObj=document.createElement("div");    
                        bgObj.setAttribute('id','alertbgDiv1');    
                        bgObj.style.position="absolute";    
                        bgObj.style.top="0";    
                        bgObj.style.background="silver";    
                        bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=90,finishOpacity=95";    
                        bgObj.style.opacity="0.3";    
                        bgObj.style.left="0";    
                        bgObj.style.width = sWidth + "px";    
                        bgObj.style.height = (sHeight-50) + "px";    
                        bgObj.style.zIndex = "10000";    
                        document.body.appendChild(bgObj);    
                        savebutton.innerHTML="修改";
                        $(savebutton).addClass("btnDefault").removeClass("savebutton");
                        var btnstyle=document.getElementsByClassName('btnstyle');
                        state=false;
                        Prompt("保存成功","blue");
                    // }
          // });
      }else{
        savebutton.innerHTML="保存";
        $(savebutton).addClass("savebutton").removeClass("btnDefault");
        state=true;
        $("#alertbgDiv1").remove();
      }
      
    };
    //拍照维价
    var Takephoto=function(){
      //去后台请求拿到签名
      ScanAPI.ScanSignature().then(function(res){
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
            $scope.serverId=[];
              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
              wx.chooseImage({
                  success: function (res) {
                      $scope.localIds=res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                      if($scope.localIds.length>3)return alert('选择图片不能多于三张');
                      angular.forEach($scope.localIds,function(localId){
                        wx.uploadImage({
                            localId:localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (result) {
                                $scope.serverId.push(result.serverId); // 返回图片的服务器端ID
                            }
                        });
                      });
                      
                  }
              });
          });
      });
    };
    $scope.LogInfoLoad=LogInfoLoad;
    $scope.myPro=myPro;
    $scope.Takephoto=Takephoto;
    $scope.SaveCollectMyPro=SaveCollectMyPro;
  }
})();