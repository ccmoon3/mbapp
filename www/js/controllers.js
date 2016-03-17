angular.module('starter.controllers', [])

.config(function($compileProvider){
$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);
})

.controller('DashCtrl', function($scope, $cordovaCamera) {
 /*  $scope.takePhoto = function() {
         console.log("takePhoto");
         Camera.getPicture().then(function(imageURI) {
              console.log(imageURI);
              $scope.lastPhoto = imageURI;
              $scope.ImageURI =  imageURI;
       //       UploadPicture(imageURI);
         }, function(err) {
            console.err(err);
         }, {
             quality: 75,
             allowEdit : true,
             saveToPhotoAlbum: true
         });
    }*/
    $scope.takePhoto = function () {

                           var options = {
                             quality: 50,
                             allowEdit: true,
                             targetWidth: 100,
                             targetHeight: 100,
                             saveToPhotoAlbum: true,
                       	  correctOrientation:true
                           };

                           $cordovaCamera.getPicture(options).then(function(imageData) {
                             var image = document.getElementById('myImage');
                             image.src = "data:image/jpeg;base64," + imageData;
                             console.log(imageData);
                           }, function(err) {
                             // error
                           });

                         }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
