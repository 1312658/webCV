var app = angular.module("LinkedInApp", ["ngSanitize", "firebase", 'ngAnimate']);

var ref = new Firebase('https://1312678-linkedin.firebaseio.com');
var userRef = ref.child("Users");
var isNewUser = true;

app.controller("profileCtrl", ["$scope", "$firebaseObject",
    function ($scope, $firebaseObject) {
        ref.onAuth(function (authData) {
            if (!authData) {
                window.location = "login.html";
            }
            else {
                if (authData.provider == "google")
                    $scope.displayName = authData.google.displayName;
                else if (authData.provider == "facebook")
                    $scope.displayName = authData.facebook.displayName;
                else if (authData.provider == "password")
                    $scope.displayName = authData.password.email;

                ref.child("Users").once("value", function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        if (authData.uid == childSnapshot.key()) {
                            isNewUser = false;
                            return true;
                        }
                    });
                    if (isNewUser == true) {
                        userRef.child(authData.uid).child("profile").set({
                            "firstname": $scope.displayName,
                            "avatar": "./picture/avatar.png"
                        });
                    }
                });
                $firebaseObject(userRef.child(authData.uid).child("profile")).$bindTo($scope, "profile");
                $scope.subProfile = $firebaseObject(userRef.child(authData.uid).child("profile"));
            }
        });

        $scope.logout = function () {
            ref.unauth();
        }

        $scope.visited = false;

        $scope.save = function () {
            $scope.profile = $scope.subProfile;
        };

        $scope.getSelectedJob = function ($index) {
            $scope.selectedJob = $scope.subProfile.jobs[$index];
        };

        $scope.getSelectedProject = function ($index) {
            $scope.selectedProject = $scope.subProfile.projects[$index];
        };

        $scope.getSelectedTopSkill = function ($index) {
            $scope.selectedTopSkill = $scope.subProfile.topSkills[$index];
        };

        $scope.getSelectedAnotherSkill = function ($index) {
            $scope.selectedAnotherSkill = $scope.subProfile.anotherSkills[$index];
        };

        $scope.getSelectedEducation = function ($index) {
            $scope.selectedEducation = $scope.subProfile.educations[$index];
        };


        $scope.reset = function () {
            $scope.subProfile = angular.copy($scope.profile);
        };

        $scope.saveTopSkill = function () {
            $scope.save();
        };

        $scope.saveAnotherSkill = function () {
            $scope.save();
        };

        $scope.removeExperience = function ($index) {
            $scope.subProfile.jobs.splice($index, 1);
            $scope.save();
        };

        $scope.removeTopSkill = function ($index) {
            $scope.subProfile.topSkills.splice($index, 1);
            $scope.save();
        };

        $scope.removeAnotherSkill = function ($index) {
            $scope.subProfile.anotherSkills.splice($index, 1);
            $scope.save();
        };

        $scope.removeEducation = function ($index) {
            $scope.subProfile.educations.splice($index, 1);
            $scope.save();
        };

        $scope.removeProject = function ($index) {
            $scope.subProfile.projects.splice($index, 1);
            $scope.save();
        };

        $scope.addJob = function () {
            if ($scope.subProfile.jobs == null)
                $scope.subProfile.jobs = new Array();
            $scope.subProfile.jobs.push($scope.newJob);
            $scope.save();
            $scope.newJob = null;
        };

        $scope.addTopSkill = function () {
            if ($scope.subProfile.topSkills == null)
                $scope.subProfile.topSkills = new Array();

            $scope.subProfile.topSkills.push($scope.newSkill);
            $scope.save();
            $scope.newSkill = null;
        };

        $scope.addAnotherSkill = function () {
            if ($scope.subProfile.anotherSkills == null)
                $scope.subProfile.anotherSkills = new Array();

            $scope.subProfile.anotherSkills.push($scope.newSkill);
            $scope.save();
            $scope.newSkill = null;
        };

        $scope.addEducation = function () {
            if ($scope.subProfile.educations == null)
                $scope.subProfile.educations = new Array();

            $scope.subProfile.educations.push($scope.newEducation);
            $scope.save();
            $scope.newEducation = null;
        };

        $scope.addProject = function () {
            if ($scope.subProfile.projects == null)
                $scope.subProfile.projects = new Array();

            $scope.subProfile.projects.push($scope.newProject);
            $scope.save();
            $scope.newProject = null;
        };

    }
]);