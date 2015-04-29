(function () {
  function config($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/");
    $stateProvider.state('center',{                //竞品扫一扫
      url:'/scan',
      templateUrl:'views/ComPro/scan.html'
    }).state('appManager',{              //竞品界面
      url:'/appManager',
       templateUrl:'views/ComPro/Competitor.html'
    }).state('center.addactive',{               //操作竞品异动
      url:'/addactive',
      templateUrl:'/views/addactive.html'
    }).state('compedetail',{               //竞品调研2页面
        url:'/compedetail/{CompId}',   //竞品id
        templateUrl:'/views/ComPro/compedetail.html'
    }).state('weijia',{               //维价页面
        url:'/weijia/{MyProId}',
        templateUrl:'/views/MyPro/weijia.html' 
    }).state('center.wei_list',{               //维价列表页面
    url:'/wei_list',
    templateUrl:'/views/MyPro/wei_list.html'
    }).state('greet',{                 //打招呼定位附近终端
      url:'/greet',
      templateUrl:'views/visit/greet.html'
    }).state('termnialDetial',{                 //打招呼 确定终端
      url:'/termnialDetial/{Termnial_id}',
      templateUrl:'views/visit/TermnialDetial.html'
    }).state('admin',{                 //打招呼定位附近终端
      url:'/greet',
      templateUrl:'views/admin.html'
    }).state('pointout',{                 //提示页面
      url:'/pointout',
      templateUrl:'views/pointout.html'
    }).state('test',{                 //提示页面
      url:'/',
      templateUrl:'views/ComPro/TestScan.html'
    }).state('position',{                 //定位确定终端
      url:'/position',
      templateUrl:'views/visit/position.html'



      //张兰代码
      }).state('SearchList',{
      url:'/SearchList',
      templateUrl:'views/ComPro/SearchList.html'  //工单  默认待处理
     }).state('SearchList.SearchResolved',{
      url:'SearchResolved',
      templateUrl:'views/ComPro/SearchResolved.html'// 工单   已处理
    }).state('Comproducts',{                      //工单中调研竞品
      url:'/Comproducts/{IssuedId}',              //工单id
      templateUrl:'views/ComPro/Comproducts.html'
    }).state('MyproScan',{
      url:'/MyproScan',   //我品扫码---防串稽核  MyproScan
      templateUrl:'views/MyPro/MyproScan.html'
    }).state('MyProScanInfo',{
      url:'/MyProScanInfo',
      templateUrl:'views/MyPro/MyProScanInfo.html'//我品扫码成功后的界面
    }).state('WorkOrder',{
      url:'/WorkOrder',
      templateUrl:'views/MyPro/WorkOrder.html'
    }).state('WorkOrder.WorkPending',{
      url:'WorkPending',
      templateUrl:'views/visit/WorkPending.html'
    }).state('WorkOrder.WorkResolve',{
      url:'WorkResolved',
      templateUrl:'views/visit/WorkResolve.html'
    }).state('VisitPlan',{
      url:'/VisitPlan',
      templateUrl:'views/visit/VisitPlan.html'
    }).state('VisitLog',{
      url:'/VisitLog',
      templateUrl:'views/visit/VisitLog.html'
    });
  }
  config.$inject = ['$stateProvider','$urlRouterProvider'];
  angular.module('app',['ui.router','toggle-switch','ng-bootstrap-datepicker']).config(config);
})();