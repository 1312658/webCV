/**
 * Created by Don on 6/6/16.
 */
app.controller("homeCtrl", ["$scope","$firebaseArray", "$firebaseObject", "$location",
    function($scope, $firebaseArray, $firebaseObject, $location) {
        var newsRef = ref.child('News');
        var userRef = ref.child('Users');
        $scope.newsArray = $firebaseArray(newsRef);


        ref.onAuth(function (authData) {
            if (!authData) {
                $scope.avatar = "https://www.filestackapi.com/api/file/JXRwKdQlGRfQkzvc1NWQ";
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

                userRef.once("value", function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        if (authData.uid == childSnapshot.key()) {
                            isNewUser = false;
                            var avatarSnapshot = childSnapshot.child('profile').child('avatar');
                            $scope.avatar = avatarSnapshot.val();
                            $scope.$digest();
                            return true;
                        }
                    });
                    if (isNewUser == true) {
                        $scope.avatar = "https://www.filestackapi.com/api/file/JXRwKdQlGRfQkzvc1NWQ";
                        $scope.$digest();
                        userRef.child(authData.uid).child("profile").set({
                            "firstname": $scope.displayName,
                            //Avatar mặc định
                            "avatar": "https://www.filestackapi.com/api/file/JXRwKdQlGRfQkzvc1NWQ",
                            "webAddress": $location.absUrl() + '/profile'
                        });

                    }
                });
            }
        });

        $scope.clickJoin = function() {
            if (!$scope.isAuthData) {
                window.location = "#/login";
            }
            else {
                alert("Joined");
            }
        };

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
    }
]);