(function() {
  angular.module('starter').controller('EditProfileCtrl', EditProfileCtrl);

  EditProfileCtrl.$inject = ['starterConfig', 'utilService', '$state',
    '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope',
    '$ionicModal', 'cameraService', '$stateParams', 'editProfileService',
    '$rootScope', 'hwBackBtnService', '$ionicPopup', '$ionicActionSheet',
    'profileService', '$ionicHistory'
  ];

  function EditProfileCtrl(sConfig, utilService, $state, $ionicPopup,
    lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService,
    $stateParams, editProfileService, $rootScope, hwBackBtnService,
    $ionicPopup, $ionicActionSheet, profileService, $ionicHistory) {
    var logger = utilService.getLogger();
    logger.debug("EditProfileCtrl start");

    // Variables section
    var epc = this;
    $scope.items = [{
        src: 'data:image/jpg;base64,/9j/4QEuRXhpZgAASUkqAAgAAAAPAJqCCgABAAAAwgAAABABAgAQAAAAygAAAAABAwABAAAALAEAAJ2CCgABAAAA2gAAAAOkAwABAAAAAAAAAAmSAwABAAAAAAAAAA8BAgAKAAAA4gAAACeICAABAAAArQIAAAqSBQABAAAA7AAAAAiSAwABAAAAAAAAABIBAwABAAAAAQAAAAeSAwABAAAA/////wEBAwABAAAAkAEAADIBAgAUAAAA9AAAAGmHBAABAAAACAEAAAAAAAAFAAAAZAAAAE1pY3JvbWF4IEFRNDUwMQAcAAAACgAAAE1pY3JvbWF4AAASAQAAZAAAADIwMTY6MDg6MjAgMTE6Mzc6MjUAAgABAgQAAQAAACYBAAACAgQAAQAAAAAAAAAAAAAA/9sAQwBQNzxGPDJQRkFGWlVQX3jIgnhubnj1r7mRyP///////////////////////////////////////////////////9sAQwFVWlp4aXjrgoLr/////////////////////////////////////////////////////////////////////////8AAEQgBkAEsAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8ArUUUUCCilooAKSlooASilooASilooASiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooASloooAKKDSUD2CiiigQUUUtACUUtJQAUUUUALS0UUAFFFFABRRRQAUUUUAFFFFABSUtFACU5VLHApAMmp0TaPekAeUpXHf1qJ42X6VYFLQMp0VZeIN04NQMhXqKBDaKKKYBRRRQAUUUUAFFFFAwoNFFA9gooooJCiiigAooooAKKKekeeT0oARELfSpQoAwBTsYHFFAFeiiigAooooAKKKKACiiigAoopKAFoop8a55NADo0xyetSUUVIxRTqbRQAtFGaKAI2iB6cGoWQr1FWqQjIpgVKKnaIHpULKV6imAlFFFABQTRSUhhS0lFMkWiiigAooooAKBzSqpY4FTIgX60AIkeOW61JRRQAUUUUAVqKKKACiiigAooooAKSlooASiloVSxwKAFRdx9qnHApAAoo3Ajg1Ixc0mfmxUJkOaaXp2An30eYD0quWNBaiwFjzQKPNFV8ilx3osBOJlp4dT0NVwQOMYoosBYPSlIBHNVyzL64pTIWXBosAj7d3y9KaQakRRnJNSkBhyKBlWipWhx92oiMUxCUUtJQIKWkpaACnIhb6U5I+7flUtAAFCjApaKKACloooAKKKKAKtFFLQAlFFFABRRRQAUUUUAAGamVdo96EXaMnrTJJNvApDB34xURb0pCxNJQAZoopRTASlop+BgGgCMU9ce9AwDQwGcrxQAu7H0pVYAGmhuMGgYoAU4I+9TaWigBccVLHJgYNQ0DrQItAg9DSMobqKhDFTxUqNuFKwyNoiOnNR4q0eOtIUDdaAKwBJwKmVAv1pwULwKWmIKKKKAFFLSUtABRRRQAUUUUAVaKWigegUUUUBYSiiigQVLGuOTSRrnk092wKQxsr7RgdagPNSMMjPeo2poBtKKUDNIeuKACijFKKAAehp6g8im47indRkUABAxmmnHapFPHNRkYNABwRTe9Oxg0uARnoaAGc0tO5K/SmnigBc0maUHNFAgPPNPjYqfakAGKbjFMCy/wAyZFMDEU1H2nB6GlpAP3A0tRUoYigCSiiigBaWkpaACloooAKSlpKYFWikFLSAKWkooAUjBpQM0gyxqZVwKQ7jVcAYIxQ5yOKeVB6ioz8rD060IBDjGTUbU9zk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',
        sub: 'This is a <b>subtitle</b>'
      }, {
        src: 'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
        sub: '' /* Not showed */
      }, {
        src: 'http://www.hdwallpapersimages.com/wp-content/uploads/2014/01/Winter-Tiger-Wild-Cat-Images.jpg',
        thumb: 'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
      }]
      // Entire profile
    epc.profile;
    // Personal info form
    epc.bdf = {};
    epc.bdf.gender;
    epc.heightArr = [];
    epc.bdf.height;
    epc.bdf.bodyType;
    //epc.bdf.martitalStatus = epc.martitalStatusArr[0];
    // epc.bdf.complexion = epc.complexionArr[0];
    epc.bdf.complexion;
    //epc.bdf.physicalStatus = epc.physicalStatusArr[0];
    //epc.bdf.eatingHabit = epc.eatingHabitArr[0];
    //epc.bdf.drinkingHabit = epc.drinkingHabitArr[0];
    //epc.bdf.smokingHabit = epc.smokingHabitArr[0];
    epc.bdf.dob;
    epc.bdf.dobLocal;

    //Religious info
    epc.rif = {};
    epc.rif.tob;
    epc.rif.subCaste;
    epc.rif.zodiac;

    // Professional info
    epc.pif = {};
    epc.pif.hEducation;
    epc.pif.oHEducation;
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
    epc.fif.familyType;
    epc.fif.familyValues;
    epc.fif.familyStatus;

    // Profiles preference
    epc.ppf = {};
    epc.ppf.minAge;
    epc.ppf.maxAge;
    epc.ppf.minHeight;
    epc.ppf.maxHeight;
    epc.ppf.complexion;
    epc.ppf.bodyType;
    epc.ppf.subCaste;

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
    epc.modalImgsArr = [];

    //DP
    epc.isDP = false;
    epc.isDPUpload = false;

    // Function section
    var initHeightArr = initHeightArr;
    var bootstrap = bootstrap;
    var dateToString = dateToString;
    var formatHeight = formatHeight;
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

    epc.showPPModal = showPPModal;
    epc.hidePPModal = hidePPModal;
    epc.updateProfilePreference = updateProfilePreference;

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
    epc.removeImg = removeImg;
    epc.dpFunction = dpFunction;
    epc.wcFunction = wcFunction;

    // Do nothing
    epc.doNothing = doNothing;

    epc.getDP = getDP;
    epc.updateDP = updateDP;
    epc.enableHWBackBtn = enableHWBackBtn;
    epc.goToProfiles = goToProfiles;
    epc.imgActionSheet = imgActionSheet;
    epc.removeImgActionSheet = removeImgActionSheet;
    var getLocalData = getLocalData;

    // Functions definations
    function updateProfilePreference() {
      try {
        logger.debug("updateProfilePreference function");

        var req = {
          data: {
            profilePreference: epc.ppf
          }
        };

        var promise = editProfileService.updateProfilePreference(req);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }

            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);

            epc.hidePPModal(true);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function imgActionSheet() {
      logger.debug("imgActionSheet function");

      var hideImgActionSheet = $ionicActionSheet.show({
        titleText: "Upload images",
        buttons: [{
          text: "<i class='txt-color icon ion-person'></i> Personal"
        }, {
          text: "<i class='txt-color icon ion-home'></i> Home"
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
              epc.showOwnImgsModal();
              break;
            case 1:
              epc.showHomeImgsModal();
              break;
            case 2:
              hideImgActionSheet();
              break;
            default:
              epc.showOwnImgsModal();
          }
          return true;
        }
      });

      /*$ionicActionSheet.show({
        titleText: 'ActionSheet Example',
        buttons: [{
          text: '<i class="icon ion-share"></i> Share'
        }, {
          text: '<i class="icon ion-arrow-move"></i> Move'
        }, ],
        destructiveText: 'Delete',
        cancelText: 'Cancel',
        cancel: function() {
          console.log('CANCELLED');
        },
        buttonClicked: function(index) {
          console.log('BUTTON CLICKED', index);
          return true;
        },
        destructiveButtonClicked: function() {
          console.log('DESTRUCT');
          return true;
        }
      });*/
    }

    function goToProfiles() {
      try {
        logger.debug("goToProfiles function");
        /*$rootScope.$broadcast("setBanner");*/
        /*epc.enableHWBackBtn();*/
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go(sConfig.appStates.menu_profiles);
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function formatHeight(height) {
      try {
        logger.debug("formatHeight function");

        var heightSplit = height.split(" ");
        var height = {
          feet: parseInt(heightSplit[0]),
          inches: 0
        };
        if (heightSplit.length > 2) {
          height.inches = parseInt(heightSplit[2]);
        }

        return height;
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function dateToString(date) {
      try {
        logger.debug("dateToString function");

        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function enableHWBackBtn() {
      logger.debug("enableHWBackBtn function");

      hwBackBtnService.enableHWBackBtn();
      $state.go(sConfig.appStates.menu_profiles);
    }

    function updateDP() {
      try {
        logger.debug("updateDP function");

        var req = {
          data: {
            _id: lsService.get("_id")
          }
        };

        req.data.base64 = [];

        if (epc.dp._id != "local") {
          utilService.toastMessage("Nothing to upload.", null, sConfig.msgs.success);
          return;
        }

        req.data.base64.push(epc.dp.base64);

        var promise = editProfileService.updateDP(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }

            // $rootScope.rootDP = epc.dp.base64;
            lsService.set("dp", epc.dp.base64);
            $rootScope.$broadcast("setBanner");
            epc.isDPUpload = true;
            lsService.set("isDP", true);

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

        /*var promise = editProfileService.getDP();
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }
            if (resp.data.dp) {
              epc.dp = resp.data.dp;
              epc.dp.base64 = epc.dp.dp;
              $rootScope.rootDP = epc.dp.base64;

              epc.isDP = true;
            }
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});*/
        epc.dp = {};
        epc.dp.base64 = lsService.get("dp");
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function getHomeImgs() {
      try {
        logger.debug("getHomeImgs function");

        var promise = editProfileService.getImgs(sConfig.picType.home,
          lsService.get("_id"));

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }
            epc.homeImgs = resp.data.images;

            if (!epc.pp) {
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
      animation: sConfig.modal.animation
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
        var promise = editProfileService.updateImgs(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }

            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);

            epc.getHomeImgs();
            epc.hideUploadImgsModal();
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
          utilService.toastMessage("No new images to upload.", null, sConfig.msgs.success);
          return;
        }
        //req.data.base64 = epc.ownImages.base64;
        var promise = editProfileService.updateImgs(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }

            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);

            epc.getOwnImgs();
            epc.hideUploadImgsModal();
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

        var promise = editProfileService.getImgs(sConfig.picType.own,
          lsService.get("_id"));

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }
            epc.ownImgs = resp.data.images;

            for (var i = 0; i < epc.ownImgs.length; i++) {
              epc.ownImgs[i].src = "data:image/jpg;base64," + epc.ownImgs[i].base64;
            }

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
                  epc.isDP = true;
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

        var confirmPopup = $ionicPopup.confirm({
          title: 'Delete images',
          template: 'Are you sure you want to delete the image?'
        });

        confirmPopup.then(function(res) {
          if (res) {
            var promise;

            switch (type) {
              case sConfig.picType.own:
                if (id === "local") {
                  epc.ownImgs.splice(index, 1);
                  return;
                }
                promise = editProfileService.removeImg(id);

                break;
              case sConfig.picType.home:
                if (id === "local") {
                  epc.homeImgs.splice(index, 1);
                  return;
                }
                promise = editProfileService.removeImg(id);
                break;
            }

            promise.then(function(sucResp) {
              try {
                var resp = sucResp.data;
                if (resp.status !== sConfig.httpStatus.SUCCESS) {
                  utilService.toastMessage(resp.messages);
                  //utilService.toastMessage(resp.messages);
                  return;
                }
                utilService.toastMessage(resp.messages, null, sConfig
                  .msgs.success);
                if (type === sConfig.picType.home) {
                  epc.homeImgs.splice(index, 1);
                  return;
                }
                epc.ownImgs.splice(index, 1);
              } catch (exception) {
                logger.error("exception: " + exception);
              }
            }, function(errResp) {});
          }
        });


      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function removeImgActionSheet(type, id, index) {
      logger.debug("removeImgActionSheet function");

      var hideRemoveImgActionSheet = $ionicActionSheet.show({
        titleText: "Image delete",
        buttons: [{
          text: "<i class='txt-color icon ion-trash-b'></i> Delete"
        }, {
          text: "<i class='txt-color icon ion-close-circled'></i> Cancel"
        }],
        cancel: function() {
          logger.debug("Cancelled");
        },
        buttonClicked: function(btnIndex) {
          logger.debug("Button clicked", btnIndex);

          switch (btnIndex) {
            case 0:
              var promise;

              switch (type) {
                case sConfig.picType.own:
                  if (id === "local") {
                    epc.ownImgs.splice(index, 1);
                    hideRemoveImgActionSheet();
                    return;
                  }
                  promise = editProfileService.removeImg(id);
                  break;
                case sConfig.picType.home:
                  if (id === "local") {
                    epc.homeImgs.splice(index, 1);
                    hideRemoveImgActionSheet();
                    return;
                  }
                  promise = editProfileService.removeImg(id);
                  break;
              }

              promise.then(function(sucResp) {
                try {
                  var resp = sucResp.data;
                  if (resp.status !== sConfig.httpStatus.SUCCESS) {
                    utilService.toastMessage(resp.messages);
                    //utilService.toastMessage(resp.messages);
                    return;
                  }
                  utilService.toastMessage(resp.messages, null,
                    sConfig.msgs.success);
                  if (type === sConfig.picType.home) {
                    epc.homeImgs.splice(index, 1);
                    return;
                  }
                  epc.ownImgs.splice(index, 1);
                } catch (exception) {
                  logger.error("exception: " + exception);
                }
              }, function(errResp) {});
              break;
            case 1:
              hideRemoveImgActionSheet();
              break;
          }
          return true;
        }
      });
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
            var ownImgs = epc.ownImgs;
            epc.modalImgsArr = ownImgs.concat(epc.homeImgs);
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
              src: sucResp,
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
              utilService.toastMessage(resp.messages);
              return;
            }
            if (resp.data.familyInfo) {
              epc.fif = resp.data.familyInfo;
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
            epc.hideFamilyModal(true);
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

            lsService.set("userLocation", JSON.stringify(epc.lif));
            $rootScope.$broadcast("setBanner");

            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
            epc.hideLocationModal(true);
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

        var promise = editProfileService.getProfessionInfo(lsService.get(
          "_id"));

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
            epc.hideProfessionModal(true);
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
              utilService.toastMessage(resp.messages);
              return;
            }
            var bDetails = resp.data.profile.basicDetails;
            if (bDetails) {
              /*epc.bdf.fullName = bDetails.fullName;
              epc.bdf.gender = bDetails.gender;*/

              // Commented for new date format
              /*if (bDetails.dob) {
                var dobArr = bDetails.dob.split("-");
                bDetails.dobLocal = new Date(dobArr[0], dobArr[1] - 1, dobArr[2]);
                epc.isShowDOB = true;
              } else {
                bDetails.dobLocal = new Date();
                epc.isShowDOB = false;
              }*/

              if (bDetails.dob) {
                bDetails.dobLocal = moment(bDetails.dob.toString())._d;
                epc.isShowDOB = true;
              } else {
                var gender = bDetails.gender.toLowerCase();

                if (gender == "male") {
                  bDetails.dobLocal = moment().subtract(21, 'years')._d;
                } else {
                  bDetails.dobLocal = moment().subtract(18, 'years')._d;
                }

                epc.isShowDOB = false;
              }

              epc.bdf = bDetails;
              //delete bDetails.dob;

              if (bDetails.height) {
                epc.bdf.height = epc.bdf.height.feet + " ft " + epc.bdf.height
                  .inches + " in";
              }
            }

            var rInfo = resp.data.profile.religiousInfo;
            epc.rif.tobLocal = new Date();

            if (rInfo) {
              if (rInfo.tob) {
                var tobArr = rInfo.tob.split(":");
                rInfo.tobLocal = new Date();
                rInfo.tobLocal.setHours(tobArr[0] - 1);
                rInfo.tobLocal.setMinutes(tobArr[1] - 1);
                epc.isShowTOB = true;
              } else {
                epc.isShowTOB = false;
                rInfo.tobLocal = new Date();
              }

              epc.rif = rInfo;
            }

            if (resp.data.profile.professionInfo)
              epc.pif = resp.data.profile.professionInfo;

            if (resp.data.profile.locationInfo)
              epc.lif = resp.data.profile.locationInfo;

            if (resp.data.profile.familyInfo)
              epc.fif = resp.data.profile.familyInfo;
            if (resp.data.profile.profilePreference)
              epc.ppf = resp.data.profile.profilePreference;

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
      animation: sConfig.modal.animation
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
      animation: sConfig.modal.animation
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

    $ionicModal.fromTemplateUrl('app/editprofile/pp-modal.html', {
      scope: $scope,
      animation: sConfig.modal.animation,
      focusFirstInput: true
    }).then(function(modal) {
      epc.ppModal = modal;
    });

    function showPPModal() {
      logger.debug("showPPModal function");

      epc.heightArr = JSON.parse(lsService.get("heightAny"));
      epc.ageArr = JSON.parse(lsService.get("ageAny"));
      epc.complexionArr = JSON.parse(lsService.get("complexionAny"));
      epc.bodyTypeArr = JSON.parse(lsService.get("bodyTypesAny"));
      epc.subCasteArr = JSON.parse(lsService.get("subCasteAny"));

      lsService.set("ppf", JSON.stringify(epc.ppf));

      epc.ppModal.show();
    }

    function hidePPModal(isUpdate) {
      logger.debug("hidePPModal function");

      if (!isUpdate && lsService.get("ppf")) {
        epc.ppf = JSON.parse(lsService.get("ppf"));
      }

      lsService.remove("ppf");
      epc.ppModal.hide();
    }

    $ionicModal.fromTemplateUrl('app/editprofile/family-modal.html', {
      scope: $scope,
      animation: sConfig.modal.animation,
      focusFirstInput: true
    }).then(function(modal) {
      epc.familyModal = modal;
    });

    function showFamilyModal() {
      logger.debug("showFamilyModal function");

      lsService.set("fif", JSON.stringify(epc.fif));
      epc.familyModal.show();
    }

    function hideFamilyModal(isUpdate) {
      logger.debug("hideFamilyModal function");

      if (!isUpdate && lsService.get("fif")) {
        epc.fif = JSON.parse(lsService.get("fif"));
      }

      lsService.remove("fif");
      epc.familyModal.hide();
    }

    $ionicModal.fromTemplateUrl('app/editprofile/location-modal.html', {
      scope: $scope,
      animation: sConfig.modal.animation,
      focusFirstInput: true
    }).then(function(modal) {
      epc.locationModal = modal;
    });

    function showLocationModal() {
      logger.debug("showLocationModal function");

      lsService.set("lif", JSON.stringify(epc.lif));
      epc.locationModal.show();
    }

    function hideLocationModal(isUpdate) {
      logger.debug("hideLocationModal function");

      if (!isUpdate && lsService.get("lif")) {
        epc.lif = JSON.parse(lsService.get("lif"));
      }

      lsService.remove("lif");
      epc.locationModal.hide();
    }

    $ionicModal.fromTemplateUrl('app/editprofile/religious-modal.html', {
      scope: $scope,
      animation: sConfig.modal.animation,
      focusFirstInput: true
    }).then(function(modal) {
      epc.religiousModal = modal;
    });

    function showReligiousModal() {
      logger.debug("showReligiousModal function");
      lsService.set("rif", JSON.stringify(epc.rif));
      epc.religiousModal.show();
    }

    function hideReligiousModal(isUpdate) {
      logger.debug("hideReligiousModal function");

      if (!isUpdate && lsService.get("rif")) {
        var rif = JSON.parse(lsService.get("rif"));

        if (rif.tob) {
          var tobArr = rif.tob.split(":");
          var tobLocal = new Date();
          tobLocal.setHours(tobArr[0] - 1);
          tobLocal.setMinutes(tobArr[1] - 1);
          delete rif.tobLocal;
          epc.rif = rif;
          epc.rif.tobLocal = tobLocal;
        }
      }

      lsService.remove("rif");
      epc.religiousModal.hide();
    }

    $ionicModal.fromTemplateUrl('app/editprofile/basicdetails-modal.html', {
      scope: $scope,
      animation: sConfig.modal.animation,
      focusFirstInput: true
    }).then(function(modal) {
      epc.basicDetailsModal = modal;
    });

    function showBasicDetailsModal() {
      logger.debug("showBasicDetailsModal function");
      lsService.set("basicDetails", JSON.stringify(epc.bdf));

      epc.basicDetailsModal.show();
    }

    function hideBasicDetailsModal(isUpdate) {
      logger.debug("hideBasicDetailsModal function");

      if (!isUpdate && lsService.get("basicDetails")) {
        var basicDetails = JSON.parse(lsService.get("basicDetails"));

        delete basicDetails.dobLocal;
        epc.bdf = basicDetails;

        if (basicDetails.dob) {
          var dobLocal = moment(basicDetails.dob.toString())._d;
          epc.bdf.dobLocal = dobLocal;
        }
      }

      lsService.remove("basicDetails");
      epc.basicDetailsModal.hide();
    }

    $ionicModal.fromTemplateUrl('app/editprofile/profession-modal.html', {
      scope: $scope,
      animation: sConfig.modal.animation,
      focusFirstInput: true
    }).then(function(modal) {
      epc.professionModal = modal;
    });

    function showProfessionModal() {
      logger.debug("showProfessionModal function");

      lsService.set("pif", JSON.stringify(epc.pif));
      epc.professionModal.show();
    }

    function hideProfessionModal(isUpdate) {
      logger.debug("hideProfessionModal function");

      if (!isUpdate && lsService.get("pif")) {
        epc.pif = JSON.parse(lsService.get("pif"));
      }

      lsService.remove("pif");
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

        var tobText = (epc.rif.tobLocal.getHours() + 1) + ":" + (epc.rif.tobLocal
          .getMinutes() + 1);
        epc.rif.tob = tobText

        // epc.rif.tob = new Date(epc.rif.tob);
        req.data.religiousInfo = epc.rif;

        var promise = editProfileService.updateReligiousInfo(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }
            epc.isShowTOB = true;
            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
            epc.hideReligiousModal(true);
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
              epc.bdf.height = epc.bdf.height.feet + " ft " + epc.bdf.height
                .inches + " in";
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
          epc.bdf.height.inches = parseInt(heightSplit[2]);
        }

        //epc.bdf.height = formatHeight(epc.bdf.height)
        var dobText;
        /*if (epc.bdf.dob instanceof Date) {
          dobText = epc.bdf.dob.getDate() + "-" + (epc.bdf.dob.getMonth() + 1) + "-" + epc.bdf.dob.getFullYear();
        }*/
        // var dobText = epc.bdf.dobLocal.getFullYear() + "-" + (epc.bdf.dobLocal.getMonth() + 1) + "-" + epc.bdf.dobLocal.getDate();
        epc.bdf.dob = parseInt(moment(epc.bdf.dobLocal).format('YYYYMMDD'));
        // epc.bdf.dob = epc.bdf.dob.toString().split("T")[0];
        req.data.basicDetails = epc.bdf;
        //req.data.basicDetails.dob = dobText;
        var promise = editProfileService.updateBasicDetails(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }

            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);

            lsService.set("fullName", epc.bdf.fullName);
            lsService.set("dob", epc.bdf.dob);
            lsService.set("userHeight", JSON.stringify(epc.bdf.height));
            lsService.set("userGender", epc.bdf.gender);
            $rootScope.$broadcast("setBanner");
            epc.isShowDOB = true;

            epc.bdf.height = lHeight;
            epc.hideBasicDetailsModal(true);
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
        //epc.bdf.height = epc.heightArr[0];
        lsService.set("heightArr", JSON.stringify(epc.heightArr));
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
        // epc.bdf.height = epc.heightArr[0];
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function doNothing() {
      logger.debug("doNothing function");
    }

    function wcFunction() {
      try {
        logger.debug("wcFunction function");

        hwBackBtnService.disableHWBackBtn();
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function dpFunction() {
      try {
        logger.debug("dpFunction function");

        hwBackBtnService.disableHWBackBtn();
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function getLocalData() {
      try {
        logger.debug("getLocalData function")

        epc.bodyType = JSON.parse(lsService.get("bodyTypes"));
        epc.complexion = JSON.parse(lsService.get("complexion"));
        epc.subCaste = JSON.parse(lsService.get("subCaste"));
        epc.age = JSON.parse(lsService.get("age"));
        epc.height = JSON.parse(lsService.get("height"));
        epc.zodiac = JSON.parse(lsService.get("zodiac"));
        epc.education = JSON.parse(lsService.get("education"));
        epc.familyType = JSON.parse(lsService.get("familyType"));
        epc.familyValues = JSON.parse(lsService.get("familyValues"));
        epc.familyStatus = JSON.parse(lsService.get("familyStatus"));
        epc.occupation = JSON.parse(lsService.get("occupation"));
        epc.gender = JSON.parse(lsService.get("gender"));
        epc.district = JSON.parse(lsService.get("district"));
        epc.taluka = JSON.parse(lsService.get("taluka"));
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
          case "doNothing":
            epc.doNothing();
            break;
          case "getDP":
            epc.getDP();
            break;
          case "dpFunction":
            epc.dpFunction();
            break;
          case "wcFunction":
            epc.wcFunction();
            break;
        }

        getLocalData();
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("EditProfileCtrl end");
  }
})();
