(function () {
  function config($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/");
    // $stateProvider.state('center',{
    //   url:'/',
    //   templateUrl:'views/compedetail.html'
      $stateProvider.state('center',{
      url:'/',
      templateUrl:'views/index.html'
    }).state('center.Competitor',{
      url:'Competitor',
       templateUrl:'views/Competitor.html'
    }).state('center.addnewCom',{
      url:'addnewCom',
      templateUrl:'views/addnewCom.html'
    }).state('center.seeActive',{
      url:'seeActive',
      templateUrl:'/views/seeActive.html'
    }).state('center.addactive',{
      url:'addactive',
      templateUrl:'/views/addactive.html'
    // }).state('center.code',{
    //   url:'code',
    //   templateUrl:'/views/code.html'
    }).state('center.greet',{                     //打招呼获取附近终端
      url:'greet',
      templateUrl:'views/visit/greet.html'
    }).state('center.visit-workorder',{                     //拜访工单（还未完成）
      url:'visit-workorder',
      templateUrl:'views/visit/visit-workorder.html'  
    }).state('center.compedetail',{            //扫一扫反馈信息                
      url:'compedetail',
      templateUrl:'views/compedetail.html'
    }).state('center.weijia',{                     //维价
      url:'weijia',
      templateUrl:'views/weijia.html'
    });
  }
  config.$inject = ['$stateProvider','$urlRouterProvider'];
  angular.module('app',['ui.router']).config(config);
})();