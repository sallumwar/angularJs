(function(){
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
  .directive('foundItems',foundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
      var menu = this;
      menu.searchTerm = "";
      menu.items = [];
      menu.findMatchedItems = function(){
        menu.items = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
      }

      menu.onRemove = function(index){
        menu.items.splice(index,1);
      }
  }

  function foundItemsDirective(){
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: foundItemsDirectiveController,
      controllerAs: 'dirMenu',
      bindToController: true
    };

    return ddo;
  }

  function foundItemsDirectiveController(){
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http,ApiBasePath){
    var service = this;

    service.getMatchedMenuItems = function(searchTerm){
      var foundItems = [];
      $http({
        method: "GET",
        url: ApiBasePath + "/menu_items.json"
      }).then(function (result) {
        // process result and only keep items that match
        var menuItems = result.data.menu_items;
        var i;
        for (i = 0; i < menuItems.length; i++) {
            if(menuItems[i].description.toLowerCase().indexOf(searchTerm) != -1)
              foundItems.push(menuItems[i]);
        }

      });
      return foundItems;
    };

  }
})();
