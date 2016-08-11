(function() {
  angular.module('starter').controller('ProfilesPCtrl', ProfilesPCtrl);

  ProfilesPCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'profileService'];

  function ProfilesPCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams, profileService) {
    var logger = utilService.getLogger();
    logger.debug("ProfilesPCtrl start");

    // Variables section
    var ppc = this;

    // Profiles preference
    ppc.subCasteArr = ["Swetamber", "Digamber", "Pancham"];
    ppc.complexionArr = ["Very fair", "Fair", "Wheatish", "Wheatish brown", "Dark"];
    ppc.bodyTypeArr = ["Slim", "Average", "Athletic", "Heavy"];
    ppc.heightArr = [];
    ppc.ppf = {};
    ppc.ageArr = [];
    ppc.ppf.minAge;
    ppc.ppf.maxAge;
    ppc.ppf.minHeight;
    ppc.ppf.maxHeight;
    ppc.ppf.complexion;
    ppc.ppf.bodyType;
    ppc.ppf.subCaste;

    // Function section
    var bootstrap = bootstrap;
    var setProfilesP = setProfilesP;
    var initAgeArr = initAgeArr;
    var initHeightArr = initHeightArr;
    ppc.updateProfilePreference = updateProfilePreference;

    // Functions definations
    function updateProfilePreference() {
      try {
        logger.debug("updateProfilePreference function");

        var req = {
          data: {
            _id: lsService.get("_id"),
            profilePreference: ppc.ppf
          }
        };

        var promise = profileService.updateProfilePreference(req);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
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

    function setProfilesP() {
      try {
        logger.debug("setProfilesP function");

        if (ppc.heightArr == 0)
          initHeightArr();

        ppc.ageArr.push("Any");
        for (var i = 18; i <= 40; i++) {
          ppc.ageArr.push(i);
        }

        if (ppc.heightArr.indexOf("Any") == -1) {
          ppc.heightArr.splice(0, 0, "Any");
          ppc.complexionArr.splice(0, 0, "Any");
          ppc.bodyTypeArr.splice(0, 0, "Any");
          ppc.subCasteArr.splice(0, 0, "Any");
        }

        ppc.ppf.minAge = ppc.ageArr[0];
        ppc.ppf.maxAge = ppc.ageArr[0];;
        ppc.ppf.minHeight = ppc.heightArr[0];
        ppc.ppf.maxHeight = ppc.heightArr[0];
        ppc.ppf.complexion = ppc.complexionArr[0];
        ppc.ppf.bodyType = ppc.bodyTypeArr[0];
        ppc.ppf.subCaste = ppc.subCasteArr[0];
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function initAgeArr() {
      try {
        logger.debug("initAgeArr function");

        ppc.ageArr.push("Any");
        for (var i = 18; i <= 40; i++) {
          ppc.ageArr.push(i);
        }

        ppc.ppf.minAge = ppc.ageArr[0];
        ppc.ppf.maxAge = ppc.ageArr[0];
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
              ppc.heightArr.push(i + " ft ");
              continue;
            }
            ppc.heightArr.push(i + " ft " + j + " in");
          }
        }
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
          default:
            setProfilesP();
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("ProfilesPCtrl end");
  }
})();
