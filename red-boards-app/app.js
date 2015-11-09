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
        // ,
        // resolve: {
        //   postPromise: ['exItems', function(exceptions){
        //     return exItems.getAll();
        //   }]
        // }
      })
      .state('item', {
        url: '/item/{id}',
        templateUrl: '/item.html',
        controller: 'itemCtrl'
      });
    $urlRouterProvider.otherwise('home');
  }
]);


app.factory('exItems', ['$http', function($http) {
  var o = {
    items: []
    // [{
    //     mls_area: "EBRDX",
    //     exception_type: "photo",
    //     client_code: "AME717",
    //     client_name: "A. Meadows Real Estate",
    //     last_run: "10/20/2015 6:24:46 PM",
    //     host_server: "PHOTOSRV1",
    //     status: "New",
    //     create_date: "10/22/2015 8:05:00 PM",
    //     author: "system",
    //     body: "The image failed to be retrieved from the server",
    //     cause: "",
    //     ticket_num: "",
    //     action_taken: "",
    //     comments: []
    //   }, {
    //     mls_area: "EBRDI",
    //     exception_type: "data",
    //     client_code: "AME717",
    //     client_name: "A. Meadows Real Estate",
    //     last_run: "10/20/2015 6:24:46 PM",
    //     host_server: "MLS4",
    //     status: "New",
    //     create_date: "10/22/2015 8:00:00 PM",
    //     author: "system",
    //     body: "Could not connect to remote server",
    //     cause: "",
    //     ticket_num: "",
    //     action_taken: "",
    //     comments: []
    //   }, {
    //     mls_area: "REBC",
    //     exception_type: "data",
    //     client_code: "REM001",
    //     client_name: "Hespeler Rd Remax",
    //     last_run: "10/19/2015 5:01:03 PM",
    //     host_server: "MLS1",
    //     status: "New",
    //     create_date: "10/22/2015 9:00:00 PM",
    //     author: "system",
    //     body: "Credentials failed",
    //     cause: "",
    //     ticket_num: "",
    //     action_taken: "",
    //     comments: []
    //   }, {
    //     mls_area: "REKW",
    //     exception_type: "data",
    //     client_code: "ROY012",
    //     client_name: "Royal lePage Kitchener",
    //     last_run: "10/21/2015 3:14:35 PM",
    //     host_server: "MLS1",
    //     status: "New",
    //     create_date: "10/22/2015 9:01:00 PM",
    //     author: "system",
    //     body: "Credentials failed",
    //     cause: "",
    //     ticket_num: "",
    //     action_taken: "",
    //     comments: []
    //   },
    //
    // ]
  };

  o.get = function(id) {
    return $http.get(DATA_URL + 'mlsexceptions/' + id).then(function(res) {
      return res.data;
    });
  };

  o.getOpen = function() {
    return $http.get(DATA_URL + 'mlsexceptions/open').then(function(res) {
      return res.data;
    });
  };

  o.getAll = function() {
    //console.log("getting all... " + DATA_URL + 'mlsexceptions/');
    return $http.get(DATA_URL + 'mlsexceptions/'); //.then(function(res) {
      //console.log(res.data);
    //   return res.data;
    // });
  };

  return o;
}]);

app.controller("mainCtrl", [
  '$scope',
  'exItems',
  function($scope, exItems) {
    $scope.title = "red-board manager";
    exItems.getAll().then(function(res) {
      $scope.data =  res.data;
    }).catch(function(err, res) {
      $scope.data =  [{
          mls_area: "EBRDX",
          exception_type: "photo",
          client_code: "AME717",
          client_name: "A. Meadows Real Estate",
          last_run: "10/20/2015 6:24:46 PM",
          host_server: "PHOTOSRV1",
          status: "New",
          create_date: "10/22/2015 8:05:00 PM",
          author: "system",
          body: "The image failed to be retrieved from the server",
          cause: "",
          ticket_num: "",
          action_taken: "",
          comments: []
        }];



    });
    // [{
    //     mls_area: "EBRDX",
    //     exception_type: "photo",
    //     client_code: "AME717",
    //     client_name: "A. Meadows Real Estate",
    //     last_run: "10/20/2015 6:24:46 PM",
    //     host_server: "PHOTOSRV1",
    //     status: "New",
    //     create_date: "10/22/2015 8:05:00 PM",
    //     author: "system",
    //     body: "The image failed to be retrieved from the server",
    //     cause: "",
    //     ticket_num: "",
    //     action_taken: "",
    //     comments: []
    //   }, {
    //     mls_area: "EBRDI",
    //     exception_type: "data",
    //     client_code: "AME717",
    //     client_name: "A. Meadows Real Estate",
    //     last_run: "10/20/2015 6:24:46 PM",
    //     host_server: "MLS4",
    //     status: "New",
    //     create_date: "10/22/2015 8:00:00 PM",
    //     author: "system",
    //     body: "Could not connect to remote server",
    //     cause: "",
    //     ticket_num: "",
    //     action_taken: "",
    //     comments: []
    //   }, {
    //     mls_area: "REBC",
    //     exception_type: "data",
    //     client_code: "REM001",
    //     client_name: "Hespeler Rd Remax",
    //     last_run: "10/19/2015 5:01:03 PM",
    //     host_server: "MLS1",
    //     status: "New",
    //     create_date: "10/22/2015 9:00:00 PM",
    //     author: "system",
    //     body: "Credentials failed",
    //     cause: "",
    //     ticket_num: "",
    //     action_taken: "",
    //     comments: []
    //   }, {
    //     mls_area: "REKW",
    //     exception_type: "data",
    //     client_code: "ROY012",
    //     client_name: "Royal lePage Kitchener",
    //     last_run: "10/21/2015 3:14:35 PM",
    //     host_server: "MLS1",
    //     status: "New",
    //     create_date: "10/22/2015 9:01:00 PM",
    //     author: "system",
    //     body: "Credentials failed",
    //     cause: "",
    //     ticket_num: "",
    //     action_taken: "",
    //     comments: []
    //   },

    // ];
  }
]);

app.controller("itemCtrl", [
  '$scope',
  function($scope) {
    $scope.title = "red-board manager";
    //$scope.item = //{};
    $scope.item = {
        mls_area: "EBRDX",
        exception_type: "photo",
        client_code: "AME717",
        client_name: "A. Meadows Real Estate",
        last_run: "10/20/2015 6:24:46 PM",
        host_server: "PHOTOSRV1",
        status: "New",
        create_date: "10/22/2015 8:05:00 PM",
        author: "system",
        body: "The image failed to be retrieved from the server",
        cause: "",
        ticket_num: "",
        action_taken: "",
        comments: []
      };
     }
]);
