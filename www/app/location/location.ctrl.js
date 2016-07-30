(function() {
  angular.module('starter').controller('LocationCtrl', LocationCtrl);

  LocationCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'profileService'];

  function LocationCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams, profileService) {
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

    function updateLocation() {
      try {
        logger.debug("updateLocation function");

        var req = {
          data:{
            _id: lsService.get("userId")
          }
        };

        req.data.location = lc.lf;
        var promise = profileService.updateLocation(req);

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

      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("LocationCtrl end");
  }
})();
