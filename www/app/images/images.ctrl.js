(function() {
  angular.module('starter').controller('ImagesCtrl', ImagesCtrl);

  ImagesCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'imagesService', '$rootScope'];

  function ImagesCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams, imagesService, $rootScope) {
    var logger = utilService.getLogger();
    logger.debug("ImagesCtrl start");

    // Variables section
    var ic = this;

    // Image upload
    ic.isOwnPhotoForm = true;
    ic.isHomePhotoForm = false;

    ic.noImg = "./img/noimg.gif";

    ic.title = "Personal images";

    // DP
    ic.fullName;
    ic.dp = {};
    ic.noavatar = "./img/no-avatar.png";
    ic.modalImgsArr = [];

    // Photo form
    ic.pf = {};
    ic.imgs = {};
    /*ic.imgs.imgURIs = [];
    ic.imgs.imgBase64s = [];*/
    ic.ownImgs = [];
    ic.ownImages = {};
    ic.ownImages.uri = [];
    ic.ownImages.base64 = [];
    ic.ownImages.index = 0;
    ic.homeImgs = [];
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
    ic.updateHomeImgs = updateHomeImgs;
    ic.getOwnImgs = getOwnImgs;

    // These functions should be common place.
    ic.setModalImgs = setModalImgs;
    ic.largeImg = largeImg;
    ic.addImgs = addImgs;

    ic.removeImg = removeImg;
    ic.getHomeImgs = getHomeImgs
    ic.getDP = getDP;
    ic.updateDP = updateDP;

    // Functions definations
    function updateDP() {
      try {
        logger.debug("updateDP function");

        var req = {
          data: {
            _id: lsService.get("_id"),
            type: "dp"
          }
        };

        req.data.base64 = [];

        if (ic.dp._id != "local") {
          utilService.toastMessage("Nothing to upload.", null, sConfig.msgs.success);
          return;
        }

        req.data.base64.push(ic.dp.base64);

        var promise = imagesService.updateDP(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            
            $rootScope.rootDP = ic.dp.base64;
            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function getDP() {
      try {
        logger.debug("getDP function");

        ic.fullName = lsService.get("fullName");
        var promise = imagesService.getImgs(sConfig.picType.dp, lsService.get("_id"));
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            if (resp.data.images && resp.data.images.length > 0) {
              ic.dp = resp.data.images[0];
              if (ic.dp.base64) {
                $rootScope.rootDP = ic.dp.base64;
              }
            }

          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function getHomeImgs() {
      try {
        logger.debug("getHomeImgs function");

        var promise = imagesService.getImgs(sConfig.picType.home, lsService.get("_id"));

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            ic.homeImgs = resp.data.images;
            // utilService.appAlert(resp.messages, null, sConfig.msgs.success);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

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

    function updateHomeImgs() {
      try {
        logger.debug("updateHomeImgs function");

        var req = {
          data: {
            _id: lsService.get("_id"),
            type: "home"
          }
        };

        req.data.base64 = [];

        for (var i = 0, len = ic.homeImgs.length; i < len; i++) {
          if (ic.homeImgs[i]._id == "local") {
            req.data.base64.push(ic.homeImgs[i].base64);
          }
        }
        if (!req.data.base64 || req.data.base64.length === 0) {
          utilService.toastMessage("Nothing to upload.", null, sConfig.msgs.success);
          return;
        }
        //req.data.base64 = ic.ownImages.base64;
        var promise = imagesService.updateImgs(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function updateOwnImgs() {
      try {
        logger.debug("updateOwnImgs function");

        var req = {
          data: {
            _id: lsService.get("_id"),
            type: "own"
          }
        };

        req.data.base64 = [];

        for (var i = 0, len = ic.ownImgs.length; i < len; i++) {
          if (ic.ownImgs[i]._id == "local") {
            req.data.base64.push(ic.ownImgs[i].base64);
          }
        }
        if (!req.data.base64 || req.data.base64.length === 0) {
          utilService.toastMessage("Nothing to upload.", null, sConfig.msgs.success);
          return;
        }
        //req.data.base64 = ic.ownImages.base64;
        var promise = imagesService.updateImgs(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
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
            /*for (var i = 0; i < resp.data.base64.length; i++) {
              ic.ownImages.base64[i] = resp.data.base64[i];
            }*/
            ic.ownImgs = resp.data.images;
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
        ic.title = "Personal imagess";
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
        ic.title = "Home images";
        ic.getHomeImgs();
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
            promise = getImages(srcType, ic.ownImagesLimit - ic.ownImgs.length);
            promise.then(function(imageData) {
              // logger.debug("imageData: " + JSON.stringify(imageData));
              /*for (var i = 0, len = imageData.uri.length; i < len; i++) {
                ic.ownImgsUri.push(imageData.uri[i]);
              }*/
              ownBase64(imageData.uri, 0);
            });
            break;
          case sConfig.picType.home:
            promise = getImages(srcType, ic.homeImagesLimit - ic.homeImgs.length);
            promise.then(function(imageData) {
              // logger.debug("imageData: " + JSON.stringify(imageData));
              /*for (var i = 0, len = imageData.uri.length; i < len; i++) {
                ic.homeImages.uri.push(imageData.uri[i]);
              }*/
              homeBase64(imageData.uri, 0);
            });
            break;
          case sConfig.picType.dp:
            promise = getImages(srcType, 1);
            promise.then(function(imageData) {
              logger.debug("imageData: " + JSON.stringify(imageData));
              utilService.base64(imageData.uri[0])
                .then(function(sucResp) {
                  //logger.debug("sucResp: " + sucResp);
                  ic.dp = {
                    base64: sucResp,
                    _id: "local"
                  };
                }, function(errResp) {
                  logger.error("errResp: " + JSON.stringify(errResp));
                });
            });
            break;
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    /*function addImgs(type, srcType) {
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
    }*/

    function removeImg(type, id, index) {
      try {
        logger.debug("removeImg function");

        var promise;

        switch (type) {
          case sConfig.picType.own:
            if (id === "local") {
              ic.ownImgs.splice(index, 1);
              return;
            }
            promise = imagesService.removeImg(id);

            break;
          case sConfig.picType.home:
            if (id === "local") {
              ic.homeImgs.splice(index, 1);
              return;
            }
            promise = imagesService.removeImg(id);
            break;
        }

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              //utilService.toastMessage(resp.messages);
              return;
            }
            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
            if (type === sConfig.picType.home) {
              ic.homeImgs.splice(index, 1);
              return;
            }
            ic.ownImgs.splice(index, 1);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
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

    function largeImg(type, index) {
      try {
        logger.debug("largeImg function");

        switch (type) {
          case sConfig.picType.own:
            ic.modalImgsArr = ic.ownImgs;
            break;
          case sConfig.picType.home:
            ic.modalImgsArr = ic.homeImgs;
            break;
          case sConfig.picType.dp:
            ic.modalImgsArr[0] = {
              base64: ic.dp.base64
            };
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
            //ic.ownImages.base64[index] = sucResp;
            ic.ownImgs.push({
              base64: sucResp,
              _id: "local"
            });
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
            //ic.homeImages.base64[index] = sucResp;
            ic.homeImgs.push({
              base64: sucResp,
              _id: "local"
            });
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
          case "getDP":
            ic.getDP();
            break;
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("ImagesCtrl end");
  }
})();
