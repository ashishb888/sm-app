(function() {
    angular.module('starter').factory('cameraService', cameraService);

    cameraService.$inject = ['utilService', '$cordovaCamera', '$cordovaFile'];

    function cameraService(utilService, $cordovaCamera, $cordovaFile) {
        var cs = this;
        var logger = utilService.getLogger();
        logger.debug("cameraService service");

        cs.clickImage = function(){
            try {
                logger.debug("clickImage service");
                var options = {
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    popoverOptions: CameraPopoverOptions,
                    quality: 50,
                    targetWidth: 400,
                    targetHeight: 600,
                    correctOrientation: true
                }
                var imageData = {};
                return $cordovaCamera.getPicture(options)
                .then(function(imageURI) {
                    logger.debug("imageURI: " + imageURI);
                    imageData.uri = imageURI;
                    var pathArr = imageURI.split("/");
                    var fileNm = pathArr.pop();
                    return $cordovaFile.readAsDataURL(pathArr.join("/"), fileNm)
                    .then(function(fileData) {
                        logger.debug("fileData: " + fileData);
                        imageData.base64 = fileData.split(',').pop();
                        return imageData;
                    }, function(error) {
                        logger.error("error: " + error);
                    });
                }, function(error) {
                    logger.error("error: " + error);
                });
            } catch (exception) {
                logger.error("exception: " + exception);
            }
        };

        // Return service
        return cs;
    }
})();
