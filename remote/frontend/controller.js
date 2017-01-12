var rikensApp = angular.module('rikensApp', []);

rikensApp.controller('MyController', ['$scope', '$http', function($scope, $http) {
	// $scope.text = "hello ther";
    $http.get('http://localhost:3000/wiki/deesha').
        success(function(data){
            console.log('success');
            console.log(data.text);
            // $scope.text = { hey : data };
    }).
        error(function(data, status ){
            console.log('error');
            console.log(status);
    });
}]);