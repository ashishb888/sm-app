(function() {
  angular.module('starter').controller('ProfilesCtrl', ProfilesCtrl);

  ProfilesCtrl.$inject = ['starterConfig', 'utilService', '$state',
    '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope',
    '$ionicModal', 'cameraService', '$stateParams', 'profileService',
    '$ionicHistory', 'hwBackBtnService', '$ionicActionSheet',
    '$ionicSideMenuDelegate', '$ionicTabsDelegate'
  ];

  function ProfilesCtrl(sConfig, utilService, $state, $ionicPopup, lsService,
    $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams,
    profileService, $ionicHistory, hwBackBtnService, $ionicActionSheet,
    $ionicSideMenuDelegate, $ionicTabsDelegate) {
    var logger = utilService.getLogger();
    logger.debug("ProfilesCtrl start");

    // Variables section
    var pc = this;
    // Personal info form
    pc.pif = {};
    pc.heightArr = [];
    pc.pif.height;

    pc.bodyType = JSON.parse(lsService.get("bodyTypes"));
    pc.bodyTypeAny = JSON.parse(lsService.get("bodyTypesAny"));
    pc.complexionAny = JSON.parse(lsService.get("complexionAny"));
    pc.subCasteAny = JSON.parse(lsService.get("subCasteAny"));
    pc.ageAny = JSON.parse(lsService.get("ageAny"));
    pc.heightAny = JSON.parse(lsService.get("heightAny"));

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
    pc.requestsTitle = "Sent";

    // Shortlist a profiles
    pc.isShortlist = false;
    pc.isInterest = false;
    pc.sId;
    pc.shortlistBtn = "Shortlist";
    pc.interestBtn = "Show interest";

    // Search by userId
    pc.isSearchByUserId = false;

    pc.isCompleted = true;

    // Pagination
    pc.page = 0;
    pc.hasMore = true;
    pc.tabsIndex = 0;

    // Function section
    var bootstrap = bootstrap;
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
    pc.pullRefresher = pullRefresher;
    pc.filterProfiles = filterProfiles;
    pc.requestsActionSheet = requestsActionSheet;

    pc.accept = accept;
    pc.reject = reject;
    pc.getAccepted = getAccepted;
    pc.getRejected = getRejected;
    pc.getVisitors = getVisitors;

    // Pagination
    pc.getPaginateProfiles = getPaginateProfiles;
    pc.selectTab = selectTab;
    pc.triggerFunction = triggerFunction;
    var setFlags = setFlags;
    pc.inbox = inbox;
    pc.outbox = outbox;

    // Functions definations
    function setFlags() {
      pc.isFProfiles = false;
      pc.isSlProfiles = false;
      pc.isRequestsIn = false;
      pc.isRequestsOut = false;
      pc.isProfiles = false;
      pc.isVisitors = false;
    }

    function outbox(index, isTabAgain, isScroll) {
      try {
        logger.debug("outbox function");

        if (isTabAgain && pc.tabsIndex == index) {
          return;
        }

        if (!index && index != 0)
          index = pc.tabsIndex;

        if (!isScroll) {
          pc.page = 0;
          pc.profiles = [];
        }

        $ionicTabsDelegate.select(index);
        setFlags();

        switch (index) {
          case 0:
            pc.getRequestsOut();
            break;
          case 1:
            pc.getAccepted("acceptedOf");
            break;
          case 2:
            pc.getRejected("rejectedOf");
            break;
        }

        pc.tabsIndex = index;
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function inbox(index, isTabAgain, isScroll) {
      try {
        logger.debug("inbox function");

        if (isTabAgain && pc.tabsIndex == index) {
          return;
        }

        if (!index && index != 0)
          index = pc.tabsIndex;

        if (!isScroll) {
          pc.page = 0;
          pc.profiles = [];
        }

        $ionicTabsDelegate.select(index);
        setFlags();

        switch (index) {
          case 0:
            pc.getRequestsIn();
            break;
          case 1:
            pc.getAccepted("acceptedBy");
            break;
          case 2:
            pc.getRejected("rejectedBy");
            break;
        }

        pc.tabsIndex = index;
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function triggerFunction(index, isTabAgain, isScroll) {
      try {
        logger.debug("triggerFunction function");

        if (isTabAgain && pc.tabsIndex == index) {
          return;
        }

        if (!index && index != 0)
          index = pc.tabsIndex;

        if (!isScroll) {
          pc.page = 0;
          pc.profiles = [];
        } else {
          if (pc.isFProfiles) {
            pc.filterProfiles(true);
            return;
          }
        }

        $ionicTabsDelegate.select(index);
        setFlags();

        switch (index) {
          case 0:
            pc.getPaginateProfiles();
            break;
          case 1:
            pc.getShortlist();
            break;
          case 2:
            pc.getVisitors();
            break;

            /*case 1:
              pc.getRequestsOut();
              break;
            case 2:
              pc.getRequestsIn();
              break;
            case 3:
              pc.getAccepted("acceptedBy");
              break;
            case 4:
              pc.getRejected("rejectedBy");
              break;
            case 5:
              pc.getAccepted("acceptedOf");
              break;
            case 6:
              pc.getRejected("rejectedOf");
              break;*/
        }

        pc.tabsIndex = index;
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function selectTab(index) {
      pc.page = 0;
      $ionicTabsDelegate.select(index);
    }

    function getPaginateProfiles() {
      try {
        logger.debug("getPaginateProfiles function")

        var promise = profileService.getPaginateProfiles(++pc.page);
        promise.then(function(sucResp) {
            try {
              var resp = sucResp.data;
              if (resp.status !== sConfig.httpStatus.SUCCESS) {
                utilService.toastMessage(resp.messages);
                pc.isCompleted = false;
                return;
              }

              pc.hasMore = true;

              if (!resp.data.hasMore) {
                pc.hasMore = false;
                utilService.toastMessage(resp.messages);
              }

              logger.debug("pc.hasMore: " + pc.hasMore);
              pc.profiles = pc.profiles.concat(resp.data.profiles);
              pc.isProfiles = true;
              $scope.$broadcast('scroll.infiniteScrollComplete');
            } catch (exception) {
              logger.error("exception: " + exception);
            }
          }, function(errResp) {})
          .finally(function() {
            // $scope.$broadcast('scroll.infiniteScrollComplete');
          });
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function getVisitors() {
      try {
        logger.debug("getVisitors() function");

        var promise = profileService.getVisitors(++pc.page);

        promise.then(function(sucResp) {
            try {
              var resp = sucResp.data;
              if (resp.status !== sConfig.httpStatus.SUCCESS) {
                utilService.toastMessage(resp.messages);
                return;
              }

              pc.hasMore = true;

              if (!resp.data.hasMore) {
                pc.hasMore = false;
                utilService.toastMessage(resp.messages);
              }

              //pc.profiles = resp.data.profiles;
              pc.isVisitors = true;
              pc.profiles = pc.profiles.concat(resp.data.profiles);
              $scope.$broadcast('scroll.infiniteScrollComplete');
            } catch (exception) {
              logger.error("exception: " + exception);
            }
          }, function(errResp) {})
          .finally(function() {
            // $scope.$broadcast('scroll.infiniteScrollComplete');
          });
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function getRejected(type) {
      try {
        logger.debug("getRejected() function");

        var promise = profileService.getRejected(type, ++pc.page);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }

            /*pc.isRequestsIn = false;
            pc.isRequestsOut = false;
            pc.profiles = resp.data.profiles;*/
            if (!resp.data.hasMore) {
              pc.hasMore = false;
              utilService.toastMessage(resp.messages);
            }

            pc.profiles = pc.profiles.concat(resp.data.profiles);
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function getAccepted(type) {
      try {
        logger.debug("getAccepted() function");

        var promise = profileService.getAccepted(type, ++pc.page);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }

            /*pc.isRequestsIn = false;
            pc.isRequestsOut = false;
            pc.profiles = resp.data.profiles;*/
            pc.hasMore = true;

            if (!resp.data.hasMore) {
              pc.hasMore = false;
              utilService.toastMessage(resp.messages);
            }

            pc.profiles = pc.profiles.concat(resp.data.profiles);
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function reject(id) {
      try {
        logger.debug("reject() function");

        var req = {
          data: {
            id: id
          }
        };
        var promise = profileService.reject(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }

            pc.profiles.splice(cIndex, 1);
            pc.profileModal.hide();
            utilService.toastMessage(resp.messages);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function accept(id) {
      try {
        logger.debug("accept() function");

        var req = {
          data: {
            id: id
          }
        };
        var promise = profileService.accept(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }

            pc.profiles.splice(cIndex, 1);
            pc.profileModal.hide();
            utilService.toastMessage(resp.messages);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function requestsActionSheet() {
      logger.debug("requestsActionSheet function");

      var hideRequestsActionSheet = $ionicActionSheet.show({
        titleText: "Requests",
        buttons: [{
          text: "<i class='txt-color icon ion-forward'></i> Sent"
        }, {
          text: "<i class='txt-color icon ion-reply'></i> Received"
        }, {
          text: "<i class='txt-color icon ion-checkmark-circled'></i> Accepted by"
        }, {
          text: "<i class='txt-color icon ion-close-circled'></i> Rejected by"
        }, {
          text: "<i class='txt-color icon ion-checkmark-circled'></i> Accepted"
        }, {
          text: "<i class='txt-color icon ion-close-circled'></i> Rejected"
        }, {
          text: "<i class='txt-color icon ion-close-circled'></i> Cancel"
        }],
        /*cancelText: 'Cancel',*/
        cancel: function() {
          logger.debug("Cancelled");
        },
        buttonClicked: function(index) {
          logger.debug("Button clicked", index);

          switch (index) {
            case 0:
              pc.getRequestsOut();
              pc.requestsTitle = "Sent";
              break;
            case 1:
              pc.requestsTitle = "Received";
              pc.getRequestsIn();
              break;
            case 2:
              pc.requestsTitle = "Accepted by";
              pc.getAccepted("acceptedBy");
              break;
            case 3:
              pc.requestsTitle = "Rejected by";
              pc.getRejected("rejectedBy");
              break;
            case 4:
              pc.requestsTitle = "Accepted";
              pc.getAccepted("acceptedOf");
              break;
            case 5:
              pc.requestsTitle = "Rejected";
              pc.getRejected("rejectedOf");
              break;
            case 6:
              hideRequestsActionSheet();
              break;
          }
          return true;
        }
      });
    }

    function filterProfiles(isScroll) {
      try {
        logger.debug("filterProfiles() function");

        if (!isScroll) {
          pc.profiles = [];
          pc.page = 0;
        }

        setFlags();
        $ionicTabsDelegate.select(0);

        var req = {
          data: pc.pff,
          page: ++pc.page
        };
        var promise = profileService.filterProfiles(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }

            pc.hasMore = true;

            if (!resp.data.hasMore) {
              pc.hasMore = false;
              utilService.toastMessage(resp.messages);
            }

            pc.profiles = pc.profiles.concat(resp.data.profiles);
            pc.isFProfiles = true;
            pc.profileFModal.hide();
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    /* Function will refresh the screen on screen pull event*/
    function pullRefresher() {
      try {
        logger.debug("pullRefresher() function");
        // pc.getProfiles();
        /*pc.page = 0;
        pc.profiles = [];
        pc.getPaginateProfiles(false);*/
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

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
        var promise = profileService.getRequestsOut(++pc.page);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            pc.hasMore = true;

            if (!resp.data.hasMore) {
              pc.hasMore = false;
              utilService.toastMessage(resp.messages);
            }

            pc.isRequests = true;
            pc.profiles = pc.profiles.concat(resp.data.profiles);
            $scope.$broadcast('scroll.infiniteScrollComplete');
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
        pc.isRequestsOut = false;
        var promise = profileService.getRequestsIn(++pc.page);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            pc.hasMore = true;

            if (!resp.data.hasMore) {
              pc.hasMore = false;
              utilService.toastMessage(resp.messages);
            }

            pc.isRequests = true;
            pc.profiles = pc.profiles.concat(resp.data.profiles);
            $scope.$broadcast('scroll.infiniteScrollComplete');
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
        var promise = profileService.getShortlist(++pc.page);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            pc.hasMore = true;

            if (!resp.data.hasMore) {
              pc.hasMore = false;
              utilService.toastMessage(resp.messages);
            }

            pc.isSlProfiles = true;
            pc.profiles = pc.profiles.concat(resp.data.profiles);
            $scope.$broadcast('scroll.infiniteScrollComplete');
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
          utilService.toastMessage(
            "You can choose either Shortlist or Show interest");
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
          utilService.toastMessage(
            "You can choose either Shortlist or Show interest");
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

            /*if (bDetails) {
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
            }*/

            if (bDetails) {
              pc.bdf = bDetails;
              if (bDetails.dob) {
                pc.bdf.dobLocal = moment(bDetails.dob.toString())._d;
              }
            }

            var rInfo = pc.profile.religiousInfo;
            /*if (rInfo)
              pc.rif = rInfo;*/
            if (rInfo) {
              pc.rif = rInfo;
              var timeSplit = pc.rif.tob.split(":");
              pc.rif.tob = new Date();
              pc.rif.tob.setHours(timeSplit[0])
              pc.rif.tob.setMinutes(timeSplit[1])
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
            pc.isSearchByUserId = true;
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
              utilService.toastMessage(resp.messages);
              return;
            }

            cIndex = index;
            pc.profile = resp.data.profile;
            pc.pp = pc.profile.dp;
            var bDetails = pc.profile.basicDetails;

            if (bDetails) {
              /*if (bDetails.dob) {
                var dob = bDetails.dob;
                delete bDetails.dob;
                bDetails.dob = new Date(dob);
              }*/
              pc.bdf = bDetails;
              if (bDetails.dob) {
                // var dobArr = bDetails.dob.split("-");
                pc.bdf.dobLocal = moment(bDetails.dob.toString())._d;
                // pc.bdf.dobLocal = new Date(dobArr[0], dobArr[1] - 1, dobArr[2]);
              }
            }

            var rInfo = pc.profile.religiousInfo;
            if (rInfo) {
              pc.rif = rInfo;
              var timeSplit = pc.rif.tob.split(":");
              pc.rif.tob = new Date();
              pc.rif.tob.setHours(timeSplit[0])
              pc.rif.tob.setMinutes(timeSplit[1])
            }

            if (pc.profile.professionInfo)
              pc.pif = pc.profile.professionInfo;

            if (pc.profile.locationInfo)
              pc.lif = pc.profile.locationInfo;

            if (pc.profile.familyInfo)
              pc.fif = pc.profile.familyInfo;

            if (pc.profile.profilePreference)
              pc.ppf = pc.profile.profilePreference;

            var imgsPromise = profileService.getImgsById(id);
            imgsPromise.then(function(sucResp) {
              try {
                var resp = sucResp.data;
                if (resp.status !== sConfig.httpStatus.SUCCESS) {
                  utilService.toastMessage(resp.messages);
                  return;
                }

                pc.ppImgs = resp.data.images;
                pc.ppImgs.splice(0, 0, {
                  base64: pc.pp
                });
                /*if (!pc.pp){
                  // if (pc.ppImgs && pc.ppImgs.length > 0) {
                    pc.pp = pc.ppImgs[0].base64;
                  }
                }*/

                //  pc.isFProfiles = false;
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
                utilService.toastMessage(resp.messages);
                pc.isCompleted = false;
                return;
              }

              pc.profiles = resp.data.profiles;
              pc.isProfiles = true;
              pc.isFProfiles = false;
            } catch (exception) {
              logger.error("exception: " + exception);
            }
          }, function(errResp) {})
          .finally(function() {
            $scope.$broadcast("scroll.refreshComplete");
          });

        // hwBackBtnService.enableHWBackBtn();
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    $ionicModal.fromTemplateUrl('app/profiles/images-modal.html', {
      scope: $scope,
      animation: sConfig.modal.animation
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
      animation: sConfig.modal.animation
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
        if (pc.isSearchByUserId === true)
        // pc.getProfiles();
          pc.getPaginateProfiles();
      }

      if (pc.isInterest === true) {
        pc.profiles.splice(cIndex, 1);
        if (pc.isSearchByUserId === true)
        // pc.getProfiles();
          pc.getPaginateProfiles();
      }


      pc.isSearchByUserId = false;
      pc.isInterest = false;
      pc.isShortlist = false;
      pc.profileModal.hide();
    }

    $ionicModal.fromTemplateUrl('app/profiles/profile-filter-modal.html', {
      scope: $scope,
      animation: sConfig.modal.animation
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

        pc.pff.minAge = pc.ageAny[0];
        pc.pff.maxAge = pc.ageAny[0];;
        pc.pff.minHeight = pc.heightAny[0];
        pc.pff.maxHeight = pc.heightAny[0];
        pc.pff.complexion = pc.complexionAny[0];
        pc.pff.bodyType = pc.bodyTypeAny[0];
        pc.pff.subCaste = pc.subCasteAny[0];
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
          case "getVisitors":
            pc.getVisitors();
            break;
          case "inbox":
            // pc.inbox();
            pc.getRequestsIn();
            break;
          case "outbox":
            // pc.outbox();
            pc.getRequestsOut();
            break;
          case "getPaginateProfiles":
            pc.getPaginateProfiles();
            break;
          default:
            //pc.getProfiles();
            //pc.getPaginateProfiles();
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("ProfilesCtrl end");
  }
})();
