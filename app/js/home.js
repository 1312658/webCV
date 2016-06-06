/**
 * Created by Dell on 6/4/2016.
 */

var app = angular.module("LinkedInApp", [ "firebase"]);

app.controller("newFeed", ["$scope","$firebaseArray",
    function($scope, $firebaseArray) {
        var newsRef = new Firebase('https://1312678-linkedin.firebaseio.com/News');
        $scope.newsArray = $firebaseArray(newsRef);
        //$scope.backgroundActive = null;

        // tạo mảng các phần tử được đưa lên đầu background
        var background = new Array();
        $scope.arrayBackground = function () {
            max = 0;
            background = new Array();

            for (var i = 0; i < $scope.newsArray.length; i++) {
                if ($scope.newsArray[i].NumberOfPerson > max)
                    max = $scope.newsArray[i].NumberOfPerson;
            }

            $scope.addMax(max);
            $scope.backgroundActive = background[0];
            background.splice(0, 1);

            return background;
        }

            // thêm các phần tử vào backgound trên tiêu chí là số lượng tuyển dụng lớn.
            $scope.addMax = function (itemMax) {
                for (var i = 0; i < $scope.newsArray.length; i++) {
                    if ($scope.newsArray[i].NumberOfPerson === itemMax) {

                        background.push($scope.newsArray[i]);
                        if (background.length >= 5)
                            return;
                        else
                            $scope.addMax(itemMax - 1)
                    }
                }
                (10)

            }
            // build dữ liệu cho các mục
            $scope.arraySkills = function (skills) {
                var array = new Array();
                for (var i = 0; i < $scope.newsArray.length; i++) {
                    if ($scope.newsArray[i].Skills.indexOf(skills) != -1)
                        array.push($scope.newsArray[i]);
                }
                return array;
            }
        $scope.clickJoin = function () {
            alert("123");
        }
    }
]);