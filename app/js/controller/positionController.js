(function(){
  angular.module('app').controller("positionController",positionController);
  positionController.$inject=['$scope'];
  function positionController($scope){
    var loder=function(){
      $scope.list=[{
        name:'新药特药人民药店(地段街店)',
        address:'地段街125号',
        contact:'黄经理',
        phone:'(0451)84614143',
      },{
        name:'人民同泰药店',
        address:'南岗区贵新街53号',
        contact:'李经理',
        phone:'(0451)86208272',
      },{
        name:'龙威大药房民生店',
        address:'民生路26民香小区',
        contact:'张经理',
        phone:'(0451)55622289',
      },{
        name:'杰威大药房',
        address:'南苑路25号',
        contact:'周经理',
        phone:'(0451)84618940',
      }]
      var rad1=$('#rad');
      $(rad1[0]).hide();
      console.log(rad1);
    };
    //搜索获得当前经纬度下的附近终端
    var search=function(){
      var rad1=$('#rad');
      $(rad1[0]).show();
    };
    var choose=function(){

      var radio2=document.getElementsByName("radiobutton");
          var se_value=null;   //  selectvalue为radio中选中的值
          for(var i=0;i<radio2.length;i++){
            if(radio2[i].checked==true) {
              se_value=radio2[i].value;
              console.log(se_value);
              $scope.mm=se_value;
              if(radio2[i].value !=='') {
              var rad2=$('#rad');
              $(rad2[0]).hide();
              console.log(rad2);
              }
              console.log($scope.mm);
             }
          }
    }
    $scope.loder=loder;
    $scope.search=search;
    $scope.choose=choose;
   }
})();

// <input type="text" id="box" /><input type="button" value="查询" onclick="search()" />
// <script>
// function search() {
//     var search_value = document.getElementById('box').value;
//     var url = 'other.html';
//     switch(search_value) {
//         case 'aaa':
//             url = '0001.html';
//             break;
//         case 'bbb':
//             url = '0002.html';
//             break;
//         case 'ccc':
//             url = '0003.html';
//             break;
//     }
//     location = url;
// }
// </script>