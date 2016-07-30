(function() {
  angular.module('starter').controller('LocationCtrl', LocationCtrl);

  LocationCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'profileService'];

  function LocationCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams, profileService) {
    var logger = utilService.getLogger();
    logger.debug("LocationCtrl start");

    // Variables section
    var lc = this;

    // Address form
    lc.af = {};
    lc.districtArr = ["A"];
    lc.af.district = lc.districtArr[0];
    lc.taluqaArr = ["A", "B"];
    lc.af.taluqa = lc.taluqaArr[0];
    lc.townArr = ["A", "B", "C"];
    lc.af.town = lc.townArr[0];

    // Function section
    var bootstrap = bootstrap;
    lc.postLocation = postLocation;

    function postLocation() {
      try {
        logger.debug("postLocation function");


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
