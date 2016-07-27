(function() {
  angular.module('starter').factory('cameraService', cameraService);

  cameraService.$inject = ['utilService', '$cordovaCamera', '$cordovaFile', 'starterConfig', '$cordovaImagePicker'];

  function cameraService(utilService, $cordovaCamera, $cordovaFile, sConfig, $cordovaImagePicker) {
    var cs = this;
    var logger = utilService.getLogger();
    logger.debug("cameraService service");

    // services
    cs.clickImage = clickImage;
    cs.selectImage = selectImage;

    function clickImage(srcType) {
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
          quality: sConfig.picProps.quality,
          targetWidth: sConfig.picProps.width,
          targetHeight: sConfig.picProps.height,
          correctOrientation: true
        }
        var imageData = {};
        return $cordovaCamera.getPicture(options)
          .then(function(imageURI) {
            logger.debug("imageURI: " + imageURI);
            imageData.uri = [imageURI];
            return imageData;
            /*if(sConfig.picSrc.galary === srcType)
              return imageData;*/

            /*var pathArr = imageURI.split("/");
            var fileNm = encodeURI(pathArr.pop());
            return $cordovaFile.readAsDataURL(pathArr.join("/"), fileNm)
              .then(function(fileData) {
                logger.debug("fileData: " + fileData);
                imageData.base64 = fileData.split(',').pop();
                return imageData;
              }, function(error) {
                logger.error("error: " + JSON.stringify(error));
              });*/
          }, function(error) {
            logger.error("error: " + JSON.stringify(error));
          });
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function selectImage(nImgs) {
      try {
        if(nImgs === undefined)
          nImgs = 5;

        var imageData = {};
        imageData.uri = [];
        var options = {
          maximumImagesCount: nImgs,
          width: sConfig.picProps.width,
          height: sConfig.picProps.height,
          quality: sConfig.picProps.quality
        };

        return $cordovaImagePicker.getPictures(options)
          .then(function(uriArr) {
            for (var i = 0, len = uriArr.length; i < len; i++) {
              logger.debug('Image URI: ' + uriArr[i]);
              imageData.uri.push(uriArr[i]);
            }
            return imageData;
          }, function(error) {
            logger.error("error: " + JSON.stringify(error));
          });
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    // Return service
    return cs;
  }
})();
