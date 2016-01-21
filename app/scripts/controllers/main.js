'use strict';

angular.module('imageEditorApp')
  .controller('MainCtrl', function ($scope) {
    // your friend: console.log();    

    $scope.setImageFile = function (element) {
      // get the image file from element
      // start to put the file into canvas element
      // fileReader
      // onload 
      var reader = new FileReader();
      reader.onload = function (e) {
        $scope.image.src = e.target.result;
      };
      reader.readAsDataURL(element.files[0]);
      $scope.image.onload = $scope.resetImage;
    };

    $scope.init = function () {
      // initialize default values for variables
      $scope.brightness = 0;
      $scope.contrast = 1;
      $scope.strength = 1;
      $scope.color = {
        red: 255,
        green: 189,
        blue: 0
      };
      $scope.autocontrast = false;
      $scope.vignette = false;
      $scope.canvas = angular.element('#myCanvas')[0];
      $scope.ctx = $scope.canvas.getContext('2d');
      $scope.image = new Image();
    };

    $scope.init();

    $scope.resetImage = function () {
      // when image data is loaded, (after onload)
      // put the data into canvas element
      $scope.ctx.drawImage($scope.image, 0, 0, $scope.canvas.width, $scope.canvas.height);
    };

});