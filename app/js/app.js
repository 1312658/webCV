var app = angular.module("LinkedInApp", ["ngSanitize", "firebase", 'ngAnimate']);

app.controller("profile", ["$scope", "$firebaseObject",
    function($scope, $firebaseObject) {
        var ref = new Firebase('https://1312678-linkedin.firebaseio.com');
        $scope.profile = null;
        $scope.loading = true;
        $scope.$watch('profile', function () {
            console.log($scope.profile);
            if($scope.profile)
                $scope.loading = false;
        });
        $scope.profile = $firebaseObject(ref);

        $scope.authData = ref.getAuth();

        if ($scope.authData == null) {
            window.location = "./login.html";
        }
        else if ($scope.authData.provider == "google")
            $scope.displayName = $scope.authData.google.displayName;
        else if ($scope.authData.provider == "facebook")
            $scope.displayName = $scope.authData.facebook.displayName;
        else if ($scope.authData.provider == "password")
            $scope.displayName = $scope.authData.password.email;

        ref.onAuth(function(authData){
            if (!authData) {
                window.location = "login.html";
            }
        });

        $scope.logout = function() {
            ref.unauth();
        }

        $scope.visited = false;
    }
]);