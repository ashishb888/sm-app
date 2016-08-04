(function() {
  angular.module('starter').controller('ProfessionCtrl', ProfessionCtrl);

  ProfessionCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', '$scope', '$ionicModal', 'cameraService', '$stateParams', 'profileService'];

  function ProfessionCtrl(sConfig, utilService, $state, $ionicPopup, lsService, $scope, $ionicModal, cameraService, $stateParams, profileService) {
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

    function updateProfession() {
      try {
        logger.debug("updateProfession function");

        var req = {
          data:{
            _id: lsService.get("_id")
          }
        };

        req.data.profession = pfc.pf;
        var promise = profileService.updateProfession(req);

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

        // Add switch block  here
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("ProfessionCtrl end");
  }
})();
