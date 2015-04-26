(function(){
  angular.module('app').controller("competitorController",competitorController);
  competitorController.$inject=['$scope','SearchListAPI','$stateParams'];
  function competitorController($scope,SearchListAPI,$stateParams){
    //修改按钮里面的显示值  保存/修改
     var state=true;
    var load=function(){
      newCom();
    };

    var newCom=function(){
      //获取并且修改某个竞品的信息
      $scope.Clist=[{
        name:'消渴降糖胶囊',
        commonname:'消渴降糖胶囊',
        standard:'0.3g/粒(相当于原药材3g)',
        firm:'通化成城药业股份有限公司凝聚成电能',
        Sprice:'￥6.5',
        Jprice:'￥5',
        operation:[{opti1:'代理'},
                   {opti2:'维护'},
                  ],
        recommend:'首推',
        type:'胶囊',
        pics:[{pic1:'/assets/img/s.jpg'},
              {pic2:'/assets/img/vv.jpg'},
             ],
        desc:'哈药集团是中国制药界第一品牌，同时也是中国制药界唯一进入世界制药50强行列的国内最大',
      }];
      console.log($scope.Clist);
    };
    //添加一个新竞品的详细信息
    var addCom=function(){
      var obj={};
      obj.name=$scope.name;
      obj.commonname=$scope.commonname;
      obj.standard=$scope.standard;
      obj.firm=$scope.firm;
      obj.Price=$scope.Price;
      obj.Jprice=$scope.Jprice;
      obj.operation=$scope.operation;
      obj.recommend=$scope.recommend;
      obj.type=$scope.type;
      obj.desc=$scope.desc;
      //与后台进行交互API
    };
    //查看某竞品的竞品异动情况
    var active=function(){
    };
    //添加记录某一竞品的竞品异动情况
    var newactive=function(){
    };
   
    //保存调研完成的竞品信息
    var SaveComInfo=function(){
      var obj={};
      var obj1={};
      var savebutton=document.getElementById('savebutton');
      var comcollect=document.getElementById('comcollect');
      //state=true时保存信息  state=false时不允许编辑
      if(state==true){
        SearchListAPI.saveComInfo(obj).then(function(result){
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
          obj1.comp_id=$stateParams.CompId;
          obj1.flag=1;
          //存在sessionStorage中来修改竞品列表中的颜色
          sessionStorage.obj=JSON.stringify(obj1);
        });
      }else{
        savebutton.innerHTML="保存";
        $(savebutton).addClass("savebutton").removeClass("btnDefault");
        state=true;
        $("#alertbgDiv").remove();
      }
    };
    $scope.load=load;
    $scope.SaveComInfo=SaveComInfo;
}
})();