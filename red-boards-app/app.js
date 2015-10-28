var app = angular.module("redBoards", []);



// app.config([]);
//
// app.factory([]);

app.controller("mainCtrl", [
  '$scope',
  function($scope) {
    $scope.title = "red-board manager";
    $scope.data = [{
        "mls_area": "EBRDX",
        "exception_type": "photo",
        "client_code": "AME717",
        "client_name": "A. Meadows Real Estate",
        "last_run": "10/20/2015 6:24:46 PM",
        "host_server": "PHOTOSRV1",
        "status": "New",
        "create_date": "10/22/2015 8:05:00 PM",
        "author": "system",
        "body": "The image failed to be retrieved from the server"
      }, {
        "mls_area": "EBRDI",
        "exception_type": "data",
        "client_code": "AME717",
        "client_name": "A. Meadows Real Estate",
        "last_run": "10/20/2015 6:24:46 PM",
        "host_server": "MLS4",
        "status": "New",
        "create_date": "10/22/2015 8:00:00 PM",
        "author": "system",
        "body": "Could not connect to remote server"
      }, {}, {},

    ];
  }
]);