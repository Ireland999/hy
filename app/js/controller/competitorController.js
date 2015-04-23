(function(){
  angular.module('app').controller("competitorController",competitorController);
  competitorController.$inject=['$scope','CompetitorAPI'];
  function competitorController($scope,CompetitorAPI){
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
      var savebutton=document.getElementById('savebutton');
      if(state==true){
        CompetitorAPI.saveComInfo().then(function(result){
          console.log(result);
        });
        var model=document.getElementById('model');
        var div=$('<div></div>');
        console.log(model.offsetWidth);
        div[0].width=model.offsetWidth;
        div[0].height=model.offsetHeight;
        div[0].top=model.getBoundingClientRect().top;
        div[0].left=model.getBoundingClientRect().left;
        div[0].zIndex=10;
        div[0].backgroundColor="red";
        console.log(div);
        var comcollect=document.getElementById('comcollect');
        $(comcollect).append(div);
        savebutton.innerHTML="修改";
        state=false;
      }else{
        savebutton.innerHTML="保存";
        state=true;
      }
    };
    $scope.load=load;
    $scope.SaveComInfo=SaveComInfo;
}
})();