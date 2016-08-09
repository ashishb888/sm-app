(function() {
  angular.module('starter').controller('ProfilesCtrl', ProfilesCtrl);

  ProfilesCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'profileService', '$ionicHistory', 'hwBackBtnService'];

  function ProfilesCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams, profileService, $ionicHistory, hwBackBtnService) {
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

    var cIndex;

    pc.noavatar = "./img/no-avatar.png";

    // Get profiles
    pc.profiles = [];
    pc.modalImgsArr = [];

    // Search by id
    pc.searchId;

    // View profile
    pc.pp;
    pc.ppImgs = [];

    //Maintain states
    pc.isRequestsOut = false;
    pc.isRequestsOut = false;
    pc.isRequestsIn = false;
    pc.isProfiles = false;

    // Shortlist a profiles
    pc.isShortlist = false;
    pc.isInterest = false;
    pc.sId;
    pc.shortlistBtn = "Shortlist";
    pc.interestBtn = "Show interest";

    // Edit profile
    //pc.isEditProfile = false;

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
    pc.getRequestsIn = getRequestsIn;
    pc.getRequestsOut = getRequestsOut;
    pc.removeFromShortlist = removeFromShortlist;
    pc.removeFromInterest = removeFromInterest;
    pc.editProfile = editProfile;

    // Functions definations
    function editProfile() {
      try {
        logger.debug("editProfile function");

        pc.isEditProfile = true;
        pc.viewProfile(lsService.get("_id"));
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function removeFromInterest(id, index) {
      try {
        logger.debug("removeFromInterest function");

        var req = {
          data: {
            _id: lsService.get("_id"),
            id: id
          }
        };

        var promise = profileService.disinterest(req);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
            if (!index)
              index = cIndex;
            pc.profiles.splice(index, 1);
            pc.profileModal.hide();
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function getRequestsOut() {
      try {
        logger.debug("getRequestsOut function");
        //logger.debug("state: " + $ionicHistory.currentStateName());
        pc.isRequestsOut = true;
        var promise = profileService.getRequestsOut(lsService.get("_id"));
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

    function getRequestsIn() {
      try {
        logger.debug("getRequestsIn function");
        //logger.debug("state: " + $ionicHistory.currentStateName());
        pc.isRequestsIn = true;
        var promise = profileService.getRequestsIn(lsService.get("_id"));
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
            pc.isInterest = false;
            pc.interestBtn = "Show interest";
            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
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

        if (pc.isShortlist == true) {
          utilService.toastMessage("You can choose either Shortlist or Show interest");
          return;
        }

        if (pc.isSlProfiles == true) {
          req.data.isSlProfiles = true;
        }

        var promise = profileService.interest(req);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            pc.isInterest = true;
            pc.interestBtn = "Interest shown";
            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function removeFromShortlist(id, index) {
      try {
        logger.debug("removeFromShortlist function");
        var req = {
          data: {
            _id: lsService.get("_id"),
            id: id
          }
        };
        var promise = profileService.unShortlist(req);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
            if (!index)
              index = cIndex;
            pc.profiles.splice(index, 1);
            pc.profileModal.hide();
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
            pc.isShortlist = false;
            pc.shortlistBtn = "Shortlist";
            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function shortlist(id, index) {
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

        if (pc.isInterest == true) {
          utilService.toastMessage("You can choose either Shortlist or Show interest");
          return;
        }

        var promise = profileService.shortlist(req);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }
            pc.sId = id;
            pc.sIndex = index;
            pc.isShortlist = true;
            pc.shortlistBtn = "Shortlisted";
            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
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


        /*var promise = profileService.searchProfile(id);
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
        }, function(errResp) {});*/


        var promise = profileService.searchProfile(id);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            pc.profile = resp.data.profile;
            pc.pp = pc.profile.dp;
            var bDetails = pc.profile.basicDetails;

            if (bDetails) {
              if (bDetails.dob) {
                var dob = bDetails.dob;
                delete bDetails.dob;
                bDetails.dob = new Date(dob);
              }
              pc.bdf = bDetails;
            }

            var rInfo = pc.profile.religiousInfo;
            if (rInfo) {
              var tob = rInfo.tob;
              delete rInfo.tob;

              pc.rif = rInfo;
              pc.rif.tob = new Date(tob);
            }

            if (pc.profile.professionInfo)
              pc.pif = pc.profile.professionInfo;

            if (pc.profile.locationInfo)
              pc.lif = pc.profile.locationInfo;

            if (pc.profile.familyInfo)
              pc.fif = pc.profile.familyInfo;

            var imgsPromise = profileService.getImgsById(pc.profile._id);
            imgsPromise.then(function(sucResp) {
              try {
                var resp = sucResp.data;
                if (resp.status !== sConfig.httpStatus.SUCCESS) {
                  utilService.appAlert(resp.messages);
                  return;
                }

                pc.ppImgs = resp.data.images;
                pc.ppImgs.splice(0, 0, {
                  base64: pc.pp
                });
              } catch (exception) {
                logger.error("exception: " + exception);
              }
            }, function(errResp) {});
            pc.showProfileModal();
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function viewProfile(id, index) {
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

            cIndex = index;
            pc.profile = resp.data.profile;
            pc.pp = pc.profile.dp;
            var bDetails = pc.profile.basicDetails;

            if (bDetails) {
              if (bDetails.dob) {
                var dob = bDetails.dob;
                delete bDetails.dob;
                bDetails.dob = new Date(dob);
              }
              pc.bdf = bDetails;
            }

            var rInfo = pc.profile.religiousInfo;
            if (rInfo) {
              var tob = rInfo.tob;
              delete rInfo.tob;

              pc.rif = rInfo;
              pc.rif.tob = new Date(tob);
            }

            if (pc.profile.professionInfo)
              pc.pif = pc.profile.professionInfo;

            if (pc.profile.locationInfo)
              pc.lif = pc.profile.locationInfo;

            if (pc.profile.familyInfo)
              pc.fif = pc.profile.familyInfo;

            var imgsPromise = profileService.getImgsById(id);
            imgsPromise.then(function(sucResp) {
              try {
                var resp = sucResp.data;
                if (resp.status !== sConfig.httpStatus.SUCCESS) {
                  utilService.appAlert(resp.messages);
                  return;
                }

                pc.ppImgs = resp.data.images;
                pc.ppImgs.splice(0, 0, {
                  base64: pc.pp
                });
                /*if (!pc.pp){
                  if (pc.ppImgs && pc.ppImgs.length > 0) {
                    pc.pp = pc.ppImgs[0].base64;
                  }
                }*/

              } catch (exception) {
                logger.error("exception: " + exception);
              }
            }, function(errResp) {});
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

        hwBackBtnService.enableHWBackBtn();
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

      if (pc.isShortlist === true) {
        pc.profiles.splice(cIndex, 1);
      }

      if (pc.isInterest === true) {
        pc.profiles.splice(cIndex, 1);
      }

      pc.isInterest = false;
      pc.isShortlist = false;
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
            pc.modalImgsArr = pc.ppImgs;
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
          case "getRequestsOut":
            pc.getRequestsOut();
            break;
          case "editProfile":
            pc.editProfile();
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
