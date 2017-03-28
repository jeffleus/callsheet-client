angular.module('starter.controllers')

.controller('CategoriesCtrl', function($scope, $http, AuthSvc) {
    AuthSvc.getUser().then(function(token) {
        var options = {
            headers: {
                'Authorization': token
            }
        };
        return $http.get('https://f4xwnt7xra.execute-api.us-west-2.amazonaws.com/dev/categories', options);
    }).then(function(results) {
        var body = results.data;
        console.log(body.message);
        $scope.categories = body.categories;
        return results.data.message;
    }).catch(function(err) {
        console.error(err);
    });
});
