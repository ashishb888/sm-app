(function() {
  angular.module('starter').controller('SigninCtrl', SigninCtrl);

  SigninCtrl.$inject = ['starterConfig', 'utilService', '$state', '$scope', 'signinService', 'lsService', '$stateParams', 'addressService', 'hwBackBtnService'];

  function SigninCtrl(sc, utilService, $state, $scope, signinService, lsService, $stateParams, addressService, hwBackBtnService) {
    // Variables section
    var logger = utilService.getLogger();
    logger.debug("SigninCtrl start");

    var signinCtrl = this;
    var functionNm = $stateParams.functionNm;

    // Functions section
    signinCtrl.signin = signin;
    //var deploy = new Ionic.Deploy();
    var setView = setView;
    var bootstrap = bootstrap;

    // Update app code with new release from Ionic Deploy
    /*$scope.doUpdate = function() {
      deploy.update().then(function(res) {
        console.log('Ionic Deploy: Update Success! ', res);
      }, function(err) {
        console.log('Ionic Deploy: Update error! ', err);
      }, function(prog) {
        console.log('Ionic Deploy: Progress... ', prog);
      });
    };*/

    // Check Ionic Deploy for new code
    /*$scope.checkForUpdates = function() {
      console.log('Ionic Deploy: Checking for updates');
      deploy.check().then(function(hasUpdate) {
        console.log('Ionic Deploy: Update available: ' + hasUpdate);
        $scope.hasUpdate = hasUpdate;
      }, function(err) {
        console.error('Ionic Deploy: Unable to check for updates', err);
      });
    }*/

    function signin() {
      logger.debug("signin starts");

      if (!utilService.isAppOnlineService()) {
        utilService.appAlert(sc.msgs.noConnMsg);
        return;
      }

      var req = {};
      req.data = signinCtrl.sf;

      var promise = signinService.signin(req);
      promise.then(function(sucResp) {
          try {
            var resp = sucResp.data;

            if (resp.status !== sc.httpStatus.SUCCESS) {
              utilService.appAlert(resp.messages);
              return;
            }
            lsService.set("isSignedIn", true);
            lsService.set("_id", resp.data._id);
            lsService.set("fullName", resp.data.fullName);
            $state.go(sc.appStates.menu_profiles);
            return;
          } catch (exception) {
            logger.error("exception: " + exception);
          }
        }, function(errResp) {});

      logger.debug("signin ends");
    }

    /**/
    function setView() {
      var isSignedIn = lsService.get("isSignedIn");
      if (isSignedIn == "true") {
        $state.go(sc.appStates.menu_profiles);
        //$state.go("menu.profiles");
      }
    }

    /* Executes function according function name */
    function bootstrap() {
      logger.debug("bootstrap() start");

      hwBackBtnService.tapToExit();

      switch (functionNm) {
        case "setView":
          setView();
          break;
        default:
          setView();
      }
    }

    bootstrap();
    logger.debug("SigninCtrl end");
  }
})();
