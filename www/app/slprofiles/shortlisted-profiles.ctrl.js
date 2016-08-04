(function() {
  angular.module('starter').controller('SProfilesCtrl', SProfilesCtrl);

  SProfilesCtrl.$inject = ['starterConfig', 'utilService', '$state', 'lsService', '$scope', '$stateParams', 'profileService', '$ionicModal'];

  function SProfilesCtrl(sConfig, utilService, $state, lsService, $scope, $stateParams, profileService, $ionicModal) {
    var logger = utilService.getLogger();
    logger.debug("SProfilesCtrl start");

    // Variables section
    var spc = this;
    // Get shortlist
    spc.profiles = [];
    // Function section
    var bootstrap = bootstrap;
    spc.getShortlist = getShortlist;
    spc.viewProfile = viewProfile;
    spc.showProfileModal = showProfileModal;
    spc.hideProfileModal = hideProfileModal;
    //Functions definations
    $ionicModal.fromTemplateUrl('app/slprofiles/profile-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      spc.profileModal = modal;
    });

    function showProfileModal() {
      logger.debug("showProfileModal function");
      spc.profileModal.show();
    }

    function hideProfileModal() {
      logger.debug("hideProfileModal function");
      spc.profileModal.hide();
    }

    function getShortlist() {
      try {
        logger.debug("getShortlist function")

        var promise = profileService.getShortlist(lsService.get("_id"));
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            spc.profiles = resp.data.profiles;
            //utilService.appAlert(resp.messages, sConfig.appStates.signin, sConfig.msgs.success);
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function viewProfile(id) {
      try {
        logger.debug("viewProfile function");
        var promise = profileService.getProfile(id);
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            spc.profile = resp.data.profile;
            spc.showProfileModal();
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
          case "getShortlist":
            spc.getShortlist();
            break;
          default:
            spc.getShortlist();
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("SProfilesCtrl end");
  }
})();
