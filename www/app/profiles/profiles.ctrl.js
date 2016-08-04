(function() {
  angular.module('starter').controller('ProfilesCtrl', ProfilesCtrl);

  ProfilesCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'profileService', '$ionicHistory'];

  function ProfilesCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams, profileService, $ionicHistory) {
    var logger = utilService.getLogger();
    logger.debug("ProfilesCtrl start");

    // Variables section
    var pc = this;
    // Personal info form
    pc.pif = {};
    pc.heightArr = [];
    pc.pif.height;
    pc.bodyTypeArr = ["Slim", "Average", "Athletic", "Heavy"];
    pc.martitalStatusArr = ["Never married", "Widower", "Divorced", "Awaiting divorce"];
    pc.complexionArr = ["Very fair", "Fair", "Wheatish", "Wheatish brown", "Dark"];
    pc.physicalStatusArr = ["Normal", "Physically challenged"];
    pc.subCasteArr = ["Swetamber", "Digamber", "Pancham"];
    pc.zodiacArr = ["Aries", "Leo", "Sagittarius", "Taurus", "Virgo", "Capricorn", "Gemini", "Libra", "Aquarius", "Cancer", "Scorpio", "Pisces"];

    // Occupation form
    pc.hEducationArr = ["Bellow 10th", "10th", "12th", "BA", "BSc", "BCom", "Diploma", "BE", "BTech", "ME", "MTech", "Ded", "Bed", "MCA", "BCA", "MA", "MSc", "Other"];
    pc.occupationArr = ["Job", "Farm", "Business"];

    // Filter profiles
    pc.ageArr = [];
    pc.pff = {};
    pc.pff.minAge;
    pc.pff.maxAge;
    pc.pff.minHeight;
    pc.pff.maxHeight;
    pc.pff.complexion;
    pc.pff.bodyType;
    pc.pff.subCaste;

    // Get profiles
    pc.profiles = [];
    pc.modalImgsArr = [];

    // Search by id
    pc.searchId;

    //Maintain states
    pc.isSlProfiles = false;
    pc.isRequests = false;
    pc.isProfiles = false;

    // Shortlist a profiles
    pc.isShortlist = false;
    pc.isInterest = false;
    pc.shortlistBtn = "Shortlist";
    pc.interestBtn = "Show interest";

    // Function section
    var bootstrap = bootstrap;
    var initHeightArr = initHeightArr;
    var setFProfiles = setFProfiles;
    pc.showProfileFModal = showProfileFModal;
    pc.hideProfileFModal = hideProfileFModal;
    pc.showProfileModal = showProfileModal;
    pc.hideProfileModal = hideProfileModal;
    pc.getProfiles = getProfiles;
    /*pc.viewProfile = viewProfile;*/
    pc.viewProfile = viewProfile;
    pc.showImagesModal = showImagesModal;
    pc.hideImagesModal = hideImagesModal;
    pc.largeImg = largeImg;
    pc.searchProfile = searchProfile;
    pc.shortlist = shortlist;
    pc.unShortlist = unShortlist;
    pc.interest = interest;
    pc.disinterest = disinterest;
    pc.getShortlist = getShortlist;
    pc.getRequests = getRequests;

    // Functions definations
    function getRequests() {
      try {
        logger.debug("getRequests function");
          //logger.debug("state: " + $ionicHistory.currentStateName());
        pc.isSlProfiles = true;
        var promise = profileService.getRequests(lsService.get("_id"));
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            pc.profiles = resp.data.profiles;
            pc.isRequests = true;
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function getShortlist() {
      try {
        logger.debug("getShortlist function")
          //logger.debug("state: " + $ionicHistory.currentStateName());
        pc.isSlProfiles = true;
        var promise = profileService.getShortlist(lsService.get("_id"));
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            pc.profiles = resp.data.profiles;
            //utilService.appAlert(resp.messages, sConfig.appStates.signin, sConfig.msgs.success);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function disinterest(req) {
      try {
        logger.debug("disinterest function");

        var promise = profileService.disinterest(req);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            // Add a toast here
            pc.isInterest = false;
            pc.interestBtn = "Show interest";
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function interest(id) {
      try {
        logger.debug("interest function");

        var req = {
          data: {
            _id: lsService.get("_id"),
            id: id
          }
        };

        if (pc.isInterest == true) {
          pc.disinterest(req);
          return;
        }

        var promise = profileService.interest(req);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            // Add a toast here
            pc.isInterest = true;
            pc.interestBtn = "Interest shown";
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function unShortlist(req) {
      try {
        logger.debug("unShortlist function");

        if (typeof req !== "object") {
          req = {
            data: {
              _id: lsService.get("_id"),
              id: req
            }
          };
        }

        var promise = profileService.unShortlist(req);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            // Add a toast here
            pc.isShortlist = false;
            pc.shortlistBtn = "Shortlist";
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function shortlist(id) {
      try {
        logger.debug("shortlist function");

        var req = {
          data: {
            _id: lsService.get("_id"),
            id: id
          }
        };

        if (pc.isShortlist == true) {
          pc.unShortlist(req);
          return;
        }

        var promise = profileService.shortlist(req);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            // Add a toast here
            pc.isShortlist = true;
            pc.shortlistBtn = "Shortlisted";
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function searchProfile(id) {
      try {
        logger.debug("searchProfile function");
        var promise = profileService.searchProfile(id);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            pc.profile = resp.data.profile;
            pc.showProfileModal();
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function viewProfile(id) {
      try {
        logger.debug("viewProfile function");
        var promise = profileService.getProfile(id);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            pc.profile = resp.data.profile;
            pc.showProfileModal();
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function getProfiles() {
      try {
        logger.debug("getProfiles function")

        var promise = profileService.getProfiles(lsService.get("_id"));
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            pc.profiles = resp.data.profiles;
            pc.isProfiles = true;
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

    $ionicModal.fromTemplateUrl('app/profiles/profile-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      pc.profileModal = modal;
    });

    function showProfileModal() {
      logger.debug("showProfileModal function");
      pc.profileModal.show();
    }

    function hideProfileModal() {
      logger.debug("hideProfileModal function");
      pc.profileModal.hide();
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

    $scope.$on('modal.hidden', function() {
      logger.debug('Modal is hidden!');
    });

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

    function initAgeArr() {
      try {
        logger.debug("initAgeArr function");

        pc.ageArr.push("Any");
        for (var i = 18; i <= 40; i++) {
          pc.ageArr.push(i);
        }

        pc.pff.minAge = pc.ageArr[0];
        pc.pff.maxAge = pc.ageArr[0];
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
              pc.heightArr.push(i + " ft");
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
          case "setFProfiles":
            setFProfiles();
            break;
          case "getShortlist":
            pc.getShortlist();
            break;
          case "getRequests":
            pc.getRequests();
            break;
          default:
            pc.getProfiles();
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("ProfilesCtrl end");
  }
})();
