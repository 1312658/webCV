/**
 * Created by Don on 6/5/16.
 */
app.controller("loginCtrl", ["$scope",
    function ($scope) {
        ref.onAuth(function (authData) {
            if (authData != null) {
                window.location = '#/';
            }
        });

        $scope.createAccount = function () {
            if ($scope.signUpForm.$invalid)
                return;
            $scope.isSignUpProcess = true;

            if ($scope.newPassword != $scope.confirmPassword)
            {
                getError("INVALID_CONFIRM_PASSWORD");
                $scope.isSignUpProcess = false;
                $scope.$digest();
                return;
            }

            ref.createUser({
                email: $scope.newEmail,
                password: $scope.newPassword
            }, function (error, userData) {
                if (error) {
                    getError(error.code);
                    $scope.isSignUpProcess = false;
                    $scope.$digest();
                } else {
                    $scope.email = $scope.newEmail;
                    $scope.password = $scope.newPassword;
                    $scope.Error = null;
                    $('#dialog-register').modal('hide');
                    $scope.$digest();
                }
            });
        };

        $scope.login = function () {
            if ($scope.form.$invalid)
                return;
            $scope.isLoginProcess = true;

            ref.authWithPassword({
                email: $scope.email,
                password: $scope.password
            }, function (error, authData) {
                if (error) {
                    getError(error.code);
                    $scope.isLoginProcess = false;
                    $scope.$digest();
                } else {
                    window.location = '#/';
                }
            }, {
                remember: "sessionOnly"
            });
        };

        $scope.loginFacebook = function () {
            ref.authWithOAuthPopup("facebook", function (error) {
                if (error) {
                    getError(error.code);
                } else {
                    window.location = '#/';
                }
            }, {
                remember: "sessionOnly",
                scope: "email"
            });
        };

        $scope.loginGooglePlus = function () {
            ref.authWithOAuthPopup("google", function (error) {
                if (error) {
                    getError(error.code);
                } else {
                    window.location = '#/';
                }
            }, {
                remember: "sessionOnly",
                scope: "email"
            });
        };

        function getError(error) {
            switch (error) {
                case "INVALID_EMAIL":
                    $scope.Error = "Email is invalid, please try again!";
                    break;
                case "INVALID_PASSWORD":
                    $scope.Error = "Password is invalid, please try again!";
                    break;
                case "INVALID_USER":
                    $scope.Error = "Email does not exist, please register new account.";
                    break;
                case "INVALID_CONFIRM_PASSWORD":
                    $scope.Error = "These passwords don't match! Please try again";
                    break;
                default:
                    $scope.Error = "Error logging user in:" + error;
            }
        }
}]);