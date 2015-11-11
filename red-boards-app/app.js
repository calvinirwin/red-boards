var app = angular.module("red-boards-app", ['ui.router']);

var DATA_URL = "http://localhost:3000/";

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/data_list.html',
        controller: 'mainCtrl'
      })
      .state('item', {
        url: '/item/{id}',
        templateUrl: '/item.html',
        controller: 'itemCtrl',
        resolve: {
          item: ['$stateParams', 'exItems', function($stateParams, exItems) {
            return exItems.get($stateParams.id);
          }]
        }
      });
    $urlRouterProvider.otherwise('home');
  }
]);


app.factory('exItems', ['$http', function($http) {
  var o = {
    items: []
  };

  o.get = function(id) {
    return $http.get(DATA_URL + 'mlsexceptions/' + id).then(function(res) {
      return res.data;
    });
  };

  o.update = function(item) {
    return $http.post(DATA_URL + 'mlsexceptions/' + id).then(function(res) {
      return res.data;
    });
  };

  o.getOpen = function() {
    return $http.get(DATA_URL + 'mlsexceptions/open').then(function(res) {
      return res.data;
    });
  };

  o.getAll = function() {
    return $http.get(DATA_URL + 'mlsexceptions/');
  };

  return o;
}]);

app.controller("mainCtrl", [
  '$scope',
  'exItems',
  function($scope, exItems) {
    $scope.title = "red-board manager";
    exItems.getAll().then(function(res) {
      $scope.data = res.data;
    }).catch(function(err, res) {
      // this sample data only loads when the db connection is down
      $scope.data = [{
        mls_area: "SAMPLE",
        exception_type: "datafeed",
        client_code: "SAM999",
        client_name: "A. Peaceful Real Estate",
        last_run: "10/20/2015 6:24:46 PM",
        host_server: "SERVER1",
        status: "New",
        create_date: "11/01/2015 8:05:00 PM",
        author: "system",
        body: "The data could not be retrieved from the server",
        cause: "",
        ticket_num: "",
        action_taken: "",
        comments: []
      }];
    });
  }
]);

app.controller("itemCtrl", [
  '$scope',
  'exItems',
  'item',
  function($scope, exItems, item) {
    $scope.title = "red-board manager";
    $scope.item = item;
  }
]);