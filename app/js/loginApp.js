var app = angular.module("LinkedInApp", ["firebase"]);

app.controller("login", function ($scope, $firebase, $element) {
    var ref = new Firebase('https://1312678-linkedin.firebaseio.com');

    $scope.createAccount = function() {
        if($scope.signUpForm.$invalid)
            return;
        $scope.isSignUpProcess = true;
        
        ref.createUser({
            email    : $scope.newEmail,
            password : $scope.newPassword
        }, function(error, userData) {
            if (error) {
                getError(error);
                $scope.isSignUpProcess = false;
                $scope.$digest();
            } else {
                $scope.email = $scope.newEmail;
                $scope.password = $scope.newPassword;
                $scope.Error = null;
                $element.find('#dialog-register').modal('hide');
                $scope.$digest();
            }
        });
    };

    $scope.login = function(){
        if($scope.form.$invalid)
            return;
        $scope.isLoginProcess = true;

        ref.authWithPassword({
            email    : $scope.email,
            password : $scope.password
        }, function(error, authData) {
            if (error) {
                getError(error);
                $scope.isLoginProcess = false;
                $scope.$digest();
            } else {
                window.location = './index.html';
            }
        }, {
            remember: "sessionOnly"
        });
    };

    $scope.loginFacebook = function (){
        ref.authWithOAuthPopup("facebook", function(error) {
            if (error) {
                getError(error);
            } else {
                // We'll never get here, as the page will redirect on success.
                window.location = './index.html';
            }
        }, {
            remember: "sessionOnly",
            scope: "email"
        });
    };

    $scope.loginGooglePlus = function (){
        ref.authWithOAuthPopup("google", function(error) {
            if (error) {
                getError(error);
            } else {
                // We'll never get here, as the page will redirect on success.
                window.location = './index.html';
            }
        }, {
            remember: "sessionOnly",
            scope: "email"
        });
    };

    function getError(error){
        switch (error.code)
        {
            case "INVALID_EMAIL":
                $scope.Error = "Email is invalid, please try again!";
                break;
            case "INVALID_PASSWORD":
                $scope.Error = "Password is invalid, please try again!";
                break;
            case "INVALID_USER":
                $scope.Error = "Email does not exist. Please register.";
                break;
            default:
                $scope.Error = "Error logging user in:" + error;
        }
    }
});