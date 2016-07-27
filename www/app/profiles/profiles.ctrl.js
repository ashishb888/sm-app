(function() {
  angular.module('starter').controller('ProfilesCtrl', ProfilesCtrl);

  ProfilesCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams'];

  function ProfilesCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams) {
    var logger = utilService.getLogger();
    logger.debug("ProfilesCtrl start");

    // Variables section
    var pc = this;
    // Personal info form
    pc.pif = {};
    pc.genderArr = ["Male", "Female"];
    pc.pif.gender = pc.genderArr[0];
    pc.heightArr = [];
    pc.pif.height;
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
    pc.hEducationArr = ["Bellow 10th", "10th", "12th", "BA", "BSc", "BCom", "Diploma", "BE", "BTech", "ME", "MTech", "Ded", "Bed", "MCA", "BCA", "MA", "MSc", "Other"];
    pc.of.hEducation = pc.hEducationArr[0];
    pc.of.oHEducation;
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

    // Profiles preference
    pc.ppf = {};
    pc.ageArr = [];
    pc.ppf.minAge;
    pc.ppf.maxAge;
    pc.ppf.minHeight;
    pc.ppf.maxHeight;
    pc.ppf.complexion;
    pc.ppf.bodyType;
    pc.ppf.subCaste;

    pc.dp = {};
    pc.dp.uri = "img/no-profile.jpg";
    pc.dp.base64;
    pc.modalImgsArr = [];
    pc.dataOf = sConfig.dataOf.pinfo;
    pc.noImg = "img/noimg.gif"

    // Function section
    var initHeightArr = initHeightArr;
    var getImages = getImages;
    var bootstrap = bootstrap;
    var setProfilesP = setProfilesP;
    var setEProfile = setEProfile;
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
    pc.showProfileFModal = showProfileFModal;
    pc.hideProfileFModal = hideProfileFModal;

    pc.ownImages.uri.push('img/sm-1.jpg');
    pc.ownImages.uri.push('img/sm-2.png');
    pc.ownImages.uri.push('img/a.jpg');
    pc.ownImages.uri.push('img/c.jpg');
    pc.ownImages.uri.push('img/b.jpg');

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

    $ionicModal.fromTemplateUrl('app/profiles/profile-filter-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      pc.profileFModal = modal;
    });

    function showProfileFModal() {
      logger.debug("showProfileFModal function");
      pc.profileFModal.show();
    }

    function hideProfileFModal() {
      logger.debug("hideProfileFModal function");
      pc.profileFModal.hide();
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
              for (var i = 0, len = imageData.uri.length; i < len; i++) {
                pc.ownImages.uri.push(imageData.uri[i]);
              }
            });
            break;
          case sConfig.picType.home:
            promise = getImages(srcType, pc.homeImagesLimit - pc.homeImages.uri.length);
            promise.then(function(imageData) {
              logger.debug("imageData: " + JSON.stringify(imageData));
              for (var i = 0, len = imageData.uri.length; i < len; i++) {
                pc.homeImages.uri.push(imageData.uri[i]);
              }
            });
            break;
          case sConfig.picType.dp:
            promise = getImages(srcType, 1);
            promise.then(function(imageData) {
              logger.debug("imageData: " + JSON.stringify(imageData));
              pc.dp.uri = imageData.uri[0];
            });
            break;
        }
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
          for (var i = 0, len = imageData.uri.length; i < len; i++) {
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
          for (var i = 0, len = imageData.uri.length; i < len; i++) {
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
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function initAgeArr() {
      try {
        logger.debug("initAgeArr function");

        pc.ageArr.push("any");
        for (var i = 18; i <= 40; i++) {
          pc.ageArr.push(i);
        }

        pc.ppf.minAge = pc.ageArr[0];
        pc.ppf.maxAge = pc.ageArr[0];
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    // initAgeArr();

    function initHeightArr() {
      try {
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
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    // initHeightArr();

    function setEProfile() {
      try {
        logger.debug("setEProfile function");
        if (pc.heightArr == 0)
          initHeightArr();
        pc.pif.height = pc.heightArr[0];
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function setProfilesP() {
      try {
        logger.debug("setProfilesP function");

        if (pc.heightArr == 0)
          initHeightArr();

        pc.ageArr.push("Any");
        for (var i = 18; i <= 40; i++) {
          pc.ageArr.push(i);
        }

        pc.heightArr.splice(0, 0, "Any");
        pc.complexionArr.splice(0, 0, "Any");
        pc.bodyTypeArr.splice(0, 0, "Any");
        pc.subCasteArr.splice(0, 0, "Any");

        pc.ppf.minAge = pc.ageArr[0];
        pc.ppf.maxAge = pc.ageArr[0];;
        pc.ppf.minHeight = pc.heightArr[0];
        pc.ppf.maxHeight = pc.heightArr[0];
        pc.ppf.complexion = pc.complexionArr[0];
        pc.ppf.bodyType = pc.bodyTypeArr[0];
        pc.ppf.subCaste = pc.subCasteArr[0];
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function bootstrap() {
      try {
        logger.debug("bootstrap function")

        switch ($stateParams.functionNm) {
          case "setProfilesP":
            setProfilesP();
            break;
          case "setEProfile":
            setEProfile();
            break;
          default:
            setEProfile();
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("ProfilesCtrl end");
  }
})();
