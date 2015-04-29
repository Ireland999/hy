(function(){
  angular.module('app').controller("WorkOrderController",WorkOrderController);
  WorkOrderController.$inject=['$scope','WorkOrderAPI'];
  function WorkOrderController($scope,WorkOrderAPI){
    var WorkOrderLoad=function(){
      document.title="拜访工单";
      var remark=0;
      var switchStatus=false;
      //标识是否去后台请求数据true可以请求false不可以请求
      var state=false;
      var page=1;
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
      //false待办rue计划  0未处理 1已处理
      var obj={};
      obj.count=10;
      obj.page=page;
      obj.switchStatus=switchStatus;
      obj.remark=remark;
       if(state==true)return;
       state=true;
        var start=parseInt(count)*(parseInt(page-1));
        var end=start+parseInt(count);
          if(page>(Listcount/count)){
            return;
          }else{
            WorkOrderAPI.GetWorkList(obj).then(function(res){
              console.log(res);
            });
            if(page==(Listcount/count)){
                var nonore=document.getElementById('nomore');
                nonore.innerHTML = nonore.innerHTML+'已经是最后了~';
                var LoadMore=document.getElementsByClassName('loadmore');
                LoadMore[0].innerHTML="";
              }
          }
           page ++;
           state = false;
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