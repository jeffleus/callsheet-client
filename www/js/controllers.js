angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, AuthSvc) {
    
    $scope.authSvc = AuthSvc;

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = { username:"jeffleus-cs1", password:"GoBruins2017" };

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {      
      if (AuthSvc.isAuthenticated()) {
          return AuthSvc.logout();
      } else {
          $scope.modal.show();          
      }
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    
    AuthSvc.getUser().then(function(token) {
        if (token != null) {
            console.log(token);
            return token;
        } else {
            return AuthSvc.login($scope.loginData)
            .then(function(token) {
                console.log('back to the controller...');
                $scope.modal.hide();
                return token;
            }).catch(function(err) {
                console.error('error bubbled to the controller...');
            });            
        }
    });
    

//    // Simulate a login delay. Remove this and replace with your login
//    // code if using a login system
//    $timeout(function() {
//      $scope.closeLogin();
//    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $http, AuthSvc) {
    AuthSvc.getUser().then(function(token) {
        var options = {
            headers: {
                'Authorization': token
            }
        };
        return $http.get('https://9cyvf89py9.execute-api.us-west-2.amazonaws.com/dev/athletes?filter=wgo', options)
        .then(function(results) {
            var body = results.data;
            console.log(body.message);
            $scope.employees = body.athletes;
            return results.data.message;
        });
    }).catch(function(err) {
        console.error(err);
    });
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
