(function() {
    angular.module('starter').factory('cameraService', cameraService);

    cameraService.$inject = ['utilService', '$cordovaCamera', '$cordovaFile', 'starterConfig'];

    function cameraService(utilService, $cordovaCamera, $cordovaFile, sConfig) {
        var cs = this;
        var logger = utilService.getLogger();
        logger.debug("cameraService service");

        cs.clickImage = function(srcType){
            try {
                logger.debug("clickImage service");
                logger.debug("srcType: " + srcType);
                var sType;

                switch (srcType) {
                  case sConfig.picSrc.camera:
                    sType = Camera.PictureSourceType.CAMERA;
                    break;
                    case sConfig.picSrc.galary:
                      sType = Camera.PictureSourceType.PHOTOLIBRARY;
                      break;
                  default:
                    sType = Camera.PictureSourceType.PHOTOLIBRARY;
                }
                var options = {
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: sType,
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
                    /*if(sConfig.picSrc.galary === srcType)
                      return imageData;*/

                    var pathArr = imageURI.split("/");
                    var fileNm = encodeURI(pathArr.pop());
                    return $cordovaFile.readAsDataURL(pathArr.join("/"), fileNm)
                    .then(function(fileData) {
                        logger.debug("fileData: " + fileData);
                        imageData.base64 = fileData.split(',').pop();
                        return imageData;
                    }, function(error) {
                        logger.error("error: " + JSON.stringify(error));
                    });
                }, function(error) {
                    logger.error("error: " + JSON.stringify(error));
                });
            } catch (exception) {
                logger.error("exception: " + exception);
            }
        };

        // Return service
        return cs;
    }
})();
