/**
 * Created by Don on 6/5/16.
 */
app.controller("navigationBarCtrl", ["$scope", "$controller",
    function ($scope) {
        $scope.login = function () {
            window.location = "./#/login"
        };

        ref.onAuth(function (authData) {
            if (!authData) {
                $scope.isAuthData = false;
            }
            else {
                $scope.isAuthData = true;
                if (authData.provider == "google")
                    $scope.displayName = authData.google.displayName;
                else if (authData.provider == "facebook")
                    $scope.displayName = authData.facebook.displayName;
                else if (authData.provider == "password")
                    $scope.displayName = authData.password.email;
            }
        });

        $scope.logout = function() {
            ref.unauth();
            window.location = "#/login";
        }
    }
]);