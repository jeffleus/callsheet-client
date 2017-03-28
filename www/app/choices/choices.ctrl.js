angular.module('starter.controllers')

.controller('ChoicesCtrl', function($scope, $http, $stateParams, AuthSvc) {
    $scope.choices = [];
    
    $scope.$on('$ionicView.enter', function() {
        AuthSvc.getUser().then(function(token) {
            var options = {
                headers: {
                    'Authorization': token
                }
            };
            var catid = $stateParams.catid;
            return $http.get('https://mna6x5va5e.execute-api.us-west-2.amazonaws.com/dev/choices?filter=' + catid, options);
        }).then(function(results) {
            var body = results.data;
            $scope.choices = body.choices;
            return results.data.message;            
        }).catch(function(err) {
            console.error(err);
        });
    });
});
