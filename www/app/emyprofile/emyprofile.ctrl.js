(function() {
  angular.module('starter').controller('EMyProfileCtrl', EMyProfileCtrl);

  EMyProfileCtrl.$inject = ['starterConfig', 'utilService', '$state', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'profileService'];

  function EMyProfileCtrl(sConfig, utilService, $state, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams, profileService) {
    var logger = utilService.getLogger();
    logger.debug("EMyProfileCtrl start");

    // Variables section
    var emp = this;

    // Function section
    var bootstrap = bootstrap;
    emp.getDP = getDP;

    // Functions definations
    function getDP() {
      try {
        logger.debug("getDP function");

        var promise = profileService.getImgs(sConfig.picType.dp, lsService.get("_id"));
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            // Add a toast here
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

    logger.debug("EMyProfileCtrl end");
  }
})();
