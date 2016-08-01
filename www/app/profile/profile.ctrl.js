(function() {
  angular.module('starter').controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'profileService', '$ionicHistory'];

  function ProfileCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams, profileService, $ionicHistory) {
    var logger = utilService.getLogger();
    logger.debug("ProfileCtrl start");

    // Variables section
    var pc = this;
    // View a profile
    pc.profile = {};

    pc.modalImgsArr = [];
    pc.dataOf = sConfig.dataOf.pinfo;
    pc.shortlited = false;
    pc.interested = false;

    // Function section
    var bootstrap = bootstrap;
    pc.showImagesModal = showImagesModal;
    pc.hideImagesModal = hideImagesModal;
    pc.setModalImgs = setModalImgs;
    pc.largeImg = largeImg;
    pc.viewProfile = viewProfile;
    pc.searchProfile = searchProfile;

    // Functions definations
    function searchProfile() {
      try {
        logger.debug("searchProfile function");
        var promise = profileService.getProfile($stateParams.userId);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            pc.profile = resp.data.profile;
            //utilService.appAlert(resp.messages, sConfig.appStates.signin, sConfig.msgs.success);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }


    function viewProfile() {
      try {
        logger.debug("viewProfile function");
        var promise = profileService.getProfile($stateParams.userId);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            pc.profile = resp.data.profile;
            //utilService.appAlert(resp.messages, sConfig.appStates.signin, sConfig.msgs.success);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    $ionicModal.fromTemplateUrl('app/profiles/images-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      pc.imagesModal = modal;
    });

    function showImagesModal(index) {
      logger.debug("showImagesModal function");
      $ionicSlideBoxDelegate.slide(index);
      pc.imagesModal.show();
    }

    function hideImagesModal() {
      logger.debug("hideImagesModal function");
      pc.imagesModal.hide();
    }

    $scope.$on('modal.hidden', function() {
      logger.debug('Modal is hidden!');
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      logger.debug('Modal is shown!');
    });



    function setModalImgs(imgs) {
      try {
        logger.debug("setModalImgs function");
        pc.modalImgsArr = imgs;
        pc.showImagesModal();
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
            pc.modalImgsArr = pc.ownImages.uri;
            index = pc.ownImages.uri.indexOf(img);
            break;
          case sConfig.picType.home:
            pc.modalImgsArr = pc.homeImages.uri;
            index = pc.homeImages.uri.indexOf(img);
            break;
          case sConfig.picType.dp:
            pc.modalImgsArr[0] = pc.dp.uri;
            break;
          case sConfig.picType.pp:
            pc.modalImgsArr[0] = 'img/sm-2.png';
            break;
        }
        pc.showImagesModal(index);
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function bootstrap() {
      try {
        logger.debug("bootstrap function")
        switch ($stateParams.functionNm) {
          case 'viewProfile':
            pc.viewProfile();
            break;
          default:
            pc.viewProfile();
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("ProfileCtrl end");
  }
})();
