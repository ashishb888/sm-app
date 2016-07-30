(function() {
  angular.module('starter').controller('ProfessionCtrl', ProfessionCtrl);

  ProfessionCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'profileService'];

  function ProfessionCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $scope, $ionicModal, cameraService, $stateParams, profileService) {
    var logger = utilService.getLogger();
    logger.debug("ProfessionCtrl start");

    // Variables section
    var pfc = this;

    // Professional form
    pfc.of = {};
    pfc.hEducationArr = ["Bellow 10th", "10th", "12th", "BA", "BSc", "BCom", "Diploma", "BE", "BTech", "ME", "MTech", "Ded", "Bed", "MCA", "BCA", "MA", "MSc", "Other"];
    pfc.of.hEducation = pfc.hEducationArr[0];
    pfc.of.oHEducation;
    pfc.occupationArr = ["Job", "Farm", "Business"];
    pfc.of.occupation = pfc.occupationArr[0];


    // Function section
    var bootstrap = bootstrap;
    pfc.postProfession = postProfession;

    function postProfession() {
      try {
        logger.debug("postProfession function");


      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }



    function bootstrap() {
      try {
        logger.debug("bootstrap function");

        // Add switch block  here
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("ProfessionCtrl end");
  }
})();
