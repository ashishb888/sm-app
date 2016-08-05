(function() {
  angular.module('starter').controller('ProfessionCtrl', ProfessionCtrl);

  ProfessionCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'professionService'];

  function ProfessionCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $scope, $ionicModal, cameraService, $stateParams, professionService) {
    var logger = utilService.getLogger();
    logger.debug("ProfessionCtrl start");

    // Variables section
    var pfc = this;

    // Professional form
    pfc.pf = {};
    pfc.hEducationArr = ["Bellow 10th", "10th", "12th", "BA", "BSc", "BCom", "Diploma", "BE", "BTech", "ME", "MTech", "Ded", "Bed", "MCA", "BCA", "MA", "MSc", "Other"];
    pfc.pf.hEducation = pfc.hEducationArr[0];
    pfc.pf.oHEducation;
    pfc.occupationArr = ["Job", "Farm", "Business"];
    pfc.pf.occupation = pfc.occupationArr[0];


    // Function section
    var bootstrap = bootstrap;
    pfc.updateProfession = updateProfession;
    pfc.getProfession = getProfession;

    // Functions definations
    function getProfession() {
      try {
        logger.debug("getProfession function");

        var promise = professionService.getProfession(lsService.get("_id"));

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }
            if (resp.data.profession) {
              pfc.pf = resp.data.profession;
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

    function updateProfession() {
      try {
        logger.debug("updateProfession function");

        var req = {
          data: {
            _id: lsService.get("_id")
          }
        };

        req.data.profession = pfc.pf;
        var promise = professionService.updateProfession(req);

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.toastMessage(resp.messages);
              return;
            }

            utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
            $state.go(sConfig.appStates.menu_pinfo);
            //utilService.toastMessage(resp.messages, null, sConfig.msgs.success);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }



    function bootstrap() {
      try {
        logger.debug("bootstrap function");

        switch ($stateParams.functionNm) {
          case "getProfession":
            pfc.getProfession();
            break;
          default:
            pfc.getProfession();
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("ProfessionCtrl end");
  }
})();
