(function() {
  angular.module('starter').controller('ProfilesCtrl', ProfilesCtrl);

  ProfilesCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'profileService'];

  function ProfilesCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams, profileService) {
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

    // Function section
    var bootstrap = bootstrap;
    var initHeightArr = initHeightArr;
    var setFProfiles = setFProfiles;
    pc.showProfileFModal = showProfileFModal;
    pc.hideProfileFModal = hideProfileFModal;

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

    function bootstrap() {
      try {
        logger.debug("bootstrap function")

        switch ($stateParams.functionNm) {
          case "setFProfiles":
            setFProfiles();
            break;
          default:
            setFProfiles();
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("ProfilesCtrl end");
  }
})();
