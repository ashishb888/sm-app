(function() {
  angular.module('starter').controller('FamilyCtrl', FamilyCtrl);

  FamilyCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'familyService'];

  function FamilyCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams, familyService) {
    var logger = utilService.getLogger();
    logger.debug("FamilyCtrl start");

    // Variables section
    var fc = this;

    // Family form
    fc.ff = {};
    fc.familyTypeArr = ["Joint family", "Nuclear family"];
    fc.ff.familyType = fc.familyTypeArr[0];
    fc.familyValuesArr = ["Traditional", "Moderate"];
    fc.ff.familyValues = fc.familyValuesArr[0];
    fc.familyStatusArr = ["Middle class", "Upper middle class"];
    fc.ff.familyStatus = fc.familyStatusArr[0];

    // Function section
    var bootstrap = bootstrap;
    fc.updateFamily = updateFamily;
    fc.getFamily = getFamily;

    // Functions definations
    function getFamily() {
      try {
        logger.debug("getFamily function");

        var promise = familyService.getFamily(lsService.get("_id"));

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            if (resp.data.family) {
              fc.ff = resp.data.family;
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

    function updateFamily() {
      try {
        logger.debug("updateFamily function")

        var req = {
          data: {
            _id: lsService.get("_id")
          }
        };

        req.data.family = fc.ff;
        var promise = familyService.updateFamily(req);

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

    function bootstrap() {
      try {
        logger.debug("bootstrap function")

        switch ($stateParams.functionNm) {
          case "getFamily":
            fc.getFamily();
            break;
          default:
            fc.getFamily();
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("FamilyCtrl end");
  }
})();
