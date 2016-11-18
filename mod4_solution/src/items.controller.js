(function(){
  angular.module('data')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['$stateParams', 'MenuDataService', 'items'];
  function ItemsController($stateParams, MenuDataService, items){
    var itemsCtrl = this;
    itemsCtrl.items = items.data.menu_items;
  }
})();
