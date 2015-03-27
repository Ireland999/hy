(function(){
  angular.module('app').controller("greetController",greetController);
  greetController.$inject=['$scope'];
  function greetController($scope){
    var load=function(){
      get_store();
    document.title="哈药业代宝";
    check();
    };
    var get_store=function(){
      $scope.stores=[{
        id:11,
        name:'新药特药人民药店(地段街店)',
        address:'地段街125号',
        username:'黄经理',
        phone:'(0451)84614142',
      },{
        id:12,
        name:'人民同泰药店',
        address:'南岗区贵新街53号',
        username:'李经理',
        phone:'(0451)86208272',
      },{
        id:13,
        name:'龙威大药房民生店',
        address:'民生路26民香小区',
        username:'张经理',
        phone:'(0451)55622289',
      },{
        id:14,
        name:'杰威大药房',
        address:'南苑路21号',
        username:'马经理',
        phone:'(0451)85215556',
      }]
    };
      var check=function(){
        console.log(666);
        var radio=document.getElementsByName("radiobutton");
          var selectvalue=null;
          for (var i = 0; i < radio.length; i++) {
            if (radio[i].checked==true) {
              selectvalue=radio[i].value;
            }
          }
          console.log(selectvalue);
          var btn2=$('#sh');
          if(selectvalue ==null){
            
            console.log(btn2[0]);
            $(btn2[0]).hide();
          }else{
            $(btn2[0]).show();
            $scope.aa=selectvalue;
          }
          };
    $scope.load=load;
    $scope.check=check;
}
})()