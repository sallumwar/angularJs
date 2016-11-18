(function(){
  'use strict';

  angular.module('data').controller('CategoriesController',CategoriesController);

  CategoriesController.$inject = ['MenuDataService', 'categories'];
  function CategoriesController(MenuDataService, categories){
    var categoriesCtrl = this;
    categoriesCtrl.categories = [];
    if(categories)
      categoriesCtrl.categories = categories.data;
  }
})();
