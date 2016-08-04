(function() {
  angular.module('starter').controller('LocationCtrl', LocationCtrl);

  LocationCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'locationService'];

  function LocationCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams, locationService) {
    var logger = utilService.getLogger();
    logger.debug("LocationCtrl start");

    // Variables section
    var lc = this;

    // Address form
    lc.lf = {};
    lc.districtArr = ["A"];
    lc.lf.district = lc.districtArr[0];
    lc.taluqaArr = ["A", "B"];
    lc.lf.taluqa = lc.taluqaArr[0];
    lc.townArr = ["A", "B", "C"];
    lc.lf.town = lc.townArr[0];

    // Function section
    var bootstrap = bootstrap;
    lc.updateLocation = updateLocation;
    lc.getLocation = getLocation;

    // Functions definations
    function getLocation() {
      try {
        logger.debug("getLocation function");

        var promise = locationService.getLocation(lsService.get("_id"));

        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            if (resp.data.location) {
              lc.lf = resp.data.location;
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

    function updateLocation() {
      try {
        logger.debug("updateLocation function");

        var req = {
          data:{
            _id: lsService.get("_id")
          }
        };

        req.data.location = lc.lf;
        var promise = locationService.updateLocation(req);

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
        logger.debug("bootstrap function");

        switch ($stateParams.functionNm) {
          case "getLocation":
            lc.getLocation();
            break;
          default:
            lc.getLocation();
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("LocationCtrl end");
  }
})();
