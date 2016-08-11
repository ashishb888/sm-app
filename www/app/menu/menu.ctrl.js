(function() {
  angular.module('starter').controller('MenuCtrl', MenuCtrl);

  MenuCtrl.$inject = ['starterConfig', 'utilService', '$state', '$ionicPopup', 'lsService', 'imagesService', '$stateParams', '$rootScope'];

  function MenuCtrl(sConfig, utilService, $state, $ionicPopup, lsService, imagesService, $stateParams, $rootScope) {
    // Variables section
    var logger = utilService.getLogger();
    logger.debug("MenuCtrl start");

    var mc = this;
    /*mc.dp = {};
    mc.dp.uri = "img/no-avatar.png";*/
    mc.fullName;
    mc.dp;
    mc.age;
    mc.height;
    mc.location;

    // Functions section
    mc.signout = signout;
    mc.getDP = getDP;
    mc.setDP = setDP;

    $rootScope.$on('setBanner', function(event, data) {
      try {
        logger.debug("setBanner function");

        mc.fullName = lsService.get("fullName");
        mc.dp = lsService.get("dp");
        mc.userId = lsService.get("userId");
        mc.location = JSON.parse(lsService.get("location"));
        mc.age = moment().diff(lsService.get("dob"), "years");

        if (lsService.get("height")) {
          var heightSplit = lsService.get("height").split(" ");

          mc.height = {
            feet: parseInt(heightSplit[0]),
            inches: 0
          };
          if (heightSplit.length > 2) {
            mc.height.inches = parseInt(heightSplit[2]);
          }
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    });

    function setDP() {
      try {
        logger.debug("setDP function");

        mc.fullName = lsService.get("fullName");
        mc.dp = lsService.get("dp");
        mc.userId = lsService.get("userId");
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }

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
            localStorage.clear();
            lsService.set("isSignedIn", false);

            // $rootScope.rootDP = undefined;
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
            $rootScope.$broadcast("setBanner");
        }
      } catch (exception) {
        logger.error("exception: " + exception);
      }
    }
    bootstrap();

    logger.debug("MenuCtrl end");
  }
})();
