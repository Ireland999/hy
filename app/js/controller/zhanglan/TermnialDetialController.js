(function(){
  angular.module('app').controller("TermnialDetialController",TermnialDetialController);
  TermnialDetialController.$inject=['$scope','$stateParams','PositionAPI'];
  function TermnialDetialController($scope,$stateParams,PositionAPI){
    document.title="选择终端";
    var DetialLoad=function(){
      $scope.Slist=[{
        Termnial_id:'A',
        name:'新药特药人民药店(地段街店)',
        address:'地段街125号',
        contact:'黄经理',
        phone:'(0451)84614143',
      },{
        Termnial_id:'A',
        name:'人民同泰药店',
        address:'南岗区贵新街53号',
        contact:'李经理',
        phone:'(0451)86208272',
      },{
        Termnial_id:'B',
        name:'龙威大药房民生店',
        address:'民生路26民香小区',
        contact:'张经理',
        phone:'(0451)55622289',
      },{
        Termnial_id:'C',
        name:'杰威大药房',
        address:'南苑路25号',
        contact:'周经理',
        phone:'(0451)84618940',
      }];
      for(var i=0;i<$scope.Slist.length;i++){
        if($stateParams.Termnial_id==$scope.Slist[i].Termnial_id){
          $scope.list=$scope.Slist[i];
        }
      }
      
    };
    //保存选择的终端
    var save=function(){
      // $location.path('position');//页面跳转
      //图片
      // obj.serverIds=$scope.imgList;
      var savebutton=document.getElementById('savebutton');
        //选择终端拍药店门头
          // GreetAPI.chooseTermnial(obj).then(function(result){
          //   console.log(result);
            //保存失败直接返回
            // if(result[0]==false)return;

              sessionStorage.Termnial_id=$stateParams.Termnial_id;
              sessionStorage.Termnial_name=$scope.list.name;
              localStorage.Termnial_id=$stateParams.Termnial_id;
              localStorage.Termnial_name=$scope.list.name;
              console.log(sessionStorage.Termnial_id);
              console.log(sessionStorage.Termnial_name);
              PositionAPI.saveTermnial({name:$scope.list.name}).then(function(){
                 Prompt("保存成功","blue");
               });
             
          // });
    };
    $scope.DetialLoad=DetialLoad;
    $scope.save=save;
  }
})();