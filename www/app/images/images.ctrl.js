(function() {
  angular.module('starter').controller('ImagesCtrl', ImagesCtrl);

  ImagesCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'imagesService'];

  function ImagesCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams, imagesService) {
    var logger = utilService.getLogger();
    logger.debug("ImagesCtrl start");

    // Variables section
    var ic = this;

    // Image upload
    ic.isOwnPhotoForm = true;
    ic.isHomePhotoForm = false;

    ic.noImg = "./img/noimg.gif";

    // DP
    ic.dp;
    ic.noavatar = "./img/no-avatar.png";

    // Photo form
    ic.pf = {};
    ic.imgs = {};
    /*ic.imgs.imgURIs = [];
    ic.imgs.imgBase64s = [];*/
    ic.ownImages = {};
    ic.ownImages.uri = [];
    ic.ownImages.base64 = [];
    ic.ownImages.index = 0;
    ic.homeImages = {};
    ic.homeImages.uri = [];
    ic.homeImages.base64 = [];
    ic.homeImages.index = 0;
    ic.homeImagesLimit = 5;
    ic.ownImagesLimit = 5;
    ic.disableImgsUploadBtn = true;

    // Function section
    var bootstrap = bootstrap;
    var getImages = getImages;
    var ownBase64 = ownBase64;
    var homeBase64 = homeBase64;
    ic.showImagesModal = showImagesModal;
    ic.hideImagesModal = hideImagesModal;
    ic.showOwnPhotoForm = showOwnPhotoForm;
    ic.showHomePhotoForm = showHomePhotoForm;
    ic.updateOwnImgs = updateOwnImgs;
    ic.getOwnImgs = getOwnImgs;

    // These functions should be common place.
    ic.setModalImgs = setModalImgs;
    ic.largeImg = largeImg;
    ic.addImgs = addImgs;

    ic.removeImg = removeImg;

    /*ic.ownImages.uri.push('img/sm-1.jpg');
    ic.ownImages.uri.push('img/sm-2.png');*/

    $ionicModal.fromTemplateUrl('app/images/images-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      ic.imagesModal = modal;
    });

    function showImagesModal(index) {
      logger.debug("showImagesModal function");
      $ionicSlideBoxDelegate.slide(index);
      ic.imagesModal.show();
    }

    function hideImagesModal() {
      logger.debug("hideImagesModal function");
      ic.imagesModal.hide();
    }

    $scope.$on('modal.hidden', function() {
      logger.debug('Modal is hidden!');
    });

    $scope.$on('modal.removed', function() {
      // Execute action
    });

    $scope.$on('modal.shown', function() {
      logger.debug('Modal is shown!');
    });

    function updateOwnImgs() {
      try {
        logger.debug("updateOwnImgs function");

        var req = {
          data:{
            _id: lsService.get("_id"),
            type: "own"
          }
        };

        req.data.ownImgs = ic.ownImages.base64;
        var promise = imagesService.updateImgs(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            utilService.appAlert(resp.messages, null, sConfig.msgs.success);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function getOwnImgs() {
      try {
        logger.debug("getOwnImgs function");

        var promise = imagesService.getImgs(sConfig.picType.own, lsService.get("_id"));

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            for (var i = 0; i < resp.data.base64.length; i++) {
              ic.ownImages.base64[i] = resp.data.base64[i];
            }
            // utilService.appAlert(resp.messages, null, sConfig.msgs.success);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function showOwnPhotoForm() {
      try {
        logger.debug("showOwnPhotoForm function");

        ic.dataOf = sConfig.dataOf.pown;
        ic.isOwnPhotoForm = true;
        ic.isHomePhotoForm = false;
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function showHomePhotoForm() {
      try {
        logger.debug("showHomePhotoForm function");

        ic.dataOf = sConfig.dataOf.phome;
        ic.isOwnPhotoForm = false;
        ic.isHomePhotoForm = true;
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function addImgs(type, srcType) {
      try {
        logger.debug("addImgs function");

        var promise;

        switch (type) {
          case sConfig.picType.own:
            promise = getImages(srcType, ic.ownImagesLimit - ic.ownImages.uri.length);
            promise.then(function(imageData) {
              logger.debug("imageData: " + JSON.stringify(imageData));
              for (var i = 0, len = imageData.uri.length; i < len; i++) {
                ic.ownImages.uri.push(imageData.uri[i]);
              }
              ownBase64(imageData.uri, 0);
            });
            break;
          case sConfig.picType.home:
            promise = getImages(srcType, ic.homeImagesLimit - ic.homeImages.uri.length);
            promise.then(function(imageData) {
              logger.debug("imageData: " + JSON.stringify(imageData));
              for (var i = 0, len = imageData.uri.length; i < len; i++) {
                ic.homeImages.uri.push(imageData.uri[i]);
              }
              homeBase64(imageData.uri, 0);
            });
            break;
          case sConfig.picType.dp:
            promise = getImages(srcType, 1);
            promise.then(function(imageData) {
              logger.debug("imageData: " + JSON.stringify(imageData));
              ic.dp = imageData.uri[0];
            });
            break;
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function removeImg(type, img) {
      try {
        logger.debug("removeImg function");
        switch (type) {
          case sConfig.picType.own:
            ic.ownImages.uri.splice(ic.ownImages.uri.indexOf(img), 1);
            break;
          case sConfig.picType.home:
            ic.homeImages.uri.splice(ic.homeImages.uri.indexOf(img), 1);
            break;
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function getImages(srcType, nImgs) {
      try {
        logger.debug("getImages function");

        switch (srcType) {
          case sConfig.picSrc.camera:
            return cameraService.clickImage(srcType);
            break;
          case sConfig.picSrc.galary:
            return cameraService.selectImage(nImgs);
            break;
          default:
            return cameraService.clickImage(srcType);
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function setModalImgs(imgs) {
      try {
        logger.debug("setModalImgs function");
        ic.modalImgsArr = imgs;
        ic.showImagesModal();
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function largeImg(type, img) {
      try {
        logger.debug("largeImg function");

        var index = 0;

        switch (type) {
          case sConfig.picType.own:
            ic.modalImgsArr = ic.ownImages.uri;
            index = ic.ownImages.uri.indexOf(img);
            break;
          case sConfig.picType.home:
            ic.modalImgsArr = ic.homeImages.uri;
            index = ic.homeImages.uri.indexOf(img);
            break;
          case sConfig.picType.dp:
            ic.modalImgsArr[0] = ic.dp;
            break;
          case sConfig.picType.pp:
            ic.modalImgsArr[0] = 'img/sm-2.png';
            break;
        }
        ic.showImagesModal(index);
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function ownBase64(imgURIs, index) {
      try {
        logger.debug("ownBase64 function");

        var len = imgURIs.length;
        if (index == null || index == undefined)
          index = 0;
        if (len == index)
          return;

        utilService.base64(imgURIs[index])
          .then(function(sucResp) {
            logger.debug("sucResp: " + sucResp);
            ic.ownImages.base64[index] = sucResp;
            index++;
            ownBase64(imgURIs, index);
          }, function(errResp) {
            logger.error("errResp: " + JSON.stringify(errResp));
          });
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function homeBase64(imgURIs, index) {
      try {
        logger.debug("homeBase64 function");

        var len = imgURIs.length;
        if (index == null || index == undefined)
          index = 0;
        if (len == index)
          return;

        utilService.base64(imgURIs[index])
          .then(function(sucResp) {
            logger.debug("sucResp: " + sucResp);
            ic.homeImages.base64[index] = sucResp;

            index++;
            homeBase64(imgURIs, index);
          }, function(errResp) {
            logger.error("errResp: " + JSON.stringify(errResp));
          });
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function bootstrap() {
      try {
        logger.debug("bootstrap function");

        switch ($stateParams.functionNm) {
          case "getOwnImgs":
            ic.getOwnImgs();
            break;
          default:
            ic.getOwnImgs();
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("ImagesCtrl end");
  }
})();
