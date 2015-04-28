(function(){
  angular.module('app').controller("WorkOrderController",WorkOrderController);
  WorkOrderController.$inject=['$scope'];
  function WorkOrderController($scope){
    var WorkOrderLoad=function(){
      document.title="拜访工单";
      var remark=0;
      var switchStatus=false;
      switchFunction(remark,switchStatus);
    };
    var switchFunction=function(remark,switchStatus){

      console.log(remark);
      console.log(switchStatus);
      PendingClick(remark,switchStatus); 
    };
    var PendingClick=function(remark,switchStatus){
      console.log(remark);
      console.log(switchStatus);
      //false待办rue计划0未处理 1已处理
      if(switchStatus==false && remark==0){
        $scope.Orders=[
                      {
                        ListCount:5
                      },
                      [
                        {
                          rank:'待办1',
                          IssuedContent:'消渴降糖胶囊、通化长城药业 消渴降糖胶囊的销售价格和销售活动.'
                        },
                        {
                          rank:'待办2',
                          IssuedContent:'调研三金药业 消渴降糖胶囊、通化长城药业 消渴降糖胶囊的销售价格和销售活动.'
                        }
                      ]
                    ];

      }else if(switchStatus==false && remark==1){
        $scope.Orders=[
                      { 
                        ListCount:5
                      },
                      [
                        {
                          rank:'待办3',
                          IssuedContent:'调研三金药业 消渴降糖胶囊、通化长城药业 消渴降糖胶囊的销售价格和销售活动.'
                        },
                        {
                          rank:'待办4',
                          IssuedContent:' 消渴降糖胶囊、通化长城药业 消渴降糖胶囊的销售价格和销售活动.'
                        }
                      ]
                    ];
      }else if(switchStatus==true && remark==0){
        $scope.Orders=[
                      { 
                        ListCount:5
                      },
                      [
                        {
                          rank:'计划1',
                          IssuedContent:'调研三金药业 消渴降糖胶囊、通化长城药业 .'
                        },
                        {
                          rank:'计划2',
                          IssuedContent:'调研三金药业 消渴降糖胶囊、消渴降糖胶囊的销售价格和销售活动.'
                        }
                      ]
                    ];
      }else if(switchStatus==true && remark==1){
        $scope.Orders=[
                      { 
                        ListCount:5
                      },
                      [
                        {
                          rank:'计划1',
                          IssuedContent:'调研三金药业 消渴降糖胶囊、通化长城药业 消渴降糖胶囊的销售价格和销售活动.'
                        },
                        {
                          rank:'计划2',
                          IssuedContent:'调研三金药业 消渴降糖胶囊、通化长城药业 消渴降糖胶囊的销售价格和销售活动.'
                        }
                      ]
                    ];
      }
    };
    $scope.WorkOrderLoad=WorkOrderLoad;
    $scope.switchFunction=switchFunction;
  }
})();