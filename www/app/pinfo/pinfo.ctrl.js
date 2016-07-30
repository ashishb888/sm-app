(function() {
  angular.module('starter').controller('PInfoCtrl', PInfoCtrl);

  PInfoCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'profileService'];

  function PInfoCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams, profileService) {
    var logger = utilService.getLogger();
    logger.debug("PInfoCtrl start");

    // Variables section
    var pic = this;
    // Personal info form
    pic.pif = {};
    pic.genderArr = ["Male", "Female"];
    pic.pif.gender = pic.genderArr[0];
    pic.heightArr = [];
    pic.pif.height;
    pic.bodyTypeArr = ["Slim", "Average", "Athletic", "Heavy"];
    pic.pif.bodyType = pic.bodyTypeArr[0];
    pic.martitalStatusArr = ["Never married", "Widower", "Divorced", "Awaiting divorce"];
    pic.pif.martitalStatus = pic.martitalStatusArr[0];
    pic.complexionArr = ["Very fair", "Fair", "Wheatish", "Wheatish brown", "Dark"];
    pic.pif.complexion = pic.complexionArr[0];
    pic.physicalStatusArr = ["Normal", "Physically challenged"];
    pic.pif.physicalStatus = pic.physicalStatusArr[0];
    pic.eatingHabitArr = ["Vegetarian", "Non-vegetarian", "Eggetarian"];
    pic.pif.eatingHabit = pic.eatingHabitArr[0];
    pic.drinkingHabitArr = ["No", "Yes", "Occasionally"];
    pic.pif.drinkingHabit = pic.drinkingHabitArr[0];
    pic.smokingHabitArr = ["No", "Yes", "Occasionally"];
    pic.pif.smokingHabit = pic.smokingHabitArr[0];
    pic.subCasteArr = ["Swetamber", "Digamber", "Pancham"];
    pic.pif.subCaste = pic.subCasteArr[0];
    pic.pif.dob = new Date();
    pic.pif.tob = new Date();
    pic.zodiacArr = ["Aries", "Leo", "Sagittarius", "Taurus", "Virgo", "Capricorn", "Gemini", "Libra", "Aquarius", "Cancer", "Scorpio", "Pisces"];
    pic.pif.zodiac = pic.zodiacArr[0];


    // Function section
    var initHeightArr = initHeightArr;
    var bootstrap = bootstrap;
    pic.updatePInfo = updatePInfo;

    function updatePInfo() {
      try {
        logger.debug("updatePInfo function");
        var req = {
          data:{
            _id: lsService.get("userId")
          }
        };

        req.data.pinfo = pic.pif;
        var promise = profileService.updatePInfo(req);

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

    function initHeightArr() {
      try {
        logger.debug("initHeightArr function");

        for (var i = 4; i < 7; i++) {
          for (var j = 0; j < 12; j++) {
            if (j === 0) {
              pic.heightArr.push(i + " ft ");
              continue;
            }
            pic.heightArr.push(i + " ft " + j + " in");
          }
        }
        pic.pif.height = pic.heightArr[0];
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    // initHeightArr();

    function setEProfile() {
      try {
        logger.debug("setEProfile function");
        if (pic.heightArr == 0)
          initHeightArr();
        pic.pif.height = pic.heightArr[0];
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }


    function bootstrap() {
      try {
        logger.debug("bootstrap function")

        switch ($stateParams.functionNm) {
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

    logger.debug("PInfoCtrl end");
  }
})();
