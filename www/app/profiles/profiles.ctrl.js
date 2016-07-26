(function() {
  angular.module('starter').controller('ProfilesCtrl', ProfilesCtrl);

  ProfilesCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', 'md5'];

  function ProfilesCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, md5) {
    var logger = utilService.getLogger();
    logger.debug("ProfilesCtrl start");

    // Variables section
    var pc = this;
    // Personal info form
    pc.pif = {};
    pc.genderArr = ["Male", "Female"];
    pc.pif.gender = pc.genderArr[0];
    pc.heightArr = [];
    pc.bodyTypeArr = ["Slim", "Average", "Athletic", "Heavy"];
    pc.pif.bodyType = pc.bodyTypeArr[0];
    pc.martitalStatusArr = ["Never married", "Widower", "Divorced", "Awaiting divorce"];
    pc.pif.martitalStatus = pc.martitalStatusArr[0];
    pc.complexionArr = ["Very fair", "Fair", "Wheatish", "Wheatish brown", "Dark"];
    pc.pif.complexion = pc.complexionArr[0];
    pc.physicalStatusArr = ["Normal", "Physically challenged"];
    pc.pif.physicalStatus = pc.physicalStatusArr[0];
    pc.eatingHabitArr = ["Vegetarian", "Non-vegetarian", "Eggetarian"];
    pc.pif.eatingHabit = pc.eatingHabitArr[0];
    pc.drinkingHabitArr = ["No", "Yes", "Occasionally"];
    pc.pif.drinkingHabit = pc.drinkingHabitArr[0];
    pc.smokingHabitArr = ["No", "Yes", "Occasionally"];
    pc.pif.smokingHabit = pc.smokingHabitArr[0];
    pc.subCasteArr = ["Swetamber", "Digamber", "Pancham"];
    pc.pif.subCaste = pc.subCasteArr[0];
    pc.pif.dob = new Date();

    // Form hide/show
    pc.isPInfoForm = true;
    pc.isPhotoForm = false;
    pc.isFamilyForm = false;
    pc.isOccupationForm = false;
    pc.isAddressForm = false;
    // Image upload
    pc.isOwnPhotoForm = true;
    pc.isHomePhotoForm = false;

    // Occupation form
    pc.of = {};
    pc.hEducationArr = ["Bellow 10th", "10th", "12th", "BA", "BSc", "BCom", "Diploma", "BE", "BTech", "ME", "MTech", "Ded", "Bed", "MCA", "BCA", "MA", "MSc"];
    pc.of.hEducation = pc.hEducationArr[0];
    pc.occupationArr = ["Job", "Farm", "Business"];
    pc.of.occupation = pc.occupationArr[0];

    // Family form
    pc.ff = {};
    pc.familyTypeArr = ["Joint family", "Nuclear family"];
    pc.ff.familyType = pc.familyTypeArr[0];
    pc.familyValuesArr = ["Traditional", "Moderate"];
    pc.ff.familyValues = pc.familyValuesArr[0];
    pc.familyStatusArr = ["Middle class", "Upper middle class"];
    pc.ff.familyStatus = pc.familyStatusArr[0];

    // Photo form
    pc.pf = {};
    pc.imgs = {};
    pc.imgs.imgURIs = [];
    pc.imgs.imgBase64s = [];
    pc.ownImages = {};
    pc.ownImages.uri = [];
    pc.ownImages.base64 = [];
    pc.ownImages.index = 0;
    pc.homeImages = {};
    pc.homeImages.uri = [];
    pc.homeImages.base64 = [];
    pc.homeImages.index = 0;
    pc.homeImagesLimit = 5;
    pc.ownImagesLimit = 5;
    //pc.ownImages.uri.push("img/sm-1.jpg");

    // Address form
    pc.af = {};
    pc.districtArr = ["A"];
    pc.af.district = pc.districtArr[0];
    pc.taluqaArr = ["A", "B"];
    pc.af.taluqa = pc.taluqaArr[0];
    pc.townArr = ["A", "B", "C"];
    pc.af.town = pc.townArr[0];

    pc.dp = {};
    pc.dp.uri = "img/sm-2.png";
    pc.dp.base64;
    pc.modalImgsArr = [];
    pc.dataOf = sConfig.dataOf.pinfo;

    // Function section
    var initHeightArr = initHeightArr;
    var getImages = getImages;
    pc.showImagesModal = showImagesModal;
    pc.hideImagesModal = hideImagesModal;
    pc.showPInfoForm = showPInfoForm;
    pc.showPhotoForm = showPhotoForm;
    pc.showFamilyForm = showFamilyForm;
    pc.showOccupationForm = showOccupationForm;
    pc.showAddressForm = showAddressForm;
    pc.showOwnPhotoForm = showOwnPhotoForm;
    pc.showHomePhotoForm = showHomePhotoForm;
    pc.clickImage = clickImage;
    pc.changeDP = changeDP;
    pc.uploadHomeImages = uploadHomeImages;
    pc.uploadOwnImages = uploadOwnImages;
    pc.setModalImgs = setModalImgs;
    pc.largeImg = largeImg;
    pc.removeImg = removeImg;
    pc.addImgs = addImgs;
    pc.uploadData = uploadData;

    pc.ownImages.uri.push('img/sm-1.jpg');
    pc.ownImages.uri.push('img/sm-2.png');
    pc.ownImages.uri.push('img/a.jpg');
    pc.ownImages.uri.push('img/c.jpg');
    pc.ownImages.uri.push('img/b.jpg');

    $scope.aImages = [{
      'src': 'img/sm-1.jpg',
      'msg': 'swipe/tap'
    }, {
      'src': 'img/sm-2.png',
      'msg': ''
    }, {
      'src': 'img/sm-1.jpg',
      'msg': ''
    }, {
      'src': 'img/a.jpg',
      'msg': ''
    }, {
      'src': 'img/b.jpg',
      'msg': ''
    }, {
      'src': 'img/c.jpg',
      'msg': ''
    }];

    $ionicModal.fromTemplateUrl('app/profiles/images-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      pc.imagesModal = modal;
    });

    function showImagesModal(index) {
      $ionicSlideBoxDelegate.slide(index);
      pc.imagesModal.show();
    }

    function hideImagesModal() {
      pc.imagesModal.hide();
    }

    // Cleanup the modal when we're done with it!
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      console.log('Modal is hidden!');
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    function showPInfoForm() {
      pc.dataOf = sConfig.dataOf.pinfo;
      pc.isPInfoForm = true;
      pc.isPhotoForm = false;
      pc.isFamilyForm = false;
      pc.isOccupationForm = false;
      pc.isAddressForm = false;
    }

    function showPhotoForm() {
      pc.isPhotoForm = true;
      pc.isPInfoForm = false;
      pc.isFamilyForm = false;
      pc.isOccupationForm = false;
      pc.isAddressForm = false;
    }

    function showFamilyForm() {
      pc.dataOf = sConfig.dataOf.family;
      pc.isFamilyForm = true;
      pc.isPhotoForm = false;
      pc.isPInfoForm = false;
      pc.isOccupationForm = false;
      pc.isAddressForm = false;
    }

    function showOccupationForm() {
      pc.dataOf = sConfig.dataOf.occupation;
      pc.isOccupationForm = true;
      pc.isFamilyForm = false;
      pc.isPhotoForm = false;
      pc.isPInfoForm = false;
      pc.isAddressForm = false;
    }

    function showAddressForm() {
      pc.dataOf = sConfig.dataOf.address;
      pc.isAddressForm = true;
      pc.isOccupationForm = false;
      pc.isFamilyForm = false;
      pc.isPhotoForm = false;
      pc.isPInfoForm = false;
    }

    function showOwnPhotoForm() {
      pc.dataOf = sConfig.dataOf.pown;
      pc.isOwnPhotoForm = true;
      pc.isHomePhotoForm = false;
    }

    function showHomePhotoForm() {
      pc.dataOf = sConfig.dataOf.phome;
      pc.isOwnPhotoForm = false;
      pc.isHomePhotoForm = true;
    }

    function changeDP(srcType) {
      try {
        logger.debug("changeDP function");
        var promise = getImages(srcType);

        promise.then(function(imageData) {
          logger.debug("imageData: " + JSON.stringify(imageData));
          /*for (var i = 0; i < imageData.uri.length; i++) {
            pc.ownImages.uri.push(imageData.uri[i])
          }*/
          pc.dp.uri = imageData.uri;
          pc.dp.base64 = imageData.base64;
        });

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
            promise = getImages(srcType, pc.ownImagesLimit - pc.ownImages.uri.length);
            promise.then(function(imageData) {
              logger.debug("imageData: " + JSON.stringify(imageData));
              for (var i = 0; i < imageData.uri.length; i++) {
                pc.ownImages.uri.push(imageData.uri[i]);
              }

            });
            break;
          case sConfig.picType.home:
            promise = getImages(srcType, pc.homeImagesLimit - pc.homeImages.uri.length);
            promise.then(function(imageData) {
              logger.debug("imageData: " + JSON.stringify(imageData));
              for (var i = 0; i < imageData.uri.length; i++) {
                pc.homeImages.uri.push(imageData.uri[i]);
              }
            });
            break;
        }
        var promise = getImages(srcType, 5 - pc.homeImages.uri.length);


      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function uploadHomeImages(srcType) {
      try {
        logger.debug("uploadHomeImages function");
        var promise = getImages(srcType, 5 - pc.homeImages.uri.length);

        promise.then(function(imageData) {
          logger.debug("imageData: " + JSON.stringify(imageData));
          for (var i = 0; i < imageData.uri.length; i++) {
            pc.homeImages.uri.push(imageData.uri[i])
          }
        });
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function uploadOwnImages(srcType) {
      try {
        logger.debug("uploadOwnImages function");
        var promise = getImages(srcType, 5 - pc.ownImages.uri.length);

        promise.then(function(imageData) {
          logger.debug("imageData: " + JSON.stringify(imageData));
          for (var i = 0; i < imageData.uri.length; i++) {
            pc.ownImages.uri.push(imageData.uri[i])
          }
        });
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function removeImg(type, img) {
      try {
        logger.debug("removeImg function");
        switch (type) {
          case sConfig.picType.own:
            pc.ownImages.uri.splice(pc.ownImages.uri.indexOf(img), 1);
            break;
          case sConfig.picType.home:
            pc.homeImages.uri.splice(pc.homeImages.uri.indexOf(img), 1);
            break;
        }
        pc.ownImages.uri.splice(pc.ownImages.uri.indexOf(img), 1);
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

    /* Captures images. Calls clickImage function of cameraService to capture images */
    function clickImage() {
      logger.debug("clickImage() function");

      var promise = cameraService.clickImage();

      promise.then(function(imageData) {
        pc.imgs.imgURIs.push(imageData.uri);
        pc.imgs.imgBase64s.push(imageData.base64);
      });
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
        }
        pc.showImagesModal(index);
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function uploadData() {
      try {
        logger.debug("uploadData function");
        logger.debug("pc.dataOf: " + pc.dataOf);

        switch (pc.dataOf) {
          case sConfig.dataOf.pinfo:
            logger.debug("pif: " + JSON.stringify(pc.pif));
            break;
          case sConfig.dataOf.address:
            logger.debug("pif: " + JSON.stringify(pc.af));
            break;
          case sConfig.dataOf.pown:

            break;
          case sConfig.dataOf.phome:

            break;
          case sConfig.dataOf.occupation:
            logger.debug("pif: " + JSON.stringify(pc.of));
            break;
          case sConfig.dataOf.family:
            logger.debug("pif: " + JSON.stringify(pc.ff));
            break;
          default:

        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function initHeightArr() {
      logger.debug("initHeightArr function");
      for (var i = 4; i < 10; i++) {
        for (var j = 0; j < 12; j++) {
          if (j === 0) {
            pc.heightArr.push(i + " ft ");
            continue;
          }
          pc.heightArr.push(i + " ft " + j + " in");
        }
      }
      pc.pif.height = pc.heightArr[0];
    }
    initHeightArr();

    logger.debug("ProfilesCtrl end");
  }
})();
