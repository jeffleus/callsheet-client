angular.module('starter.controllers')

.controller('AthletesCtrl', function($scope, $http, $stateParams, AuthSvc) {
    $scope.athletes = [];
    
    $scope.$on('$ionicView.enter', function() {
        AuthSvc.getUser().then(function(token) {
            var options = {
                headers: {
                    'Authorization': token
                }
            };
            var sport = $stateParams.sport;
            return $http.get('https://9cyvf89py9.execute-api.us-west-2.amazonaws.com/dev/athletes?filter=' + sport, options);
        }).then(function(results) {
            var body = results.data;
            $scope.athletes = body.athletes;
            return results.data.message;            
        }).catch(function(err) {
            console.error(err);
        });
    });
});
