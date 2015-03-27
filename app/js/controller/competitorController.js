(function(){
  angular.module('app').controller("competitorController",competitorController);
  competitorController.$inject=['$scope'];
  function competitorController($scope){
    var vload=function(){
      newCom();
    document.title="哈药业代宝";
    };
    var newCom=function(){
      //获取并且修改某个竞品的信息
      $scope.Clist=[{
        name:'消渴降糖胶囊',
        commonname:'消渴降糖胶囊',
        standard:'0.3g/粒(相当于原药材3g)',
        firm:'通化成城药业股份有限公司',
        Sprice:'￥6.5',
        Jprice:'￥5',
        operation:[{opti1:'代理'},
                   {opti2:'维护'},
                  ],
        recommend:'首推',
        type:'胶囊',
        pics:[{pic:'assets/img/s.jpg'},
              {pic:'/assets/img/vv.jpg'},
             ],
        desc:'哈药集团是中国制药界第一品牌，同时也是中国制药界唯一进入世界制药50强行列的国内最大',
      }]
      console.log($scope.Clist);
    };
    //添加一个新竞品的详细信息
    // var addCom=function(){
    //   var obj={};
    //   obj.name=$scope.name;
    //   obj.commonname=$scope.commonname;
    //   obj.standard=$scope.standard;
    //   obj.firm=$scope.firm;
    //   obj.Price=$scope.Price;
    //   obj.Jprice=$scope.Jprice;
    //   obj.operation=$scope.operation;
    //   obj.recommend=$scope.recommend;
    //   obj.type=$scope.type;
    //   obj.desc=$scope.desc;
      //与后台进行交互API
    // };
    //查看某竞品的竞品异动情况
    // var active=function(){
    // };
    //添加记录某一竞品的竞品异动情况
    // var newactive=function(){
    // };
    $scope.vload=vload;
}
})()