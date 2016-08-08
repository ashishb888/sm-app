(function() {
  angular.module('starter').controller('EditProfileCtrl', EditProfileCtrl);

  EditProfileCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'pinfoService', 'editProfileService', 'profileService'];

  function EditProfileCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams, pinfoService, editProfileService, profileService) {
    var logger = utilService.getLogger();
    logger.debug("EditProfileCtrl start");

    // Variables section
    var epc = this;

    // Entire profile
    epc.profile;

    // Personal info form
    epc.bdf = {};
    epc.genderArr = ["Male", "Female"];
    // epc.bdf.gender = epc.genderArr[0];
    epc.bdf.gender;
    epc.heightArr = [];
    epc.bdf.height;
    epc.bodyTypeArr = ["Slim", "Average", "Athletic", "Heavy"];
    // epc.bdf.bodyType = epc.bodyTypeArr[0];
    epc.bdf.bodyType;
    epc.martitalStatusArr = ["Never married", "Widower", "Divorced", "Awaiting divorce"];
    //epc.bdf.martitalStatus = epc.martitalStatusArr[0];
    epc.complexionArr = ["Very fair", "Fair", "Wheatish", "Wheatish brown", "Dark"];
    // epc.bdf.complexion = epc.complexionArr[0];
    epc.bdf.complexion;
    epc.physicalStatusArr = ["Normal", "Physically challenged"];
    //epc.bdf.physicalStatus = epc.physicalStatusArr[0];
    epc.eatingHabitArr = ["Vegetarian", "Non-vegetarian", "Eggetarian"];
    //epc.bdf.eatingHabit = epc.eatingHabitArr[0];
    epc.drinkingHabitArr = ["No", "Yes", "Occasionally"];
    //epc.bdf.drinkingHabit = epc.drinkingHabitArr[0];
    epc.smokingHabitArr = ["No", "Yes", "Occasionally"];
    //epc.bdf.smokingHabit = epc.smokingHabitArr[0];
    epc.bdf.dob;

    //Religious info
    epc.rif = {};
    epc.rif.tob;
    epc.subCasteArr = ["Swetamber", "Digamber", "Pancham"];
    epc.rif.subCaste;
    epc.zodiacArr = ["Aries", "Leo", "Sagittarius", "Taurus", "Virgo", "Capricorn", "Gemini", "Libra", "Aquarius", "Cancer", "Scorpio", "Pisces"];
    epc.rif.zodiac;

    // Professional info
    epc.pif = {};
    epc.hEducationArr = ["Bellow 10th", "10th", "12th", "BA", "BSc", "BCom", "Diploma", "BE", "BTech", "ME", "MTech", "Ded", "Bed", "MCA", "BCA", "MA", "MSc", "Other"];
    epc.pif.hEducation;
    epc.pif.oHEducation;
    epc.occupationArr = ["Job", "Farm", "Business"];
    epc.pif.occupation;

    // Location form
    epc.lif = {};
    epc.districtArr = ["A"];
    epc.lif.district;
    epc.taluqaArr = ["A", "B"];
    epc.lif.taluqa;
    epc.townArr = ["A", "B", "C"];
    epc.lif.town;

    // Family form
    epc.fif = {};
    epc.familyTypeArr = ["Joint family", "Nuclear family"];
    epc.fif.familyType;
    epc.familyValuesArr = ["Traditional", "Moderate"];
    epc.fif.familyValues;
    epc.familyStatusArr = ["Middle class", "Upper middle class"];
    epc.fif.familyStatus;

    // Images upload
    epc.ownImgs = [];
    epc.ownImages = {};
    epc.ownImages.uri = [];
    epc.ownImages.base64 = [];
    epc.ownImages.index = 0;
    epc.homeImgs = [];
    epc.homeImages = {};
    epc.homeImages.uri = [];
    epc.homeImages.base64 = [];
    epc.homeImages.index = 0;
    epc.homeImagesLimit = 5;
    epc.ownImagesLimit = 5;
    epc.disableImgsUploadBtn = true;
    epc.isOwnImgs = true;
    epc.imgTitle;
    epc.pp;
    epc.noavatar = "./img/no-avatar.png";

    // Function section
    var initHeightArr = initHeightArr;
    var bootstrap = bootstrap;
    epc.viewProfile = viewProfile;

    epc.updateBasicDetails = updateBasicDetails;
    epc.getBasicDetails = getBasicDetails;
    epc.showBasicDetailsModal = showBasicDetailsModal;
    epc.hideBasicDetailsModal = hideBasicDetailsModal;

    epc.updateReligiousInfo = updateReligiousInfo;
    epc.getReligiousInfo = getReligiousInfo;
    epc.showReligiousModal = showReligiousModal;
    epc.hideReligiousModal = hideReligiousModal;

    epc.updateProfessionInfo = updateProfessionInfo;
    epc.getProfessionInfo = getProfessionInfo;
    epc.showProfessionModal = showProfessionModal;
    epc.hideProfessionModal = hideProfessionModal;

    epc.updateLocationInfo = updateLocationInfo;
    epc.getLocationInfo = getLocationInfo;
    epc.showLocationModal = showLocationModal;
    epc.hideLocationModal = hideLocationModal;

    epc.updateFamilyInfo = updateFamilyInfo;
    epc.getFamilyInfo = getFamilyInfo;
    epc.showFamilyModal = showFamilyModal;
    epc.hideFamilyModal = hideFamilyModal;


    epc.showOwnImgsModal = showOwnImgsModal;
    epc.hideOwnImgsModal = hideOwnImgsModal;
    epc.showHomeImgsModal = showHomeImgsModal;
    epc.hideUploadImgsModal = hideUploadImgsModal;

    // Images get/post
    var getImages = getImages;
    var ownBase64 = ownBase64;
    var homeBase64 = homeBase64;
    epc.showImagesModal = showImagesModal;
    epc.hideImagesModal = hideImagesModal;
    epc.updateOwnImgs = updateOwnImgs;
    epc.updateHomeImgs = updateHomeImgs;
    epc.getOwnImgs = getOwnImgs;
    epc.getHomeImgs = getHomeImgs;
    epc.largeImg = largeImg;
    epc.addImgs = addImgs;

    // Functions definations
    function getHomeImgs() {
      try {
        logger.debug("getHomeImgs function");

        var promise = editProfileService.getImgs(sConfig.picType.home, lsService.get("_id"));

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            epc.homeImgs = resp.data.images;

            if (!epc.pp){
              if (epc.homeImgs && epc.homeImgs.length >= 1)
                epc.pp = epc.homeImgs[0].base64;
            }
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    $ionicModal.fromTemplateUrl('app/editprofile/images-modal.html', {
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
      //epc.imagesModal.remove();
    }

    $scope.$on('modal.hidden', function() {
      logger.debug('Modal is hidden!');
    });

    $scope.$on('modal.removed', function() {
      logger.debug('Modal is removed!');
    });

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      epc.imagesModal.remove();
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

        for (var i = 0, len = epc.homeImgs.length; i < len; i++) {
          if (epc.homeImgs[i]._id == "local") {
            req.data.base64.push(epc.homeImgs[i].base64);
          }
        }
        if (!req.data.base64 || req.data.base64.length === 0) {
          utilService.toastMessage("Nothing to upload.", null, sConfig.msgs.success);
          return;
        }
        //req.data.base64 = epc.ownImages.base64;
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

        for (var i = 0, len = epc.ownImgs.length; i < len; i++) {
          if (epc.ownImgs[i]._id == "local") {
            req.data.base64.push(epc.ownImgs[i].base64);
          }
        }
        if (!req.data.base64 || req.data.base64.length === 0) {
          utilService.toastMessage("Nothing to upload.", null, sConfig.msgs.success);
          return;
        }
        //req.data.base64 = epc.ownImages.base64;
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

        var promise = editProfileService.getImgs(sConfig.picType.own, lsService.get("_id"));

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            epc.ownImgs = resp.data.images;

            if (epc.ownImgs && epc.ownImgs.length >= 1)
              epc.pp = epc.ownImgs[0].base64;
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
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
            promise = getImages(srcType, epc.ownImagesLimit - epc.ownImgs.length);
            promise.then(function(imageData) {
              // logger.debug("imageData: " + JSON.stringify(imageData));
              /*for (var i = 0, len = imageData.uri.length; i < len; i++) {
                epc.ownImgsUri.push(imageData.uri[i]);
              }*/
              ownBase64(imageData.uri, 0);
            });
            break;
          case sConfig.picType.home:
            promise = getImages(srcType, epc.homeImagesLimit - epc.homeImgs.length);
            promise.then(function(imageData) {
              // logger.debug("imageData: " + JSON.stringify(imageData));
              /*for (var i = 0, len = imageData.uri.length; i < len; i++) {
                epc.homeImages.uri.push(imageData.uri[i]);
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
                  epc.dp = {
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

    function removeImg(type, id, index) {
      try {
        logger.debug("removeImg function");

        var promise;

        switch (type) {
          case sConfig.picType.own:
            if (id === "local") {
              epc.ownImgs.splice(index, 1);
              return;
            }
            promise = imagesService.removeImg(id);

            break;
          case sConfig.picType.home:
            if (id === "local") {
              epc.homeImgs.splice(index, 1);
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
              epc.homeImgs.splice(index, 1);
              return;
            }
            epc.ownImgs.splice(index, 1);
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
        epc.modalImgsArr = imgs;
        epc.showImagesModal();
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function largeImg(type, index) {
      try {
        logger.debug("largeImg function");

        if (!index)
          index = 0;

        switch (type) {
          case sConfig.picType.own:
            epc.modalImgsArr = epc.ownImgs;
            break;
          case sConfig.picType.home:
            epc.modalImgsArr = epc.homeImgs;
            break;
          case sConfig.picType.dp:
            epc.modalImgsArr[0] = {
              base64: epc.dp.base64
            };
            break;
          case sConfig.picType.pp:
            epc.modalImgsArr = epc.ownImgs.concat(epc.homeImgs);
            break;
        }
        epc.showImagesModal(index);
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
            //epc.ownImages.base64[index] = sucResp;
            epc.ownImgs.push({
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
            //epc.homeImages.base64[index] = sucResp;
            epc.homeImgs.push({
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

    function getFamilyInfo() {
      try {
        logger.debug("getFamilyInfo function");

        var promise = editProfileService.getFamilyInfo(lsService.get("_id"));

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            if (resp.data.familyInfo) {
              epc.fif = resp.data.familyInfo;
            }
            //utilService.appAlert(resp.messages, null, sConfig.msgs.success);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function updateFamilyInfo() {
      try {
        logger.debug("updateFamilyInfo function")

        var req = {
          data: {
            _id: lsService.get("_id")
          }
        };

        req.data.familyInfo = epc.fif;
        var promise = editProfileService.updateFamilyInfo(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }

            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
            epc.hideFamilyModal();
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function getLocationInfo() {
      try {
        logger.debug("getLocationInfo function");

        var promise = editProfileService.getLocationInfo(lsService.get("_id"));

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }
            if (resp.data.locationInfo) {
              epc.lif = resp.data.locationInfo;
            }
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function updateLocationInfo() {
      try {
        logger.debug("updateLocationInfo function");

        var req = {
          data: {
            _id: lsService.get("_id")
          }
        };

        req.data.locationInfo = epc.lif;
        var promise = editProfileService.updateLocationInfo(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }

            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
            epc.hideLocationModal();
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function getProfessionInfo() {
      try {
        logger.debug("getProfessionInfo function");

        var promise = editProfileService.getProfessionInfo(lsService.get("_id"));

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }
            if (resp.data.profession) {
              epc.pif = resp.data.profession;
            }
            //utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function updateProfessionInfo() {
      try {
        logger.debug("updateProfessionInfo function");

        var req = {
          data: {
            _id: lsService.get("_id")
          }
        };

        req.data.professionInfo = epc.pif;
        var promise = editProfileService.updateProfessionInfo(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }

            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
            epc.hideProfessionModal();
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
        var promise = profileService.getProfile(lsService.get("_id"));
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            var bDetails = resp.data.profile.basicDetails;
            if (bDetails) {
              epc.bdf.fullName = bDetails.fullName;
              epc.bdf.gender = bDetails.gender;

              if (bDetails.dob && bDetails.height && bDetails.weight) {
                var dob = bDetails.dob;
                var tob = bDetails.tob;

                delete bDetails.dob;
                delete bDetails.tob;

                epc.bdf = bDetails;
                epc.bdf.dob = new Date(dob);
                epc.bdf.height = epc.bdf.height.feet + " ft " + epc.bdf.height.inches + " in";
              }
            }

            var rInfo = resp.data.profile.religiousInfo;
            if (rInfo) {
              var tob = rInfo.tob;

              delete rInfo.tob;

              epc.rif = rInfo;
              //epc.rif.tob = new Date(tob);
            }

            if (resp.data.profile.professionInfo)
              epc.pif = resp.data.profile.professionInfo;

            if (resp.data.profile.locationInfo)
              epc.lif = resp.data.profile.locationInfo;

            if (resp.data.profile.familyInfo)
              epc.fif = resp.data.profile.familyInfo;

            if (epc.heightArr == 0) {
              initHeightArr();
              // epc.bdf.height = epc.heightArr[0];
            }

            // Get images
            epc.getOwnImgs();
            epc.getHomeImgs();
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    $ionicModal.fromTemplateUrl('app/editprofile/images-upload-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      epc.uploadImgsModal = modal;
    });

    function showHomeImgsModal() {
      logger.debug("showHomeImgsModal function");
      epc.isOwnImgs = false;
      epc.imgTitle = "Home images";
      epc.uploadImgsModal.show();
    }

    function hideUploadImgsModal() {
      logger.debug("hideUploadImgsModal function");
      epc.uploadImgsModal.hide();
    }

    $ionicModal.fromTemplateUrl('app/editprofile/own-images-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      epc.ownImgsModal = modal;
    });

    function showOwnImgsModal() {
      logger.debug("showOwnImgsModal function");
      epc.imgTitle = "Personal images";
      epc.isOwnImgs = true;
      epc.uploadImgsModal.show();
      //epc.ownImgsModal.show();
    }

    function hideOwnImgsModal() {
      logger.debug("hideOwnImgsModal function");
      epc.ownImgsModal.hide();
    }

    $ionicModal.fromTemplateUrl('app/editprofile/family-modal.html', {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      epc.familyModal = modal;
    });

    function showFamilyModal() {
      logger.debug("showFamilyModal function");
      epc.familyModal.show();
    }

    function hideFamilyModal() {
      logger.debug("hideFamilyModal function");
      epc.familyModal.hide();
    }

    $ionicModal.fromTemplateUrl('app/editprofile/location-modal.html', {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      epc.locationModal = modal;
    });

    function showLocationModal() {
      logger.debug("showLocationModal function");
      epc.locationModal.show();
    }

    function hideLocationModal() {
      logger.debug("hideLocationModal function");
      epc.locationModal.hide();
    }

    $ionicModal.fromTemplateUrl('app/editprofile/religious-modal.html', {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      epc.religiousModal = modal;
    });

    function showReligiousModal() {
      logger.debug("showReligiousModal function");
      epc.religiousModal.show();
    }

    function hideReligiousModal() {
      logger.debug("hideReligiousModal function");
      epc.religiousModal.hide();
    }

    $ionicModal.fromTemplateUrl('app/editprofile/basicdetails-modal.html', {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      epc.basicDetailsModal = modal;
    });

    function showBasicDetailsModal() {
      logger.debug("showBasicDetailsModal function");
      epc.basicDetailsModal.show();
    }

    function hideBasicDetailsModal() {
      logger.debug("hideBasicDetailsModal function");
      epc.basicDetailsModal.hide();
    }

    $ionicModal.fromTemplateUrl('app/editprofile/profession-modal.html', {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }).then(function(modal) {
      epc.professionModal = modal;
    });

    function showProfessionModal() {
      logger.debug("showProfessionModal function");
      epc.professionModal.show();
    }

    function hideProfessionModal() {
      logger.debug("hideProfessionModal function");
      epc.professionModal.hide();
    }

    $scope.$on('modal.removed', function() {
      // Execute action
    });

    function updateReligiousInfo() {
      try {
        logger.debug("updateReligiousInfo function");
        var req = {
          data: {
            _id: lsService.get("_id")
          }
        };

        epc.rif.tob = new Date(epc.rif.tob);
        req.data.religiousInfo = epc.rif;
        var promise = editProfileService.updateReligiousInfo(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }

            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
            epc.hideReligiousModal();
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function getReligiousInfo() {
      try {
        logger.debug("getReligiousInfo function");

        var promise = editProfileService.getReligiousInfo(lsService.get("_id"));

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }
            if (resp.data.religiousInfo) {
              epc.rif = resp.data.religiousInfo;
            }
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function getBasicDetails() {
      try {
        logger.debug("getBasicDetails function");

        var promise = editProfileService.getBasicDetails(lsService.get("_id"));

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }
            if (resp.data.basicDetails) {
              var dob = resp.data.basicDetails.dob;
              var tob = resp.data.basicDetails.tob;

              delete resp.data.basicDetails.dob;
              delete resp.data.basicDetails.tob;

              epc.bdf = resp.data.basicDetails;
              epc.bdf.dob = new Date(dob);
              epc.bdf.tob = new Date(tob);
              epc.bdf.height = epc.bdf.height.feet + " ft " + epc.bdf.height.inches + " in";
            }
            //utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function updateBasicDetails() {
      try {
        logger.debug("updateBasicDetails function");
        var req = {
          data: {
            _id: lsService.get("_id")
          }
        };
        var lHeight = epc.bdf.height;
        var heightSplit = lHeight.split(" ");
        epc.bdf.height = {
          feet: parseInt(heightSplit[0]),
          inches: 0
        };
        if (heightSplit.length > 2) {
          console.log("IF");
          epc.bdf.height.inches = parseInt(heightSplit[2]);
        }

        epc.bdf.dob = new Date(epc.bdf.dob);
        req.data.basicDetails = epc.bdf;
        var promise = editProfileService.updateBasicDetails(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }
            epc.bdf.height = lHeight;
            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
            epc.hideBasicDetailsModal();
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function initHeightArr() {
      try {
        logger.debug("initHeightArr function");

        for (var i = 4; i < 7; i++) {
          for (var j = 0; j < 12; j++) {
            if (j === 0) {
              epc.heightArr.push(i + " ft");
              continue;
            }
            epc.heightArr.push(i + " ft " + j + " in");
          }
        }
        epc.bdf.height = epc.heightArr[0];
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
        epc.bdf.height = epc.heightArr[0];
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }


    function bootstrap() {
      try {
        logger.debug("bootstrap function")

        switch ($stateParams.functionNm) {
          case "getBasicDetails":
            epc.getBasicDetails();
            break;
          case "getReligiousInfo":
            epc.getReligiousInfo();
            break;
          case "viewProfile":
            epc.viewProfile();
            break;
          default:
            epc.viewProfile();
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("EditProfileCtrl end");
  }
})();
