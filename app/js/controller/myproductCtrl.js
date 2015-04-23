(function(){
  angular.module('app').controller("myproductCtrl",myproductCtrl);
  myproductCtrl.$inject=['$scope'];
  function myproductCtrl($scope){
    var load=function(){
      $scope.mation=[{
        drugname:'通化消渴降糖胶囊',
        drugnorname:'通化消渴降糖胶囊',
        guige:'10*10/盒',
        stock:'6盒',
        Cprice:'5元/盒',
        Pprice:'5.5元/盒',
      },{
        drugname:'振霖消渴降糖胶囊',
        drugnorname:'振霖消渴降糖胶囊',
        guige:'2*24粒/板',
        stock:'10盒',
        Cprice:'8元/盒',
        Pprice:'9元/盒',
      },{
        drugname:'宝口服液',
        drugnorname:'宝口服液',
        guige:'10*10/盒',
        stock:'4盒',
        Cprice:'12元/盒',
        Pprice:'12元/盒',
      },{
        drugname:'阿莫西林胶囊',
        drugnorname:'阿莫西林胶囊',
        guige:'2*24粒/板',
        stock:'5盒',
        Cprice:'15元/盒',
        Pprice:'14.5元/盒',
      },{
        drugname:'钙加锌口服液',
        drugnorname:'钙加锌口服液',
        guige:'10*10/盒',
        stock:'6盒',
        Cprice:'20元/盒',
        Pprice:'22元/盒',
      },{
        drugname:'新盖中盖高钙片',
        drugnorname:'新盖中盖高钙片',
        guige:'50/盒',
        stock:'13盒',
        Cprice:'15元/盒',
        Pprice:'18元/盒',
      }]

      //跳转至weijia 页面，保存成功后返回此页面显示维价页面对应的竞品列为绿色
    };
    $scope.load=load;
  }
})();