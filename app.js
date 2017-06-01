'use strict';

angular.module('tutorialApp', ['ngAnimate', 'ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/articles', { templateUrl: 'articles.html' })
      .when('/drinks', { templateUrl: 'drinks.html' })
      .when('/', { template: '<h1>Willkommen in unserer Pizzeria</h1>' })
      .otherwise({ redirectTo: '/'});
  })
  .directive('price', function(){
    return {
      restrict: 'E',
      scope: {
        value: '='
      },
      template: '<span ng-show="value == 0">kostenlos</span>' +
        '<span ng-show="value > 0">{{value | currency}}</span>'
    }
  })
  .factory('Cart', function() {
    var items = [];
    return {
      getItems: function() {
        return items;
      },
      addArticle: function(article) {
        items.push(article);
      },
      removeArticle: function(article) {
        items.splice(items.indexOf(article), 1);
      },
      sum: function() {
        return items.reduce(function(total, article) {
          return total + article.price;
        }, 0);
      }
    };
  })
  // .factory('Sortieren', function(){
  //   return{
  //       sortiere : function(zusortieren){
  //         // this.heroes = this.heroes.reverse();
  //         // this.heroes = this.heroes.filter(h => h === this.heroes[0]);
  //         if(zusortieren === 'nameArt'){
  //             this.articles = this.articles.sort((hero1, hero2) => {
  //             if(hero1.name > hero2.name) return 1;
  //             if(hero1.name < hero2.name) return -1;
  //             return 0;
  //           });
  //         }
  //         if(zusortieren === 'nameDri'){
  //             this.drinks = this.drinks.sort((hero1, hero2) => {
  //             if(hero1.name > hero2.name) return 1;
  //             if(hero1.name < hero2.name) return -1;
  //             return 0;
  //           });
  //         }  
  //       }
  // }
  // })
  .controller('ArticlesCtrl', function($scope, $http, Cart){
    $scope.cart = Cart;
    $http.get('articles.json').then(function(articlesResponse) {
      $scope.articles = articlesResponse.data;
    });
  })
  .controller('DrinksCtrl', function($scope, $http, Cart){
    $scope.cart = Cart;
    $http.get('drinks.json').then(function(drinksResponse) {
      $scope.drinks = drinksResponse.data;
    });
  })
  .controller('CartCtrl', function($scope, Cart){
    $scope.cart = Cart;
  });
