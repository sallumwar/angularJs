(function(){
    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
      var toBuyList = this;
      toBuyList.items = ShoppingListCheckOffService.getItemsToBuy();
      toBuyList.checkOffItem = function(itemIndex){
        ShoppingListCheckOffService.checkOffItem(itemIndex);
      }
      console.log("items to buy : ",ShoppingListCheckOffService.getItemsToBuy());
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
      var boughtList = this;
      boughtList.items = ShoppingListCheckOffService.getBoughtItems();
    }

    //service
    function ShoppingListCheckOffService(){
      var service = this;

      var itemsToBuy = [{name: "Cookies" , quantity: 10},
                        {name: "Soft Drinks", quantity: 5},
                        {name: "Bags of Chips", quantity: 4}];
      var boughtItems = [];

      service.getItemsToBuy = function(){
        return itemsToBuy;
      }

      service.getBoughtItems= function(){
        return boughtItems;
      }

      service.checkOffItem = function(itemIndex){
        boughtItems.push(itemsToBuy[itemIndex]);
        itemsToBuy.splice(itemIndex,1);

      }
    }
  }
)();
