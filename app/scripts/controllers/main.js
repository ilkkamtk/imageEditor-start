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
      // set size of canvas to match image size
      $scope.canvas.height = $scope.image.height;
      $scope.canvas.width = $scope.image.width;

      // put the data into canvas element
      $scope.ctx.drawImage($scope.image, 0, 0, $scope.canvas.width, $scope.canvas.height);
      
      // read pixel data
      $scope.imageData = $scope.ctx.getImageData(0, 0, $scope.canvas.width, $scope.canvas.height);
      $scope.pixels = $scope.imageData.data;
      $scope.numPixels = $scope.imageData.width * $scope.imageData.height;
    };
  
  
    // Generic method for resetting image, applying filters and updating canvas
    $scope.applyFilters = function() {
      $scope.resetImage();

      setBrightness();
      setContrast();

      $scope.ctx.clearRect(0, 0, $scope.canvas.width, $scope.canvas.height);
      $scope.ctx.putImageData($scope.imageData, 0, 0);
    };

    // FILTERS
    
    var setBrightness = function () {
      // type of input field value is string and must be parsed to int to make
      // numeric calculations instead of string concatenation
      var brightnessInt = parseInt($scope.brightness);
      // iterate through pixel array and modify values of each pixel one by one 
      for (var i = 0; i < $scope.numPixels; i++) {
        $scope.pixels[i * 4] += brightnessInt; // Red
        $scope.pixels[i * 4 + 1] += brightnessInt; // Green 
        $scope.pixels[i * 4 + 2] += brightnessInt; // Blue
      }
    };  

    var setContrast = function () {
      // type of input field value is string and must be parsed to float to make
      // numeric calculations instead of string concatenation
      var contrastFloat = parseFloat($scope.contrast);
      // iterate through pixel array and modify rgb values of each pixel one by one 
      for (var i = 0; i < $scope.numPixels; i++) {
        $scope.pixels[i * 4] = ($scope.pixels[i * 4] - 128) * contrastFloat + 128; // Red
        $scope.pixels[i * 4 + 1] = ($scope.pixels[i * 4 + 1] - 128) * contrastFloat + 128; // Green
        $scope.pixels[i * 4 + 2] = ($scope.pixels[i * 4 + 2] - 128) * contrastFloat + 128; // Blue
        
      }
    };  


});
