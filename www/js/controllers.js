angular.module('starter.controllers', [])

.config(function($compileProvider){
$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);
})

.controller('DashCtrl', function($scope, $cordovaCamera) {
    var MaxWidth = 0.9*window.innerWidth;
    var MaxHeight = 0.8*window.innerHeight;
    $scope.takePhoto = function () {

                /*           var options = {
                             quality: 50,
                             destinationType: Camera.DestinationType.FILE_URI,
                             sourceType: Camera.PictureSourceType.CAMERA,
                             allowEdit: true,
                             saveToPhotoAlbum: true,
                       	     correctOrientation:true
                           };

                           $cordovaCamera.getPicture(options).then(function(imageURI) {*/
                             imageURI = "img/test.png";
                             loadImage(imageURI, function(canvas){
                                dataURL = canvas.toDataURL("image/png");
                       //         console.log(dataURL);
                         //       alert(dataURL);
                                $(function() {
                                                                           var params = {
                                                                               // Request parameters
                                                                               "returnFaceId": "false",
                                                                               "returnFaceLandmarks": "false",
                                                                               "returnFaceAttributes": "gender",
                                                                           };

                                                                           $.ajax({
                                                                               url: "https://api.projectoxford.ai/face/v1.0/detect?" + $.param(params),
                                                                     //          url: "https://api.projectoxford.ai/face/v1.0/detect",
                                                                               beforeSend: function(xhrObj){
                                                                                   // Request headers
                                                                          //         xhrObj.setRequestHeader("Content-Type","application/json");
                                                                                   xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
                                                                                   xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","305d3ac2f26f4247bf9175c59f5802ab");
                                                                               },
                                                                               type: "POST",
                                                                               // Request body
                                                                               data: makeblob(dataURL),
                                                                      //         data:'{"url":"http://images.wisegeek.com/triangular-face.jpg"}',
                                                                               processData: false,
                                                                           })
                                                                           .done(function(data) {
                                                                               console.log(JSON.stringify(data));
                                                                               alert("face++ send done.");
                                                                               alert(data[0].faceAttributes.gender);
                                                                               console.log(data[0].faceAttributes.gender);
                                                                           })
                                                                           .fail(function(error) {
                                                                               console.log(JSON.stringify(error));
                                                                               alert("face++ error.");
                                                                           });
                                                                       });
                          /*        $(function() {
                                         var params = {
                                             // Request parameters
                                             "visualFeatures": "Face",
                                         };

                                         $.ajax({
                                              url: "https://api.projectoxford.ai/vision/v1/analyses?" + $.param(params),
                                             beforeSend: function(xhrObj){
                                                 // Request headers
                                                 xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                                                 xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","721e1c0487cb45d8b6356644c5c8709e");
                                             },
                                             type: "POST",
                                             // Request body
                                             data: makeblob(dataURL),
                                             processData: false,
                                         })
                                         .done(function(data) {
                                             console.log(JSON.stringify(data));
                                             alert("success");
                                         })
                                         .fail(function(error) {
                                             console.log(JSON.stringify(error));
                                             alert("error");
                                         });
                                     });*/
                                });

                     /*      }, function(err) {
                             // error
                             alert(err);
                           });*/

                         }

         function loadImage(imageURI, callback){
                var canvas = document.getElementById('selfie');
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                var image = new Image();

               image.onload = function() {
                   	//todo:wrap function
                    if(image.width> MaxWidth ||image.height> MaxHeight||(image.height< MaxHeight && image.width< MaxWidth)){
                            scale =  Math.min(MaxWidth / image.width,MaxHeight / image.height );
                            image.height = scale * image.height;
                            image.width = scale * image.width;
                    }
                    canvas.width = image.width;
                    canvas.height = image.height;
                    Width = canvas.width;
                    Height = canvas.height;
                    ctx.drawImage(image, 0, 0, image.width, image.height);
                    callback(canvas);
               };

               image.src = imageURI;
         }



      // convert base64/URLEncoded data component to raw binary data held in a string
         makeblob = function (dataURL) {
                     var BASE64_MARKER = ';base64,';
                     if (dataURL.indexOf(BASE64_MARKER) == -1) {
                         var parts = dataURL.split(',');
                         var contentType = parts[0].split(':')[1];
                         var raw = decodeURIComponent(parts[1]);
                         return new Blob([raw], { type: contentType });
                     }
                     var parts = dataURL.split(BASE64_MARKER);
                     var contentType = parts[0].split(':')[1];
                     var raw = window.atob(parts[1]);
                     var rawLength = raw.length;

                     var uInt8Array = new Uint8Array(rawLength);

                     for (var i = 0; i < rawLength; ++i) {
                         uInt8Array[i] = raw.charCodeAt(i);
                     }

                     return new Blob([uInt8Array], { type: contentType });

          /*           BlobToBinaryString(new Blob([uInt8Array], { type: contentType }), function(databinary){
                        console.dir(databinary);
                        $(function() {
                                                                       var params = {
                                                                           // Request parameters
                                                                           "returnFaceId": "true",
                                                                           "returnFaceLandmarks": "false",
                                                                           "returnFaceAttributes": "gender",
                                                                       };

                                                                       $.ajax({
                                                                           url: "https://api.projectoxford.ai/face/v1.0/detect?" + $.param(params),
                                                                           beforeSend: function(xhrObj){
                                                                               // Request headers
                                                                               xhrObj.setRequestHeader("Content-Type","application/json");
                                                                               xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","305d3ac2f26f4247bf9175c59f5802ab");
                                                                           },
                                                                           type: "POST",
                                                                           // Request body
                                                                           data: JSON.stringify(makeblob(dataURL)),
                                                                       })
                                                                       .done(function(data) {
                                                                           alert("done.");
                                                                           alert(data);
                                                                           alert("Gender:"+data.faceAttributes.gender);
                                                                       })
                                                                       .fail(function(error) {
                                                                           alert("fail.");
                                                                           console.log(JSON.stringify(error));
                                                                           alert(error);
                                                                           console.log(error.message);
                                                                           alert("Error Message:"+error.message);
                                                                       });
                                                                   });
                     });*/
                 }

        BlobToBinaryString = function(blob, callback, opt_errorCallback) {
                     var reader = new FileReader();
                     reader.onload = function(e) {
                       alert(e.target.result);
                       callback(e.target.result);
                     };
                     reader.onerror = function(e) {
                       if (opt_errorCallback) {
                         opt_errorCallback(e);
                       }
                     };
                     reader.readAsBinaryString(blob);
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
