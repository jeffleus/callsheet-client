angular.module('starter.controllers')

.controller('SportsCtrl', function($scope, $http, AuthSvc) {
    AuthSvc.getUser().then(function(token) {
        var options = {
            headers: {
                'Authorization': token
            }
        };
        return $http.get('https://tsp5us21ie.execute-api.us-west-2.amazonaws.com/dev/sports', options);
    }).then(function(results) {
        var body = results.data;
        console.log(body.message);
        $scope.sports = body.sports;
        return results.data.message;
    }).catch(function(err) {
        console.error(err);
    });
});
