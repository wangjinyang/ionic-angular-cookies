// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  .controller('mainCtrl',['$scope','$http',function($scope,$http){

    //change the server address to your self
    var server='http://[YOUR IP HERE]:3000'

    $scope.cookiesValue='please click button set cookies'

    $scope.setCookiesStatu=true


    $scope.setCookies=function() {
      $http({
        url: server + '/setCookies',
        method: 'GET'
      }).success(function (data, header, config, status) {
        alert('set cookies success,look console')
        $scope.setCookiesStatu=false
        console.log(data)
        $scope.cookiesValue=data
      }).error(function (data, header, config, status) {
        alert('set cookies error,check console or your server address is wrong')
        console.log(data)
      });
    }

    $scope.getCookies=function() {
      $http({
        url: server + '/getCookies',
        method: 'GET'
      }).success(function (data, header, config, status) {
        alert('get cookies success,look console')
        console.log(data)
        $scope.cookiesValue=data
      }).error(function (data, header, config, status) {
        alert('get cookies error,check console or your server address is wrong')
        console.log(data)
      });
    }
  }])
