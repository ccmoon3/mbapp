angular.module('starter.controllers', [])

.config(function($compileProvider){
$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);
})

.controller('DashCtrl', function($scope, $ionicPopup, $cordovaCamera) {
    var MaxWidth = 0.9*window.innerWidth;
    var MaxHeight = 0.8*window.innerHeight;

    $scope.takePhoto = function () {

                           var options = {
                             quality: 50,
                             destinationType: Camera.DestinationType.FILE_URI,
                             sourceType: Camera.PictureSourceType.CAMERA,
                             allowEdit: true,
                             saveToPhotoAlbum: true,
                       	     correctOrientation:true
                           };

                           $cordovaCamera.getPicture(options).then(function(imageURI) {
                       //      imageURI = "img/test.png";
                             loadImage(imageURI, function(canvas){
                             dataURL = canvas.toDataURL("image/png");
                                $(function() {
                                                                           var params = {
                                                                               // Request parameters
                                                                               "returnFaceId": "false",
                                                                               "returnFaceLandmarks": "false",
                                                                               "returnFaceAttributes": "gender",
                                                                           };

                                                                           $.ajax({
                                                                               url: "https://api.projectoxford.ai/face/v1.0/detect?" + $.param(params),
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
                                                                               timeout:4000
                                                                           })
                                                                           .done(function(data) {
                                                                               console.log(JSON.stringify(data));

                                                                               if (data && data[0] && data[0].faceAttributes){
                                                                                  if(data[0].faceAttributes.gender === "female"){
                                                                                     popAlert("This is a woman","Let\'s add mascara on it!");
                                                                                  }
                                                                                  else if(data[0].faceAttributes.gender === "male"){
                                                                                     popAlert("This is a man","Let\'s add razor on it!");
                                                                                  }
                                                                               }
                                                                               else {
                                                                                     popAlert("Cannot define the gender","Please take a clear selfie again!");
                                                                               }
                                                                           })
                                                                           .fail(function(error, textStatus) {
                                                                               if(textStatus === "timeout"){
                                                                                  popAlert("Failed from timeout", "Please check your Internet connection.");
                                                                                  //todo: recommend mascara or razor after reconnection
                                                                               }
                                                                               else{
                                                                                  popAlert("Request failed", error.message);
                                                                               }

                                                                               console.log(JSON.stringify(error));

                                                                           });
                                                                       });
                                });

                           }, function(err) {
                              popAlert("Camera connection failed","Restart the app and play again!");
                              console.log(err);
                           });

                         }

         function loadImage(imageURI, callback){
                var canvas = document.getElementById('selfie');
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                var image = new Image();
                console.log("loadImage"+imageURI);

               image.onload = function() {
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
                 }

        popAlert = function(head, text) {

              var alertPopup = $ionicPopup.alert({
                          title: head,
                          template: text
              });

          alertPopup.then(function(res) {
            console.log(text);
          });
        }


});
