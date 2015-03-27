(function(){
  angular.module('app').controller("IndexController",IndexController);
  IndexController.$inject=['$scope'];
  function IndexController($scope){
  var reload=function(){
    console.log(99999);
    document.title="哈药业代宝";
     $scope.ite=[{
      title:'哈药业代宝',
      picurl:'/assets/img/vv.jpg',
      description:'哈药集团是中国制药界第一品牌，同时也是中国制药界唯一进入世界制药50强行列的国内最大、实力最强的国营制药企业集团，而哈药集团同泰药业有限公司作为哈药集团旗下的骨干企业之一，通过不断的发展壮大，也已成为全国知名的品牌企业，在黑龙江更是家喻户晓.今天他以哆哆跟啦啦亲爹的身份进军微商，重金打造了“瘦哆啦”！',
      name:'dabai',
      url:'',
     }]
  console.log($scope.ite);
  };
  $scope.reload=reload;
}
})() 