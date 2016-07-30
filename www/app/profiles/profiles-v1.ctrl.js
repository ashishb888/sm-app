(function() {
  angular.module('starter').controller('ProfilesCtrlv1', ProfilesCtrlv1);

  ProfilesCtrlv1.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'profileService'];

  function ProfilesCtrlv1(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams, profileService) {
    var logger = utilService.getLogger();
    logger.debug("ProfilesCtrlv1 start");

    // Variables section
    var pc = this;

    pc.modalImgsArr = [];
    pc.dataOf = sConfig.dataOf.pinfo;

    // Function section
    var bootstrap = bootstrap;
    var setFProfiles = setFProfiles;
    pc.showImagesModal = showImagesModal;
    pc.hideImagesModal = hideImagesModal;
    pc.setModalImgs = setModalImgs;
    pc.largeImg = largeImg;
    pc.showProfileFModal = showProfileFModal;
    pc.hideProfileFModal = hideProfileFModal;
    //pc.updatePInfo = updatePInfo;

    $ionicModal.fromTemplateUrl('app/images/images-modal.html', {
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

    $ionicModal.fromTemplateUrl('app/profiles/profile-filter-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      pc.profileFModal = modal;
    });

    function showProfileFModal() {
      logger.debug("showProfileFModal function");
      setFProfiles();
      pc.profileFModal.show();
    }

    function hideProfileFModal() {
      logger.debug("hideProfileFModal function");
      pc.profileFModal.hide();
    }

    // Cleanup the modal when we're done with it!
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      logger.debug('Modal is hidden!');
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      logger.debug('Modal is shown!');
    });

    function setFProfiles() {
      try {
        logger.debug("setFProfiles function");

        if (pc.ageArr.length == 0)
          initAgeArr();

        if (pc.heightArr.indexOf("Any") == -1) {
          pc.heightArr.splice(0, 0, "Any");
          pc.complexionArr.splice(0, 0, "Any");
          pc.bodyTypeArr.splice(0, 0, "Any");
          pc.subCasteArr.splice(0, 0, "Any");
        }

        pc.pff.minAge = pc.ageArr[0];
        pc.pff.maxAge = pc.ageArr[0];;
        pc.pff.minHeight = pc.heightArr[0];
        pc.pff.maxHeight = pc.heightArr[0];
        pc.pff.complexion = pc.complexionArr[0];
        pc.pff.bodyType = pc.bodyTypeArr[0];
        pc.pff.subCaste = pc.subCasteArr[0];
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

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

      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("ProfilesCtrlv1 end");
  }
})();
