(function() {
  angular.module('starter').controller('EProfileCtrl', EProfileCtrl);

  EProfileCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'profileService'];

  function EProfileCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams, profileService) {
    var logger = utilService.getLogger();
    logger.debug("EProfileCtrl start");

    // Variables section
    var epc = this;
    // Personal info form
    epc.pif = {};
    epc.genderArr = ["Male", "Female"];
    epc.pif.gender = epc.genderArr[0];
    epc.heightArr = [];
    epc.pif.height;
    epc.bodyTypeArr = ["Slim", "Average", "Athletic", "Heavy"];
    epc.pif.bodyType = epc.bodyTypeArr[0];
    epc.martitalStatusArr = ["Never married", "Widower", "Divorced", "Awaiting divorce"];
    epc.pif.martitalStatus = epc.martitalStatusArr[0];
    epc.complexionArr = ["Very fair", "Fair", "Wheatish", "Wheatish brown", "Dark"];
    epc.pif.complexion = epc.complexionArr[0];
    epc.physicalStatusArr = ["Normal", "Physically challenged"];
    epc.pif.physicalStatus = epc.physicalStatusArr[0];
    epc.eatingHabitArr = ["Vegetarian", "Non-vegetarian", "Eggetarian"];
    epc.pif.eatingHabit = epc.eatingHabitArr[0];
    epc.drinkingHabitArr = ["No", "Yes", "Occasionally"];
    epc.pif.drinkingHabit = epc.drinkingHabitArr[0];
    epc.smokingHabitArr = ["No", "Yes", "Occasionally"];
    epc.pif.smokingHabit = epc.smokingHabitArr[0];
    epc.subCasteArr = ["Swetamber", "Digamber", "Pancham"];
    epc.pif.subCaste = epc.subCasteArr[0];
    epc.pif.dob = new Date();
    epc.pif.tob = new Date();
    epc.zodiacArr = ["Aries", "Leo", "Sagittarius", "Taurus", "Virgo", "Capricorn", "Gemini", "Libra", "Aquarius", "Cancer", "Scorpio", "Pisces"];
    epc.pif.zodiac = epc.zodiacArr[0];

    // Form hide/show
    epc.isPInfoForm = true;
    epc.isPhotoForm = false;
    epc.isFamilyForm = false;
    epc.isOccupationForm = false;
    epc.isAddressForm = false;
    // Image upload
    epc.isOwnPhotoForm = true;
    epc.isHomePhotoForm = false;

    // Occupation form
    epc.of = {};
    epc.hEducationArr = ["Bellow 10th", "10th", "12th", "BA", "BSc", "BCom", "Diploma", "BE", "BTech", "ME", "MTech", "Ded", "Bed", "MCA", "BCA", "MA", "MSc", "Other"];
    epc.of.hEducation = epc.hEducationArr[0];
    epc.of.oHEducation;
    epc.occupationArr = ["Job", "Farm", "Business"];
    epc.of.occupation = epc.occupationArr[0];

    // Family form
    epc.ff = {};
    epc.familyTypeArr = ["Joint family", "Nuclear family"];
    epc.ff.familyType = epc.familyTypeArr[0];
    epc.familyValuesArr = ["Traditional", "Moderate"];
    epc.ff.familyValues = epc.familyValuesArr[0];
    epc.familyStatusArr = ["Middle class", "Upper middle class"];
    epc.ff.familyStatus = epc.familyStatusArr[0];

    // Photo form
    epc.pf = {};
    epc.imgs = {};
    epc.imgs.imgURIs = [];
    epc.imgs.imgBase64s = [];
    epc.ownImages = {};
    epc.ownImages.uri = [];
    epc.ownImages.base64 = [];
    epc.ownImages.index = 0;
    epc.homeImages = {};
    epc.homeImages.uri = [];
    epc.homeImages.base64 = [];
    epc.homeImages.index = 0;
    epc.homeImagesLimit = 5;
    epc.ownImagesLimit = 5;
    epc.disableImgsUploadBtn = true;
    //epc.ownImages.uri.push("img/sm-1.jpg");

    // Address form
    epc.af = {};
    epc.districtArr = ["A"];
    epc.af.district = epc.districtArr[0];
    epc.taluqaArr = ["A", "B"];
    epc.af.taluqa = epc.taluqaArr[0];
    epc.townArr = ["A", "B", "C"];
    epc.af.town = epc.townArr[0];

    // Profiles preference
    epc.ppf = {};
    epc.ageArr = [];
    epc.ppf.minAge;
    epc.ppf.maxAge;
    epc.ppf.minHeight;
    epc.ppf.maxHeight;
    epc.ppf.complexion;
    epc.ppf.bodyType;
    epc.ppf.subCaste;

    // Filter profiles
    epc.pff = {};
    epc.pff.minAge;
    epc.pff.maxAge;
    epc.pff.minHeight;
    epc.pff.maxHeight;
    epc.pff.complexion;
    epc.pff.bodyType;
    epc.pff.subCaste;

    epc.dp = {};
    epc.dp.uri = "img/no-avatar.png";
    epc.dp.base64;
    epc.modalImgsArr = [];
    epc.dataOf = sConfig.dataOf.pinfo;
    epc.noImg = "img/noimg.gif"
    epc.shortlited = false;
    epc.interested = false;

    // Function section
    var initHeightArr = initHeightArr;
    var getImages = getImages;
    var bootstrap = bootstrap;
    var setProfilesP = setProfilesP;
    var setEProfile = setEProfile;
    var setFProfiles = setFProfiles;
    var ownBase64 = ownBase64;
    var homeBase64 = homeBase64;
    epc.showImagesModal = showImagesModal;
    epc.hideImagesModal = hideImagesModal;
    epc.showPInfoForm = showPInfoForm;
    epc.showPhotoForm = showPhotoForm;
    epc.showFamilyForm = showFamilyForm;
    epc.showOccupationForm = showOccupationForm;
    epc.showAddressForm = showAddressForm;
    epc.showOwnPhotoForm = showOwnPhotoForm;
    epc.showHomePhotoForm = showHomePhotoForm;
    epc.clickImage = clickImage;
    epc.changeDP = changeDP;
    epc.uploadHomeImages = uploadHomeImages;
    epc.uploadOwnImages = uploadOwnImages;
    epc.setModalImgs = setModalImgs;
    epc.largeImg = largeImg;
    epc.removeImg = removeImg;
    epc.addImgs = addImgs;
    epc.uploadData = uploadData;
    epc.showProfileFModal = showProfileFModal;
    epc.hideProfileFModal = hideProfileFModal;
    //epc.updatePInfo = updatePInfo;

    epc.ownImages.uri.push('img/sm-1.jpg');
    epc.ownImages.uri.push('img/sm-2.png');

    $ionicModal.fromTemplateUrl('app/profiles/images-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      epc.imagesModal = modal;
    });

    function showImagesModal(index) {
      logger.debug("showImagesModal function");
      $ionicSlideBoxDelegate.slide(index);
      epc.imagesModal.show();
    }

    function hideImagesModal() {
      logger.debug("hideImagesModal function");
      epc.imagesModal.hide();
    }

    $ionicModal.fromTemplateUrl('app/profiles/profile-filter-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      epc.profileFModal = modal;
    });

    function showProfileFModal() {
      logger.debug("showProfileFModal function");
      setFProfiles();
      epc.profileFModal.show();
    }

    function hideProfileFModal() {
      logger.debug("hideProfileFModal function");
      epc.profileFModal.hide();
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

    function showPInfoForm() {
      try {
        logger.debug("showPInfoForm function");

        epc.dataOf = sConfig.dataOf.pinfo;
        epc.isPInfoForm = true;
        epc.isPhotoForm = false;
        epc.isFamilyForm = false;
        epc.isOccupationForm = false;
        epc.isAddressForm = false;
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function showPhotoForm() {
      try {
        logger.debug("showPhotoForm function");

        epc.isPhotoForm = true;
        epc.isPInfoForm = false;
        epc.isFamilyForm = false;
        epc.isOccupationForm = false;
        epc.isAddressForm = false;
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function showFamilyForm() {
      try {
        logger.debug("showFamilyForm function");

        epc.dataOf = sConfig.dataOf.family;
        epc.isFamilyForm = true;
        epc.isPhotoForm = false;
        epc.isPInfoForm = false;
        epc.isOccupationForm = false;
        epc.isAddressForm = false;
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function showOccupationForm() {
      try {
        logger.debug("showOccupationForm function");

        epc.dataOf = sConfig.dataOf.occupation;
        epc.isOccupationForm = true;
        epc.isFamilyForm = false;
        epc.isPhotoForm = false;
        epc.isPInfoForm = false;
        epc.isAddressForm = false;
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function showAddressForm() {
      try {
        logger.debug("showAddressForm function");

        epc.dataOf = sConfig.dataOf.address;
        epc.isAddressForm = true;
        epc.isOccupationForm = false;
        epc.isFamilyForm = false;
        epc.isPhotoForm = false;
        epc.isPInfoForm = false;
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function showOwnPhotoForm() {
      try {
        logger.debug("showOwnPhotoForm function");

        epc.dataOf = sConfig.dataOf.pown;
        epc.isOwnPhotoForm = true;
        epc.isHomePhotoForm = false;
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function showHomePhotoForm() {
      try {
        logger.debug("showHomePhotoForm function");

        epc.dataOf = sConfig.dataOf.phome;
        epc.isOwnPhotoForm = false;
        epc.isHomePhotoForm = true;
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function changeDP(srcType) {
      try {
        logger.debug("changeDP function");
        var promise = getImages(srcType);

        promise.then(function(imageData) {
          logger.debug("imageData: " + JSON.stringify(imageData));
          /*for (var i = 0; i < imageData.uri.length; i++) {
            epc.ownImages.uri.push(imageData.uri[i])
          }*/
          epc.dp.uri = imageData.uri;
          epc.dp.base64 = imageData.base64;
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
            promise = getImages(srcType, epc.ownImagesLimit - epc.ownImages.uri.length);
            promise.then(function(imageData) {
              logger.debug("imageData: " + JSON.stringify(imageData));
              for (var i = 0, len = imageData.uri.length; i < len; i++) {
                epc.ownImages.uri.push(imageData.uri[i]);
              }
              ownBase64(imageData.uri, 0);
            });
            break;
          case sConfig.picType.home:
            promise = getImages(srcType, epc.homeImagesLimit - epc.homeImages.uri.length);
            promise.then(function(imageData) {
              logger.debug("imageData: " + JSON.stringify(imageData));
              for (var i = 0, len = imageData.uri.length; i < len; i++) {
                epc.homeImages.uri.push(imageData.uri[i]);
              }
              homeBase64(imageData.uri, 0);
            });
            break;
          case sConfig.picType.dp:
            promise = getImages(srcType, 1);
            promise.then(function(imageData) {
              logger.debug("imageData: " + JSON.stringify(imageData));
              epc.dp.uri = imageData.uri[0];
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
        var promise = getImages(srcType, 5 - epc.homeImages.uri.length);

        promise.then(function(imageData) {
          logger.debug("imageData: " + JSON.stringify(imageData));
          for (var i = 0, len = imageData.uri.length; i < len; i++) {
            epc.homeImages.uri.push(imageData.uri[i])
          }
        });
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function uploadOwnImages(srcType) {
      try {
        logger.debug("uploadOwnImages function");
        var promise = getImages(srcType, 5 - epc.ownImages.uri.length);

        promise.then(function(imageData) {
          logger.debug("imageData: " + JSON.stringify(imageData));
          for (var i = 0, len = imageData.uri.length; i < len; i++) {
            epc.ownImages.uri.push(imageData.uri[i])
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
            epc.ownImages.uri.splice(epc.ownImages.uri.indexOf(img), 1);
            break;
          case sConfig.picType.home:
            epc.homeImages.uri.splice(epc.homeImages.uri.indexOf(img), 1);
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
        epc.imgs.imgURIs.push(imageData.uri);
        epc.imgs.imgBase64s.push(imageData.base64);
      });
    }

    function setModalImgs(imgs) {
      try {
        logger.debug("setModalImgs function");
        epc.modalImgsArr = imgs;
        epc.showImagesModal();
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
            epc.modalImgsArr = epc.ownImages.uri;
            index = epc.ownImages.uri.indexOf(img);
            break;
          case sConfig.picType.home:
            epc.modalImgsArr = epc.homeImages.uri;
            index = epc.homeImages.uri.indexOf(img);
            break;
          case sConfig.picType.dp:
            epc.modalImgsArr[0] = epc.dp.uri;
            break;
          case sConfig.picType.pp:
            epc.modalImgsArr[0] = 'img/sm-2.png';
            break;
        }
        epc.showImagesModal(index);
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function uploadData() {
      try {
        logger.debug("uploadData function");
        logger.debug("epc.dataOf: " + epc.dataOf);

        var promise;
        var req = {
          data: {}
        };

        req.data._id = lsService.get("userId");

        switch (epc.dataOf) {
          case sConfig.dataOf.pinfo:
            //logger.debug("pif: " + JSON.stringify(epc.pif));
            req.data.pinfo = epc.pif;
            promise = profileService.updatePInfo(req);
            break;
          case sConfig.dataOf.address:
            //logger.debug("pif: " + JSON.stringify(epc.af));
            req.data.location = epc.af;
            promise = profileService.updateLocation(req);
            break;
          case sConfig.dataOf.pown:
            break;
          case sConfig.dataOf.phome:

            break;
          case sConfig.dataOf.occupation:
            //logger.debug("pif: " + JSON.stringify(epc.of));
            req.data.professional = epc.of;
            promise = profileService.updateProfessional(req);
            break;
          case sConfig.dataOf.family:
            //logger.debug("pif: " + JSON.stringify(epc.ff));
            req.data.family = epc.ff;
            promise = profileService.updateFamily(req);
            break;
        }

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

    function ownBase64(imgURIs, index) {
      try {
        logger.debug("ownBase64 function");

        var lArr;

        if(imgURIs != null && imgURIs != undefined)
          lArr = imgURIs;

        var len = lArr.length;
        if (index == null || index == undefined)
          index = 0;
        if (len == index)
          return;

        utilService.base64(lArr[index])
          .then(function(sucResp) {
            logger.debug("sucResp: " + sucResp);
            epc.ownImages.base64[index] = sucResp;
            index++;
            ownBase64(null, index);
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

        var lArr;

        if(imgURIs != null && imgURIs != undefined)
          lArr = imgURIs;

        var len = lArr.length;
        if (index == null || index == undefined)
          index = 0;
        if (len == index)
          return;

        utilService.base64(lArr[index])
          .then(function(sucResp) {
            logger.debug("sucResp: " + sucResp);
            epc.homeImages.base64[index] = sucResp;

            index++;
            homeBase64(null, index);
          }, function(errResp) {
            logger.error("errResp: " + JSON.stringify(errResp));
          });
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function setFProfiles() {
      try {
        logger.debug("setFProfiles function");

        if (epc.ageArr.length == 0)
          initAgeArr();

        if (epc.heightArr.indexOf("Any") == -1) {
          epc.heightArr.splice(0, 0, "Any");
          epc.complexionArr.splice(0, 0, "Any");
          epc.bodyTypeArr.splice(0, 0, "Any");
          epc.subCasteArr.splice(0, 0, "Any");
        }

        epc.pff.minAge = epc.ageArr[0];
        epc.pff.maxAge = epc.ageArr[0];;
        epc.pff.minHeight = epc.heightArr[0];
        epc.pff.maxHeight = epc.heightArr[0];
        epc.pff.complexion = epc.complexionArr[0];
        epc.pff.bodyType = epc.bodyTypeArr[0];
        epc.pff.subCaste = epc.subCasteArr[0];
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function initAgeArr() {
      try {
        logger.debug("initAgeArr function");

        epc.ageArr.push("Any");
        for (var i = 18; i <= 40; i++) {
          epc.ageArr.push(i);
        }

        epc.ppf.minAge = epc.ageArr[0];
        epc.ppf.maxAge = epc.ageArr[0];
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    // initAgeArr();

    function initHeightArr() {
      try {
        logger.debug("initHeightArr function");

        for (var i = 4; i < 7; i++) {
          for (var j = 0; j < 12; j++) {
            if (j === 0) {
              epc.heightArr.push(i + " ft ");
              continue;
            }
            epc.heightArr.push(i + " ft " + j + " in");
          }
        }
        epc.pif.height = epc.heightArr[0];
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    // initHeightArr();

    function setEProfile() {
      try {
        logger.debug("setEProfile function");
        if (epc.heightArr == 0)
          initHeightArr();
        epc.pif.height = epc.heightArr[0];
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function setProfilesP() {
      try {
        logger.debug("setProfilesP function");

        if (epc.heightArr == 0)
          initHeightArr();

        epc.ageArr.push("Any");
        for (var i = 18; i <= 40; i++) {
          epc.ageArr.push(i);
        }

        if (epc.heightArr.indexOf("Any") == -1) {
          epc.heightArr.splice(0, 0, "Any");
          epc.complexionArr.splice(0, 0, "Any");
          epc.bodyTypeArr.splice(0, 0, "Any");
          epc.subCasteArr.splice(0, 0, "Any");
        }

        epc.ppf.minAge = epc.ageArr[0];
        epc.ppf.maxAge = epc.ageArr[0];;
        epc.ppf.minHeight = epc.heightArr[0];
        epc.ppf.maxHeight = epc.heightArr[0];
        epc.ppf.complexion = epc.complexionArr[0];
        epc.ppf.bodyType = epc.bodyTypeArr[0];
        epc.ppf.subCaste = epc.subCasteArr[0];
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

    logger.debug("EProfileCtrl end");
  }
})();
