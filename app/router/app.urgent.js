(function () {
  function config($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/");
    $stateProvider.state('center',{                //竞品界面
      url:'/',
      templateUrl:'views/Competitor.html'
    // }).state('center.Competitor',{              //竞品界面
    //   url:'Competitor',
    //    templateUrl:'views/Competitor.html'
    }).state('center.addactive',{               //操作竞品异动
      url:'addactive',
      templateUrl:'/views/addactive.html'
    }).state('center.compedetail',{               //竞品调研2页面
        url:'compedetail',
        templateUrl:'/views/compedetail.html'
    }).state('center.weijia',{               //维价页面
        url:'weijia',
        templateUrl:'/views/weijia.html' 
    }).state('center.wei_list',{               //维价列表页面
    url:'wei_list',
    templateUrl:'/views/wei_list.html'
    }).state('center.greet',{                 //打招呼定位附近终端
      url:'greet',
      templateUrl:'views/visit/greet.html'
    }).state('center.position',{                 //定位确定终端
      url:'position',
      templateUrl:'views/visit/position.html'



      //张兰代码
      }).state('SearchList.SearchResolved',{
      url:'SearchResolved',
      templateUrl:'views/admin/SearchResolved.html'
    }).state('SearchList.SearchPending',{
      url:'SearchPending',
      templateUrl:'views/admin/SearchPending.html'
    }).state('Comproducts',{
      url:'Comproducts/{DrugstoreName}',
      templateUrl:'views/admin/Comproducts.html'
    }).state('ScanInfo',{
      url:'/ScanInfo',
      templateUrl:'views/admin/ScanInfo.html'
    }).state('WorkOrder',{
      url:'/WorkOrder',
      templateUrl:'views/admin/WorkOrder.html'
    }).state('WorkOrder.WorkPending',{
      url:'WorkPending',
      templateUrl:'views/admin/WorkPending.html'
    }).state('WorkOrder.WorkResolve',{
      url:'WorkResolved',
      templateUrl:'views/admin/WorkResolve.html'
    }).state('VisitPlan',{
      url:'/VisitPlan',
      templateUrl:'views/admin/VisitPlan.html'
    }).state('VisitLog',{
      url:'/VisitLog',
      templateUrl:'views/admin/VisitLog.html'
    }).state('model',{
      url:'/model',
      templateUrl:'views/admin/model.html'


    });
  }
  config.$inject = ['$stateProvider','$urlRouterProvider'];
  angular.module('app',['ui.router','toggle-switch','ng-bootstrap-datepicker']).config(config);
})();