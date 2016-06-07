/**
 * Created by Dell on 6/4/2016.
 */
var app = angular.module('webCV', ["ngSanitize", "firebase", "ngAnimate", "ngRoute"]);


var ref = new Firebase('https://3tboy-webcv.firebaseio.com');
var isNewUser = true;

app.component('navigationbar', {
    templateUrl: './View/Widgets/NavigationBar/NavigationBar.html',
    controller: 'navigationBarCtrl'
});

app.component('navigationlogin', {
    templateUrl: 'View/Widgets/UserNavigation/UserLogin.html',
    controller: 'navigationBarCtrl'
});

app.component('navigationmenu', {
    templateUrl: 'View/Widgets/UserNavigation/UserMenu.html',
    controller: 'navigationBarCtrl'
});

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './View/Home/index.html',
            controller: 'homeCtrl'
        })
        .when('/login', {
            templateUrl: './View/Login/index.html',
            controller: 'loginCtrl'
        })
        .when('/profile', {
            templateUrl: './View/Profile/index.html',
            controller: 'profileCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })
});