(function() {
  angular.module('starter').controller('FamilyCtrl', FamilyCtrl);

  FamilyCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$ionicSlideBoxDelegate', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'profileService'];

  function FamilyCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $ionicSlideBoxDelegate, $scope, $ionicModal, cameraService, $stateParams, profileService) {
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
    fc.postFamily = postFamily;

    function postFamily() {
      try {
        logger.debug("postFamily function")

      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function bootstrap() {
      try {
        logger.debug("bootstrap function")

      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("FamilyCtrl end");
  }
})();
