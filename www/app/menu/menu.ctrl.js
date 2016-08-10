(function() {
  angular.module('starter').controller('MenuCtrl', MenuCtrl);

  MenuCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', 'imagesService', '$stateParams', '$rootScope'];

  function MenuCtrl(sConfig, utilService, $state, $ionicPopup, lsService, imagesService, $stateParams, $rootScope) {
    // Variables section
    var logger = utilService.getLogger();
    logger.debug("MenuCtrl start");

    var mc = this;
    mc.dp = {};
    mc.dp.uri = "img/no-avatar.png";
    mc.fullName = lsService.get("fullName");

    // Functions section
    mc.signout = signout;
    mc.getDP = getDP;

    function getDP() {
      try {
        logger.debug("getDP function");

        var promise = imagesService.getImgs(sConfig.picType.dp, lsService.get("_id"));
        promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;
            if (resp.status !== sConfig.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }

            if (resp.data.images && resp.data.images.length > 0) {
              var dp = resp.data.images[0];
              if (dp.base64) {
                $rootScope.rootDP = dp.base64;
              }
            }

          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function signout() {
      try {
        logger.debug("signout function");
        var confirmPopup = $ionicPopup.confirm({
          title: 'Sign out',
          template: 'Are you sure you want to signout?'
        });

        confirmPopup.then(function(res) {
          if (res) {
            logger.debug("Signed out");
            lsService.set("isSignedIn", false);
            lsService.remove("_id");
            lsService.remove("fullName");
            lsService.remove("isDP");
            $rootScope.rootDP = undefined;
            $state.go(sConfig.appStates.signin);
          }
        });
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

    function bootstrap() {
      try {
        logger.debug("bootstrap function");

        switch ($stateParams.functionNm) {
          case "getDP":
            // mc.getDP();
            break;
          default:
            // mc.getDP();
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("MenuCtrl end");
  }
})();
